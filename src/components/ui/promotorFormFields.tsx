// "use client";

// import { FC } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// interface PromoterFormValues {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// const PromoterFormFields: FC = () => {
//   const initialValues: PromoterFormValues = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required("Username is required"),
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm password is required"),
//   });

//   const handleSubmit = async (values: PromoterFormValues) => {
//     try {
//       console.log("Promoter Form Data", values);
//     } catch (error) {
//       console.error("Submission error:", error);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block text-gray-300">
//               Username
//             </label>
//             <Field
//               id="username"
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
//             />
//             <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-gray-300">
//               Email
//             </label>
//             <Field
//               id="email"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
//             />
//             <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-300">
//               Password
//             </label>
//             <Field
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
//             />
//             <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-gray-300">
//               Confirm Password
//             </label>
//             <Field
//               id="confirmPassword"
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm your password"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
//             />
//             <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Sign Up"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default PromoterFormFields;
