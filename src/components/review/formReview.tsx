"use client";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { toast } from "react-toastify";
import StarRating from "./starRating";
import axios from "axios";
import { reviewScehma } from "@/libs/schema";
import type { FormReview } from "@/types/review";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormReview({ event_id }: { event_id: string }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const initialValue: FormReview = {
    rating: 0,
    comment: "",
  };

  const handleAdd = async (review: FormReview) => {
    try {
      SetIsLoading(true);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/reviews/${event_id}`, review, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("Review Error");
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
        {({ setFieldValue, values }: FormikProps<FormReview>) => {
          const commentChange = (e: string) => {
            setFieldValue("comment", e);
            // console.log(e);
          };
          return (
            <Form className="flex flex-col gap-4">
              <div className="flex gap-2">
                <StarRating
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
                {isLoading ? "Loading ..." : "Enter Review"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
