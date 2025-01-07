import * as Yup from "yup";

export const eventSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long")
    .required("Title is required"),
  venue: Yup.string()
    .min(5, "Venue must be at least 5 characters long")
    .max(100, "Venue must be at most 100 characters long")
    .required("Venue is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters long")
    .required("Description is required"),
  thumbnail: Yup.mixed<File>()
    .required("Thumbnail is required")
    .test(
      "fileSize",
      "File terlalu besar (maksimal 2MB)",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Format file tidak didukung (hanya .jpeg, .png, .jpg, .webp)",
      (value) =>
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ))
    ),
  datetime: Yup.date()
    .typeError("Invalid date and time format")
    .required("Date and time are required")
    .min(new Date(), "Date and time must be in the future"),
  coupon_promotor: Yup.number()
    .min(0, "coupon_promotor cannot negative")
    .optional(),
});

export const ticketSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  description: Yup.string()
    .min(4, "Description must be at least 4 characters long")
    .max(50, "Description must be at most 50 characters long")
    .required("Description is required"),
  maxSeats: Yup.number()
    .min(1, "Max seats must be at least 1")
    .required("Max seats are required"),
  seats: Yup.number()
    .min(0, "Seats must be at least 0")
    .max(Yup.ref("maxSeats"), "Seats cannot exceed max seats")
    .required("Seats are required"),
  price: Yup.number()
    .min(0, "Price must be at least 0")
    .required("Price is required")
    .typeError("Price must be a valid number"),
});
