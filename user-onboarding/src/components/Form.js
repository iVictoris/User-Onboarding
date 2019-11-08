import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnBoardForm = ({ errors, touched }) => {
  return (
    <Form>
      <Field type="text" name="name" placeholder="Name" />
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="email" name="email" placeholder="Email" />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="password" name="password" placeholder="Password" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <label>
        <Field type="checkbox" name="tos" /> Agree to ToS.
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
      </label>
      <button type="submit">Onboard</button>
    </Form>
  );
};

const EnchancedForm = withFormik({
  mapPropsToValues({ name = "", password = "", email = "", tos = false }) {
    return {
      name,
      password,
      email,
      tos
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8)
      .required("Password is required"),
    name: Yup.string().required("Name is required"),
    tos: Yup.boolean().oneOf([true], "Must check ToS")
  }),
  //======END VALIDATION SCHEMA==========

  // Make a POST Request
  handleSubmit({ name, password, email, tos }, {props: {addUser}, resetForm}) {
    // normally I would have more validation than client-side validation
    const person = {
      name,
      password,
      email
    };

    axios
      .post("https://reqres.in/api/users", person)
      .then(({data: {id, name, email, createdAt, ...otherData}}) => {
        const user = {id, name, email, createdAt}
        addUser(user);
        resetForm({name: '', email: '', password: '', tos: false})
      })
      .catch(console.log);
  }
})(OnBoardForm);

export default EnchancedForm;
