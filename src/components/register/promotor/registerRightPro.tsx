"use client";

import { Input } from "@/components/form/input";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),
  password: Yup.string()
    .min(3, "password must be 3 characters at minimum")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not match!")
    .required("confirm password is required"),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterRightPro() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsloading(true);
      const res = await fetch("http://localhost:8000/api/auth", {
        //tinggal ganti APInya
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
          <h1 className="text-3xl font-bold my-5 text-white">
          😸Miaw Let's Collab!😸
        </h1>
        <h1 className="text-xl font-bold my-5 text-white">Register Form</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            handleAdd(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="flex flex-col gap-2 min-w-[400px] text-white">
                <Input formik={props} name="promotor name*" label="Promotor Name :" />
                <Input
                  formik={props}
                  name="email"
                  label="Email :"
                  type="email"
                />
                <Input
                  formik={props}
                  name="password"
                  label="Password :"
                  type="password"
                />
                <Input
                  formik={props}
                  name="confirmPassword"
                  label="Confirm Password :"
                  type="password"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white disabled:bg-teal-300 disabled:cursor-not-allowed bg-violet-500 hover:bg-violet-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {isLoading ? "Loading ..." : "Register"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
