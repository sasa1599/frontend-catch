"use client";

import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ITicket, ITicketCategory } from "@/types/allInterface";
import RichTextEditor from "@/components/form/textEditor";
import { revalidate } from "../../libs/action";
import { ticketSchema } from "../../libs/schema";

const initialValues: ITicket = {
  id: 0,
  category: ITicketCategory.REGULAR,
  description: "",
  seats: 0,
  maxSeats: 1,
  price: 0,
};

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function CreateTicketPage({
  params,
}: {
  params: { event_id: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onCreate = async (data: ITicket) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${base_url}/promotor/create-event/create-ticket/${+params.event_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (!res.ok) throw result;

      revalidate("tickets");
      toast.success(result.message);
      router.push(`/promotorManagement/${+params.event_id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ticketSchema}
      onSubmit={(values, actions) => {
        console.log("Formatted Values for Database:", values);
        onCreate(values);
        actions.resetForm();
      }}
    >
      {(props) => {

        return (
          <Form className="flex flex-col gap-3 pt-5 w-full items-center justify-center text-black">
            <p>Ticket Detail</p>
            <hr className="border-blue-300" />

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium"
              >
                Category
              </label>
              <Field
                name="category"
                as="select"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option value={ITicketCategory.REGULAR}>
                  {ITicketCategory.REGULAR}
                </option>
                <option value={ITicketCategory.VIP}>
                  {ITicketCategory.VIP}
                </option>
              </Field>
              <ErrorMessage
                name="category"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium">
                Price
              </label>
              <Field
                name="price"
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                value={
                  props.values.price
                    ? `Rp ${Number(props.values.price).toLocaleString("id-ID")}`
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, "");
                  const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
                  props.setFieldValue("price", numericValue);
                }}
              />
              <ErrorMessage
                name="price"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Seats */}
            <div>
              <label htmlFor="seats" className="block mb-2 text-sm font-medium">
                Seats
              </label>
              <Field
                name="seats"
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                value={props.values.seats === 0 ? "" : props.values.seats}
                placeholder="Enter available seats"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, "");
                  const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
                  props.setFieldValue("seats", numericValue);
                }}
              />
              <ErrorMessage
                name="seats"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Max Seats */}
            <div>
              <label
                htmlFor="maxSeats"
                className="block mb-2 text-sm font-medium"
              >
                Max Seats
              </label>
              <Field
                name="maxSeats"
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                value={props.values.maxSeats === 1 ? "" : props.values.maxSeats}
                placeholder="Enter max seats"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, "");
                  const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
                  props.setFieldValue("maxSeats", numericValue);
                }}
              />
              <ErrorMessage
                name="maxSeats"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium"
              >
                Enter Your Ticket Description
              </label>
              <RichTextEditor setFieldValue={props.setFieldValue} />
              <ErrorMessage
                name="description"
                component="span"
                className="text-sm text-red-500"
              />
            </div>
            {/* Submit */}
            <div className="flex sm:justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[40px] disabled:cursor-not-allowed disabled:bg-[#8a8a8b] sm:w-[120px] text-[#f5f5f7] bg-[#383839] hover:bg-[#595959] rounded-lg"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}