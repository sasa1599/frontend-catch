"use client";

import React, { useState } from "react";
import useProSession from "@/hooks/promotorSession";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import PromotorSidebar from "@/components/ui/prosidebar";
import dashPromoGuard from "@/hoc/dashPromoGuard";

const ProfilePromotor: React.FC = () => {
  const { user, isAuth, loading, error } = useProSession();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Function to upload a new avatar
  const editProAvatar = async (file: File) => {
    if (!file || !user) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.patch(
        "http://localhost:8001/api/proavatarcloud",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Avatar updated successfully! Please refresh the page.");
      console.log("Upload Response:", res.data.message);
    } catch (err) {
      toast.error("Failed to upload avatar. Please try again.");
      console.error("Error uploading avatar:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No User Auth State
  if (!isAuth || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>No user session found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <PromotorSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto relative">
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-green-200 via-sky-200 to-blue-100" />
        <Image
          src="/profile.png"
          alt="Profile Decoration"
          width={100}
          height={100}
          className="absolute top-[-38px] right-[400px] transform"
        />
        <div className="relative px-8 py-6">
          <div className="bg-white shadow-xl rounded-lg max-w-2xl mx-auto mt-16">
            <div className="p-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <Image
                  src={user.avatar || "/user.png"}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-xl font-semibold text-gray-800 mt-4">
                  {user.name || "Promotor"}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <div className="mt-4">
                  <label
                    htmlFor="avatar"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
                  >
                    {isUploading ? "Uploading..." : "Edit Avatar"}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        editProAvatar(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Profile Information */}
              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-gray-600 text-sm mb-2">
                    Organize Name
                  </label>
                  <div className="bg-gray-50 rounded p-3 border border-gray-100">
                    <span className="text-gray-700">
                      {user.name || "Not specified"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-2">
                    Username
                  </label>
                  <div className="bg-gray-50 rounded p-3 border border-gray-100">
                    <span className="text-gray-700">{user.username}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-2">
                    Email
                  </label>
                  <div className="bg-gray-50 rounded p-3 border border-gray-100">
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-2">
                    Password
                  </label>
                  <div className="bg-gray-50 rounded p-3 border border-gray-100">
                    <span className="text-gray-700">*************</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default dashPromoGuard(ProfilePromotor);
