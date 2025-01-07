"use client";

import { useSession } from "@/context/useSession";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
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

      // Request ke API login
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/login`,
        payload,
        {
          withCredentials: true,
        }
      );

      // Extract data dari response
      const { promotor, token, message } = res.data;

      // Update state session
      setUser(promotor);
      setIsAuth(true);
      localStorage.setItem("role", "promotor");
      localStorage.setItem("token", token);

      // Tampilkan pesan sukses dan redirect ke dashboard
      toast.success(message || "Login successful!");
      router.push("/dashboard");
    } catch (err: unknown) {
      // Validasi apakah err berasal dari Axios
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "Login failed.";
        toast.error(errorMessage);
      } else {
        // Default error handling jika error bukan berasal dari Axios
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 text-black">
      <div className="lg:w-1/2 w-full relative">
        <Image
          src="/signPro.png"
          alt="Promotor login background"
          layout="responsive"
          width={1920} // Sesuaikan dengan lebar gambar asli
          height={1080} // Sesuaikan dengan tinggi gambar asli
          className="object-cover"
        />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="mb-8 text-center w-full max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Welcome Back, Promotor!
          </h1>
          <p className="text-lg text-gray-600 mx-auto">
            Log in to manage your events and promotions. Enter your credentials
            below.
          </p>
        </div>
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">
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
              Don&apos;t have an account?{" "}
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
