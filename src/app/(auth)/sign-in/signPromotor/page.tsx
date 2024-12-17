"use client";

import { useSession } from "@/context/useSession";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
  role: string;
}

const SignPromotor = () => {
  const initialValues: FormValues = {
    username: "",
    password: "",
    role: "promotor",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().optional(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth, setUser } = useSession();
  const router = useRouter();

  const handleLogin = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const payload = {
        data: {
          username: values.username,
          role: values.role,
        },
        password: values.password,
      };

      const res = await axios.post("http://localhost:8001/api/login", payload, {
        withCredentials: true,
      });

      const { promotor, message } = res.data;

      setUser(promotor);
      setIsAuth(true);
      localStorage.setItem("role", "promotor");

      toast.success(message || "Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 text-black">
      <div className="lg:w-1/2 w-full relative">
        <img
          src="/signPro.png"
          alt="Promotor login background"
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-8 mt-20 lg:p-12">
        <div className="mb-8 text-center w-full max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome Back, Promotor!
          </h1>
          <p className="text-lg text-gray-600 mx-auto">
            Log in to manage your events and promotions. Enter your credentials
            below.
          </p>
        </div>
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <Field name="role" value="promotor" type="hidden" />
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
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
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
