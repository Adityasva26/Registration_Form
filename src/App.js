import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";

const RegistrationForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    country: Yup.string().required("Country is required"),
    avatar: Yup.mixed().required("Avatar is required")
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    avatar: ""
  };

  const handleImageChange = (event, formik) => {
    const imageFile = event.currentTarget.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        formik.setFieldError("avatar", undefined);
        formik.setFieldValue("avatar", imageFile);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label>Country</label>
              <Field as="select" name="country">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                {/* Other country options */}
              </Field>
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <div>
              <label>Avatar</label>
              <input
                type="file"
                name="avatar"
                onChange={(event) => handleImageChange(event, formik)}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Avatar Preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
              <ErrorMessage name="avatar" component="div" className="error" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
