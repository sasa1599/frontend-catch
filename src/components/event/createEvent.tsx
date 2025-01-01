"use client";

import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICategory, IEvent, ILocation, IPromotor } from "@/types/allInterface";
import RichTextEditor from "@/components/form/textEditor";
import { FieldThumbnail } from "@/components/form/thumbnail";
import { revalidate } from "../../libs/action";
import { eventSchema } from "../../libs/schema";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const initialValues: IEvent = {
  id: 0, // Default ID
  title: "",
  category: ICategory.concert,
  thumbnail: "",
  description: "",
  location: ILocation.jakarta,
  venue: "",
  datetime: "",
  slug: "", // Default slug
  promotor: {
    id: 0,
    name: "",
    username: "",
    avatar: null,
  },
  tickets: [], // Default tickets (empty array)
};

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function CreateEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onCreate = async (data: IEvent) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      for (const key in data) {
        const item = data[key as keyof IEvent];

        if (item !== undefined && item !== null) {
          if (item instanceof File) {
            formData.append(key, item);
          } else if (item instanceof Date) {
            formData.append(key, item.toISOString());
          } else if (typeof item === "object" && item !== null) {
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, String(item));
          }
        }
      }

      const res = await fetch(`${base_url}/promotor/create-event`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw result;

      revalidate("events");
      toast.success(result.message);
      router.push(`/promotorManagement/${result.event_id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventSchema}
      onSubmit={(values, actions) => {
        const formattedValues = {
          ...values,
          datetime: values.datetime
            ? new Date(values.datetime).toISOString()
            : null!,
        };

        console.log("Formatted Values for Database:", formattedValues);
        onCreate(formattedValues);
        actions.resetForm();
      }}
    >
      {(props) => {
        return (
          <Form className="flex flex-col gap-3 w-full items-center justify-center text-black">
            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block mb-2 text-sm font-medium"
              >
                Thumbnail
              </label>
              <FieldThumbnail name="thumbnail" formik={props} />
              <ErrorMessage
                name="thumbnail"
                component="span"
                className="text-sm text-red-500"
              />
            </div>
            <p>Event Detail</p>
            <hr className="border-blue-300" />
            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium">
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  props.setFieldValue("title", value);
                }}
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-sm text-red-500"
              />
            </div>
            {/* Venue */}
            <div>
              <label htmlFor="venue" className="block mb-2 text-sm font-medium">
                Venue
              </label>
              <Field
                name="venue"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
              <ErrorMessage
                name="venue"
                component="span"
                className="text-sm text-red-500"
              />
            </div>
            {/* DateTime Picker */}
            <div>
              <label
                htmlFor="datetime"
                className="block mb-2 text-sm font-medium"
              >
                Date & Time
              </label>
              <Field name="datetime">
                {({ field, form }: { field: any; form: any }) => (
                  <div>
                    <DateTimePicker
                      id="dateTimePicker"
                      onChange={(value: Date | null) => {
                        console.log("Selected DateTime:", value); // Debug
                        form.setFieldValue(field.name, value);
                      }}
                      value={field.value}
                      format="dd/MM/y h:mm a"
                      className="custom-calendar"
                      clearIcon={null}
                    />
                    {field.value ? (
                      <p className="mt-3 text-sm text-gray-600">
                        Selected Date & Time:{" "}
                        <span className="font-semibold">
                          {field.value.toLocaleString("ID-id", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-gray-400">
                        Please select a date and time
                      </p>
                    )}
                    <ErrorMessage
                      name="datetime"
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                )}
              </Field>
            </div>

            <div className="flex gap-5">
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
                  <option value={ICategory.concert}>{ICategory.concert}</option>
                  <option value={ICategory.fanmeet}>{ICategory.fanmeet}</option>
                  <option value={ICategory.sports}>{ICategory.sports}</option>
                  <option value={ICategory.seminar}>{ICategory.seminar}</option>
                  <option value={ICategory.theater}>{ICategory.theater}</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium"
                >
                  Location
                </label>
                <Field
                  name="location"
                  as="select"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                >
                  <option value={ILocation.bandung}>{ILocation.bandung}</option>
                  <option value={ILocation.jakarta}>{ILocation.jakarta}</option>
                  <option value={ILocation.yogyakarta}>
                    {ILocation.yogyakarta}
                  </option>
                </Field>
                <ErrorMessage
                  name="location"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium"
              >
                Enter Your Event Description
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
