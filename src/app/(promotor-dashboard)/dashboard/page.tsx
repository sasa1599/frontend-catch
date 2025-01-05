"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PromotorSidebar from "@/components/ui/prosidebar";
import useProSession from "@/hooks/promotorSession";
import Image from "next/image";
import Link from "next/link";
import dashPromoGuard from "@/hoc/dashPromoGuard";

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

// Format currency to Rupiah
const formatRupiah = (value: number | null | undefined): string => {
  // Check if the value is a valid number and not undefined/null
  if (value == null || isNaN(value)) {
    return "Rp 0";
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
};

const DashboardPromotor: React.FC = () => {
  const { user, loading, error } = useProSession();
  const [filter, setFilter] = useState<"day" | "month" | "year">("year");
  const [events, setEvents] = useState<any[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  // Format date for display
  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  // Get lowest ticket price from tickets array
  const getLowestTicketPrice = (tickets: any[]) => {
    if (!tickets || tickets.length === 0) return 0;
    return Math.min(...tickets.map(ticket => ticket.price));
  };

  // Fetch event data
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
        const response = await axios.get(`${base_url}/events/promotor`, {
          withCredentials: true,
        });

        if (response.data) {
          // Set events data
          const eventData = response.data.events || [];
          setEvents(eventData);
          // Set total events count
          setTotalEvents(eventData.length);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEventsData();
  }, []);

  // Chart data
  const revenueData = {
    day: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Daily Revenue",
        data: [500000, 700000, 650000, 800000, 900000, 750000, 600000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      }]
    },
    month: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Monthly Revenue",
        data: [5000000, 7000000, 8000000, 9500000, 10000000, 7500000, 8500000, 11000000, 9500000, 12000000, 10500000, 13000000],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)"
      }]
    },
    year: {
      labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [{
        label: "Yearly Revenue",
        data: [50000000, 55000000, 60000000, 70000000, 75000000, 80000000, 85000000],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)"
      }]
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue Statistics" }
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <PromotorSidebar />

      <div className="flex-1 overflow-y-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {user?.name}!</h1>
            <p className="text-gray-500">Manage your Korean-themed events and monitor revenue.</p>
          </div>
          <Image
            src={user?.avatar || "/user.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border"
          />
        </header>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <Link
            href="/transactionsPromotor"
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-blue-500">{formatRupiah(85000000)}</p>
            <p className="text-gray-600">Total Revenue</p>
          </Link>
          <Link
            href="/transactionsPromotor"
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-blue-500">1,280</p>
            <p className="text-gray-600">Total Transactions</p>
          </Link>
          <Link
            href="/listEvent"
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-blue-500">{totalEvents}</p>
            <p className="text-gray-600">Total Events</p>
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Revenue Statistics</h3>
            <div className="space-x-2">
              {["day", "month", "year"].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option as "day" | "month" | "year")}
                  className={`px-4 py-2 rounded ${
                    filter === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <Line data={revenueData[filter]} options={chartOptions} />
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">List of Korean Events</h3>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events found</p>
          ) : (
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={event.id || index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{event.title}</p>
                    <p className="text-gray-500 text-sm">
                      Date: {formatEventDate(event.datetime)} | 
                      Category: {event.category} | 
                      Venue: {event.venue}
                    </p>
                  </div>
                  <div className="flex flex-col items-end min-w-[150px]">
                    <p className="text-blue-500 font-semibold text-right w-full">
                      {formatRupiah(getLowestTicketPrice(event.tickets))}
                    </p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Recent Transactions</h3>
          <ul className="space-y-4">
            {[
              {
                customer: "John Doe",
                event: "BTS World Tour",
                amount: 500000,
                status: "SUCCESS",
              },
            ].map((transaction, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-gray-800 font-medium">{transaction.customer}</p>
                  <p className="text-gray-500 text-sm">Event: {transaction.event}</p>
                </div>
                <div>
                  <p className="text-blue-500 font-semibold">
                    {formatRupiah(transaction.amount)}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      transaction.status === "SUCCESS"
                        ? "text-green-500"
                        : transaction.status === "PENDING"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default dashPromoGuard(DashboardPromotor) ;