"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ToggleTabs from "@/components/ui/tabSwitcher";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function PromotorSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Form values type
  interface FormValues {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  // Initial form values
  const initialValues: FormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Form submission handler
  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:8001/api/register/promotor", values, {
        withCredentials: true,
      });

      // Backend response processing
      const result = res.data.promotor;
      toast.success(res.data.message || "Registration successful!");
      setIsLoading(false);

      router.push("/");
    } catch (err: any) {
      setIsLoading(false);
      console.error("Error during registration:", err);

      // Safely extract the error message
      const errorMessage =
        err.response?.data?.message || // Backend error message
        err.message ||                 // Axios error message
        "An error occurred during registration"; // Fallback message

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-gray-300 mt-16">
      <div className="w-full lg:w-1/2 relative">
        <img
          src="/cinema.jpeg"
          alt="Cinema venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-snug">
            Organize events with ease, while keeping your budget in check!
          </h1>
          <p className="text-lg">
            Create an account to access special tools, manage multiple events,
            and unlock exclusive benefits for your promotions.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col justify-center p-6 lg:p-12">
        <ToggleTabs currentPath="/sign-up/promotor" />
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
            Promotor
          </h2>
          <p className="text-gray-400">
            As a promotor, you can manage events, transactions, and gather
            feedback from customers.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300">
                  Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="username" className="block text-gray-300">
                  Username
                </label>
                <Field
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300">
                  Email
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300">
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Submitting..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
