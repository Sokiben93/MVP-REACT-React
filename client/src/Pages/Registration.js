import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // https://formik.org/docs/overview
import * as Yup from "yup"; // define and create schema objects
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/register", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainerRegister">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePostUsername"
            name="username"
            placeholder="(Ex. Thanh123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePostPassword"
            name="password"
            placeholder="Password..."
          />

          <button className="register-button" type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;