"use client";

import PromotorSidebar from "@/components/ui/prosidebar";

import dashPromoGuard from "@/hoc/dashPromoGuard";
import useProSession from "@/hooks/promotorSession";
import { IOrder } from "@/types/order";
import axios from "axios";
import React, { useState, useEffect } from "react";

const PromotorTransaction: React.FC = () => {
  const { user } = useProSession();
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const getOrderDataDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/admin/orders/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const orders = res.data.result;
      setOrderData(orders);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHydrated(true);
    if (user) {
      getOrderDataDetail();
    }
  }, [user]);

  const filteredTransactions = orderData.filter((transaction) =>
    transaction.OrderDetails[0]?.ticket?.event?.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase())
  );

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!hydrated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen overflow-hidden">
        <PromotorSidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen overflow-hidden">
        <PromotorSidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <PromotorSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Customer Transactions
          </h1>
          <p className="text-gray-600 mt-1">View event bookings</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-96 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Price To Pay
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Original Amount
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Points Used
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Voucher
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Event Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((order) => {


                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.OrderDetails[0]?.ticket?.event?.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {`${order.OrderDetails[0]?.quantity} ticket(s)`}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatPrice(order.final_price)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatPrice(order.total_price)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.point || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                        {order.coupon ? (
                            <span className="text-green-600">✔</span> // Checkmark icon for vouchers
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status_order === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status_order}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(
                            order.OrderDetails[0]?.ticket?.event?.datetime
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center">
                      <div className="text-gray-500 font-medium">
                        {search
                          ? "No transactions match your search."
                          : "No transactions found."}
                      </div>
                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashPromoGuard(PromotorTransaction);
