import * as Yup from "yup";

export const eventSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long")
    .required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Category is required"),
  description: Yup.string()
    .min(20, "Content must be at least 20 characters long")
    .required("Content is required"),
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
});
