"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignPromotor = () => {
  const initialValues = {
    data: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    data: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <div className="lg:w-1/2 w-full relative">
        <img
          src="/signPro.png"
          alt="Background Image"
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-8 mt-20 lg:p-12">
        <div className="mb-8 text-center w-full max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CATCH THE MOMENT!
          </h1>
          <p className="text-lg text-gray-600 mx-auto">
            Log in to create unforgettable events! Enter your email and password
            to manage your events. It’s simple, secure, and fast!
          </p>
        </div>
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Welcome Back Creator !
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Please enter your username and password to log in.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/sign-up/promotor"
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPromotor;
