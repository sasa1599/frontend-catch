"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Extract the role from query parameters
  const { token } = params;

  const onVerify = async () => {
    try {
      let res;
      if (role === "promotor") {
        res = await axios.patch(
          `http://localhost:8001/api/verify/promotors/${token}`
        );
      } else if (role === "customer") {
        res = await axios.patch(
          `http://localhost:8001/api/verify/customers/${token}`
        );
      } else {
        throw new Error("Invalid role specified");
      }

      const result = res.data;
      toast.success(result.message);
      router.push("/");
    } catch (err: any) {
      console.error("Error during verification:", err);
      toast.error(
        err.response?.data?.message || "An error occurred during verification"
      );
    }
  };

  useEffect(() => {
    onVerify();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Account Verification
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Click the button below to verify your account. Your token:{" "}
          <span className="font-mono text-blue-600">{token}</span>
        </p>
        <button
          onClick={onVerify}
          className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
