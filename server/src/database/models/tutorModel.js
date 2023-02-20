import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      unique:true,
      required:true,
      ref:"User"
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    spokenLanguages: {
      type: [{ type: String }],
      require: true,
    },
    skills: [{ type: String }],
    hourlyRate: {
      type: Number,
      require: true,
      default: 0,
    },
    numClasesGiven: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
  },
);

tutorSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tutorId",
});

tutorSchema.virtual("numReviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tutorId",
  count: true
});

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;