"use client";

import React, { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import axios from "axios";
import CustomerSidebar from "@/components/ui/sidebar";
import Image from "next/image";
import { toast } from "react-toastify";
import dashCustGuard from "@/hoc/dashCustoGuard";
import ResetPasswordForm from "@/components/resetPassword/resetPassCustomer";

interface Coupon {
  id: number;
  precentage: number;
  expired_at: string;
}

const ProfileCustomer: React.FC = () => {
  const { user, loading, error } = useSession();
  const [points, setPoints] = useState<number>(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const fetchPoints = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:8001/api/userpoints", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      const pointsData = res.data.items || [];
      const userPoints = pointsData.filter(
        (point: any) => point.customer_id === user.id
      );
      const totalPoints = userPoints.reduce(
        (acc: number, point: any) => acc + point.point,
        0
      );
      setPoints(totalPoints);
    } catch (err) {
      console.error("Error fetching points:", err);
    }
  };

  const fetchCoupons = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:8001/api/usercoupons", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      const couponsData = res.data.items || [];
      const userCoupons = couponsData.filter(
        (coupon: any) => coupon.customer_id === user.id
      );
      setCoupons(userCoupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  const editAvatar = async (file: File) => {
    if (!file || !user) return;
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.patch(
        "http://localhost:8001/api/avatarcloud",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(
        "Avatar updated successfully! Please refresh the page to update it."
      );
    } catch (err) {
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
    fetchCoupons();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>No user session found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <CustomerSidebar />
      <main className="flex-1 bg-gray-100 overflow-auto relative p-4 sm:p-8 md:p-10">
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-green-200 via-sky-200 to-blue-100" />
        <Image
          src="/profile.png"
          alt="Profile Decoration"
          width={100}
          height={100}
          className="absolute top-[-38px] right-[400px] transform sm:right-[200px] md:right-[300px]"
        />
        <div className="relative">
          <div className="bg-white shadow-xl rounded-lg max-w-full sm:max-w-2xl mx-auto mt-16 p-6 sm:p-8">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar || "/user.png"}
                alt="Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
                {user.name || user.username}
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
                      editAvatar(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <label className="block text-gray-600 text-sm mb-2">Referral Code</label>
                <div className="bg-gray-50 rounded p-3 border border-gray-100">
                  <span className="text-gray-700">{user.ref_code || "N/A"}</span>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">My Coupons</label>
                <div className="bg-gray-50 rounded p-3 border border-gray-100">
                  {coupons.length > 0 ? (
                    <div className="space-y-2">
                      {coupons.map((coupon) => (
                        <div
                          key={coupon.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700">
                            {coupon.precentage}% Discount
                          </span>
                          <span className="text-gray-500 text-sm">
                            Expires:{" "}
                            {new Date(coupon.expired_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">No available coupons</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">My Points</label>
                <div className="bg-gray-50 rounded p-3 border border-gray-100">
                  <span className="text-gray-700">
                    Rp {points.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">Reset Password</label>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => setShowResetPasswordModal(true)}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showResetPasswordModal && (
        <ResetPasswordForm onClose={() => setShowResetPasswordModal(false)} />
      )}
    </div>
  );
};

export default dashCustGuard(ProfileCustomer);
