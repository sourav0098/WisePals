import contactSchema from "../database/models/contactForm.js";

export const insertContactForm = async (data) => {
  try {
    const contact = await contactSchema.create(data);
    if (contact) {
      return contact;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listContactForm = async (page, perPage) => {
  try {
    const contactForms = await contactSchema
      .find()
      .limit(perPage)
      .skip((page - 1) * perPage)
      .lean();
    if (contactForms) {
      return contactForms;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listStatistics = async (id) => {
  try {
    const now = new Date();
    // get the start and end of the current week
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (6 - now.getDay())
    );

    const skillsContacted = await contactSchema.aggregate([
      {
        $match: {
          tutor: id,
          createdAt: {
            $gte: startOfWeek,
          },
        },
      },
      {
        $group: {
          _id: "$skill",
        },
      },
    ]);

    const skills = skillsContacted.map((skill) => skill._id);

    // find the number of contacts for the given tutor in the current week
    const contacts = await contactSchema.find({
      tutor: id,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });
    if (contacts) {
      // count the number of contacts for each day of the week
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const contactsByDayOfWeek = {};
      contacts.forEach((contact) => {
        const dayOfWeek = daysOfWeek[new Date(contact.createdAt).getDay()];
        contactsByDayOfWeek[dayOfWeek] =
          (contactsByDayOfWeek[dayOfWeek] || 0) + 1;
      });
      return { contactsByDayOfWeek, skills };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateContactForm = async (data, id) => {
  try {
    const contact = await contactSchema.findOneAndUpdate({ _id: id }, data);
    if (contact) {
      return contact;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContactForm = async (id) => {
  try {
    await contactSchema.deleteOne({ _id: id });
    return "deleted";
  } catch (error) {
    throw new Error(error.message);
  }
};
