"use client";

import PayButton from "@/components/midtrans/payButton";
import CustomerSidebar from "@/components/ui/sidebar";
import useSession from "@/hooks/useSession";
import { IOrder } from "@/types/order";
import axios from "axios";
import React, { useState, useEffect } from "react";

const CustomerTransaction: React.FC = () => {
  const { user } = useSession();
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [orderData, setOrderData] = useState<IOrder[]>([]);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  // Fetch order details
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

  const getToken = async (
    orderId: number,
    finalPrice: number
  ): Promise<string | null> => {
    try {
      const { data } = await axios.post(
        `${base_url}/order/payment`,
        {
          order_id: orderId,
          gross_amount: finalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data.result; 
    } catch (err) {
      console.error("Error fetching Snap Token:", err);
      return null;
    }
  };

  // Handle component hydration and data fetch
  useEffect(() => {
    setHydrated(true);
    if (user) {
      getOrderDataDetail();
    }
  }, [user]);

  const filteredTransactions = orderData.filter((transaction) =>
    transaction.OrderDetails[0].ticket.event.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <CustomerSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Customer Transactions</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Event..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white shadow-md rounded-lg table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left w-2/5">Event</th>
                <th className="p-3 text-left w-1/5">Price To Pay</th>
                <th className="p-3 text-left w-1/5">Original Amount</th>
                <th className="p-3 text-left w-1/5">Redeemed Points</th>
                <th className="p-3 text-left w-1/5">Voucher</th>
                <th className="p-3 text-left w-1/5">Payment Status</th>
                <th className="p-3 text-left w-1/5">Date</th>
                <th className="p-3 text-left w-1/5">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      {order.OrderDetails[0].ticket.event.title}
                    </td>
                    <td className="p-3">{order.final_price}</td>
                    <td className="p-3">{order.total_price}</td>
                    <td className="p-3">
                      {/* Add logic to display redeemed points */}
                    </td>
                    <td className="p-3">
                      {/* Add logic to display voucher */}
                    </td>
                    <td className="p-3">
                      {order.status_order === "PENDING" ? (
                        <span className="inline-block bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                          Unpaid
                        </span>
                      ) : (
                        <span className="inline-block bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {formatDate(order.OrderDetails[0].ticket.event.datetime)}
                    </td>
                    <td className="p-3">
                      <PayButton
                        token={async () => {
                          const token = await getToken(
                            order.id,
                            order.final_price
                          );
                          if (token) {
                            return token;
                          } else {
                            console.error("Failed to retrieve Snap Token");
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-4 text-gray-500 font-medium"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerTransaction;
