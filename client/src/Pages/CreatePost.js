import React from "react";
// Build forms in React by using formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// Yup exports everything as a named export
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    comment: "",
    mail: "",
    user_id: "",
  };

  // define and create schema objects
  const validationSchema = Yup.object().shape({
    title: Yup.string().max(25).required("You must input a Title!"),
    comment: Yup.string().required("You must input a Comment!"),
    mail: Yup.string().min(3).max(35).required("You must input a Email!"),
    user_id: Yup.number().required("You must input a ID!").positive().integer(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("IT WORKED",response.data);
      navigate("/");
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Ex. Title..."
          />
          <label>Comment: </label>
          <ErrorMessage name="comment" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="comment"
            placeholder="What's on your mind?..."
          />
          <label>Email: </label>
          <ErrorMessage name="mail" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="mail"
            placeholder="Ex. John123@gmail.com..."
          />
          <label>User ID: </label>
          <ErrorMessage name="user_id" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="user_id"
            placeholder="Ex. 1..."
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;