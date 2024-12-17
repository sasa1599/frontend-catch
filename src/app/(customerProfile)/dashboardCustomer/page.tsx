"use client";

import React from "react";
import useSession from "@/hooks/useSession";
import CustomerSidebar from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const CustomerDashboard: React.FC = () => {
  const { user, loading, error } = useSession();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>No user session found. Please log in.</p>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      <main className="flex-1 flex items-center justify-center bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl w-full p-8">
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <p className="inline-block px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                It’s me
              </p>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              Welcome, {user.name || user.username}!
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Here you can manage your <span className="text-red-500">Bookings</span>, view{" "}
              <span className="text-blue-500">Transactions</span>, and update your{" "}
              <span className="text-blue-500">Profile</span>.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/bookingsCustomer"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow"
              >
                Bookings
              </Link>
              <Link
                href="/transactionsCustomer"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full text-lg font-semibold shadow"
              >
                Transactions
              </Link>
              <Link
                href="/profileCustomer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow"
              >
                My Profile
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center relative">
          <div className="absolute right-0 w-[350px] h-[400px] bg-blue-100 rounded-tl-full rounded-bl-full"></div>
          <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-xl">
            <Image
              src={user.avatar || "/user.png"}
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
