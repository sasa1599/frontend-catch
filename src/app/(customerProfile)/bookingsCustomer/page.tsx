"use client";

import React, { useState } from "react";
import CustomerSidebar from "@/components/ui/sidebar";

interface Ticket {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  tickets: number;
  total: number;
  status: "Upcoming" | "Ongoing" | "Completed";
}

const tickets: Ticket[] = [
  {
    id: "E1",
    eventName: "Coldplay Music of the Spheres Tour",
    date: "Fri, Dec 15, 2023",
    time: "07:00 PM",
    venue: "Stadium XYZ, Jakarta",
    tickets: 2,
    total: 2400000,
    status: "Upcoming",
  },
  {
    id: "E2",
    eventName: "One OK Rock Live in Concert",
    date: "Sat, Jan 20, 2024",
    time: "08:00 PM",
    venue: "Arena ABC, Tokyo",
    tickets: 3,
    total: 3000000,
    status: "Ongoing",
  },
  {
    id: "E3",
    eventName: "Ed Sheeran: +-=÷x Tour",
    date: "Mon, Nov 28, 2023",
    time: "06:30 PM",
    venue: "National Stadium, Singapore",
    tickets: 4,
    total: 4000000,
    status: "Completed",
  },
  {
    id: "E4",
    eventName: "Taylor Swift: The Eras Tour",
    date: "Wed, Feb 14, 2024",
    time: "08:00 PM",
    venue: "Metlife Stadium, NY",
    tickets: 1,
    total: 1500000,
    status: "Upcoming",
  },
];

// Helper function to format price into IDR
const formatToRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export default function BookingsCustomer() {
  const [filter, setFilter] = useState<string>("All");

  // Filter tickets based on status
  const filteredTickets = tickets.filter((ticket) =>
    filter === "All" ? true : ticket.status === filter
  );

  return (
    <div className="flex h-screen">
      <CustomerSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
          <p className="mt-2 text-gray-600">Manage your event tickets below.</p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                filter === "All"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Upcoming")}
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                filter === "Upcoming"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("Ongoing")}
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                filter === "Ongoing"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter("Completed")}
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                filter === "Completed"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              Completed
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
                      {ticket.id}
                    </span>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        ticket.status === "Upcoming"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "Ongoing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ticket.eventName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {ticket.date} · {ticket.time}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Venue:</span> {ticket.venue}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      Tickets:{" "}
                      <span className="font-semibold">{ticket.tickets}</span>
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatToRupiah(ticket.total)}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 text-center text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                      View Details
                    </button>
                    <button className="flex-1 py-2 text-center text-green-600 border border-green-500 rounded hover:bg-green-50">
                      Download Ticket
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-3">
                No tickets found for the selected filter.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
