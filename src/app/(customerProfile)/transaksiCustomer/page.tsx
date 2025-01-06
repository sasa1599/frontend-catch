"use client";

import PayButton from "@/components/midtrans/payButton";
import CountDown from "@/components/order/countDown";
import CustomerSidebar from "@/components/ui/sidebar";
import { formatPrice } from "@/helpers/formatPrice";
import useSession from "@/hooks/useSession";
import { IOrder } from "@/types/order";
import axios from "axios";
import React, { useState, useEffect } from "react";

const CustomerTransaction: React.FC = () => {
  const { user } = useSession();
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const getOrderDataDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/order/user/detail`, {
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

  const getToken = async (
    orderId: number,
    finalPrice: number
  ): Promise<string | undefined> => {
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
      setError("Failed to get payment token. Please try again.");
      return undefined;
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


  if (!hydrated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen overflow-hidden">
        <CustomerSidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen overflow-hidden">
        <CustomerSidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <CustomerSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and manage your event bookings
          </p>
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
                  <th className="px-6 py-3 text-left tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((order) => {
                    const ticketCart = order.OrderDetails.map((detail) => ({
                      quantity: detail.quantity,
                      ticket: {
                        id: detail.ticket.id,
                        price: detail.ticket.price,
                        seats: detail.ticket.seats,
                      },
                    }));

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
                          {formatPrice(order.point) || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.voucher || "-"}
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
                        <td className="px-6 py-4">
                          {order.status_order === "PENDING" && (
                            <div>
                              <PayButton order={order} />
                              <div>
                                <CountDown date={order.expires_at} />
                              </div>
                            </div>

                            // <PayButton
                            //   token={async () => {
                            //     const token = await getToken(
                            //       order.id,
                            //       order.final_price
                            //     );
                            //     return token;
                            //   }}
                            //   ticketCart={ticketCart}
                            //   priceToPay={order.final_price}
                            //   originalAmount={order.total_price}
                            // />
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

export default CustomerTransaction;