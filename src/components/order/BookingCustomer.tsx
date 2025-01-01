"use client";

import React, { useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { IOrder } from "@/types/order";
import { formatOrderDate } from "@/helpers/formatDate";

interface BookingsCustomerClientProps {
  orders: IOrder[];
}

export default function BookingsCustomerClient({
  orders,
}: BookingsCustomerClientProps) {
  const [filter, setFilter] = useState<string>("All");

  const filteredTickets = orders.filter((ticket) =>
    filter === "All" ? true : ticket.status_order === filter
  );

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
        <p className="mt-2 text-gray-600">Manage your event tickets below.</p>

        {/* Filter Buttons */}
        <div className="flex gap-4 mt-6">
          {["All", "PENDING", "SUCCESS", "FAILED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm font-semibold rounded-full ${
                  filter === status
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Display Tickets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((order, idx) => {
              const ticketTransaction = order.OrderDetails[0];
              const ticketEvent = ticketTransaction?.ticket.event;

              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        order.status_order === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status_order === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : order.status_order === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {order.status_order}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ticketEvent.title || "Unknown Event"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {ticketEvent.datetime
                      ? formatOrderDate(ticketEvent.datetime)
                      : "No date available"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Venue:</span>{" "}
                    {ticketEvent?.venue || "No venue available"}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      Tickets:{" "}
                      <span className="font-semibold">
                        {ticketTransaction?.quantity || 0}
                      </span>
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatPrice(order.final_price)}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {order.status_order === "PENDING" ? (
                      <button className="flex-1 py-2 text-center text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                        Pay
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 py-2 text-center text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                          View Details
                        </button>
                        <button className="flex-1 py-2 text-center text-green-600 border border-green-500 rounded hover:bg-green-50">
                          Download Ticket
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No tickets found for the selected filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}