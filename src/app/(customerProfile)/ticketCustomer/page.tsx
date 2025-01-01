"use client";

import React, { useEffect, useState } from "react";
import CustomerSidebar from "@/components/ui/sidebar";
import { IOrder } from "@/types/order";
import BookingsCustomerClient from "@/components/order/BookingCustomer";
import useSession from "@/hooks/useSession";
import axios from "axios";

export default function BookingsCustomer({}) {
  const { user } = useSession();
  const [orderData, setOrderData] = useState<IOrder[]>([]);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const getOrderDataDetail = async () => {
    try {
      const res = await axios.get(`${base_url}/order/user/detail`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      
      const orders = res.data.result;
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

  if (user && orderData.length > 0) {
    return (
      <main className="flex h-screen">
        <CustomerSidebar />
        <BookingsCustomerClient orders={orderData} />
      </main>
    );
  }

  return <div>Loading...</div>;
}
