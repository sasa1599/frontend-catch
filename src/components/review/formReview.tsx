"use client";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";
<<<<<<< HEAD
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import type { FormReview } from "@/types/review";
import { toast } from "react-toastify";
import StarRating from "./starRating";
import axios from "@/helpers/axios";
import { reviewScehma } from "@/libs/schema";

=======

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { reviewScehma } from "@/libs/schema";

import { toast } from "react-toastify";
import { IReview } from "@/types/review";
import axios from "axios";
import StartRating from "./starRating";

>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormReview({ event_id }: { event_id: string }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
<<<<<<< HEAD
  const initialValue: FormReview = {
=======
  const initialValue: IReview = {
>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
    rating: 0,
    comment: "",
  };

<<<<<<< HEAD
  const handleAdd = async (review: FormReview) => {
=======
  const handleAdd = async (review: IReview) => {
>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
    try {
      SetIsLoading(true);
      const { data } = await axios.post(`/reviews/${event_id}`, review, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      SetIsLoading(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={reviewScehma}
        onSubmit={(values, action) => {
          console.log(values);
          action.resetForm();
          handleAdd(values);
        }}
      >
<<<<<<< HEAD
        {({ setFieldValue, values }: FormikProps<FormReview>) => {
=======
        {({ setFieldValue, values }: FormikProps<IReview>) => {
>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
          const commentChange = (e: string) => {
            setFieldValue("comment", e);
            // console.log(e);
          };
          return (
            <Form className="flex flex-col gap-4">
              <div className="flex gap-2">
<<<<<<< HEAD
                <StarRating
=======
                <StartRating
>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
                  setFieldValue={setFieldValue}
                  values={values.rating}
                />
              </div>
              <ErrorMessage name="rating">
                {(msg) => (
                  <div className="text-red-500 text-xs mt-1 ml-1">
                    <sup>*</sup>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <ReactQuill onChange={commentChange} value={values.comment} />
              <ErrorMessage name="comment">
                {(msg) => (
                  <div className="text-red-500 text-xs mt-1 ml-1">
                    <sup>*</sup>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <button
                disabled={isLoading}
                type="submit"
                className={`${
                  isLoading
                    ? "disabled:opacity-[0.5] disabled:bg-lightBlue text-white"
                    : "hover:bg-lightBlue hover:text-white"
                } py-2 mx-2 rounded-lg transition ease-linear font-semibold border-2 border-lightBlue`}
              >
<<<<<<< HEAD
                {isLoading ? "Loading ..." : "Submit Review"}
=======
                {isLoading ? "Loading ..." : "Share Your Review"}
>>>>>>> 9b27e93d4900c053d4f0438f39118c8735a7ae0e
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
