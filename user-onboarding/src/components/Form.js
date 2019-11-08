import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

const OnBoardForm = ({errors, touched}) => {
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
        <button>Onboard</button>
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
    tos: Yup.boolean().oneOf([true], 'Must check ToS')
  })
  //======END VALIDATION SCHEMA==========
})(OnBoardForm);

export default EnchancedForm;
