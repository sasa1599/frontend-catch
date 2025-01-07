"use client";

import React, { useEffect, useState } from "react";
import CustomerSidebar from "@/components/ui/sidebar";
import { IOrder } from "@/types/order";
import BookingsCustomerClient from "@/components/order/BookingCustomer";
import axios from "axios";
import { useSession } from "@/context/useSession";
import dashCustGuard from "@/hoc/dashCustoGuard";
import Link from "next/link";

const BookingsCustomer: React.FC = () => {
  const { user } = useSession();
  const [orderData, setOrderData] = useState<IOrder[]>([]);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const getOrderDataDetail = async () => {
    try {
      const res = await axios.get(`${base_url}/order/user/detail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const orders = res.data.result;
      console.log(orders);

      setOrderData(orders);
    } catch (err) {
      console.error("Error fetching order details:", err);
    }
  };

  useEffect(() => {
    if (user) {
      getOrderDataDetail();
    }
  }, [user]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (orderData.length === 0) {
    return (
      <main className="flex h-screen bg-gray-50">
        <CustomerSidebar />
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-white text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            You have no orders yet
          </h2>
          <p className="text-gray-600 mb-6">
            Don&apos;t miss out! Explore and book your next event now.
          </p>
          <Link href="/browse_events">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Browse Events
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen">
      <CustomerSidebar />
      <BookingsCustomerClient orders={orderData} />
    </main>
  );
};

export default dashCustGuard(BookingsCustomer);
