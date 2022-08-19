import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  getNewTutor,
  getNewTutorRequestStatus,
  getNewTutorRequestError,
  newTutor,
} from "../../features/newTutorSlice";

const NewTutorForm = () => {
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.picture = picture;
    console.log(e);
    dispatch(newTutor(e));
  };
  const validate = (e) => {};
  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name">
            {({ input }) => (
              <div>
                Name:
                <input placeholder="Name" type="text" {...input} />
              </div>
            )}
          </Field>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64: base64Picture }) => setPicture(base64Picture)}
          />
          <Field name="lessonCost">
            {({ input }) => (
              <div>
                Lesson cost:
                <input
                  placeholder="Lesson cost"
                  type="number"
                  min="1"
                  step="any"
                  {...input}
                />
              </div>
            )}
          </Field>
          <Field name="description">
            {({ input }) => (
              <div>
                Description:
                <input placeholder="description" type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="spokenLanguages">
            {({ input }) => (
              <div>
                spokenLanguages:
                <input placeholder="spokenLanguages" type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="skills">
            {({ input }) => (
              <div>
                skills:
                <input placeholder="skills" type="text" {...input} />
              </div>
            )}
          </Field>

          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
};

export default NewTutorForm;
