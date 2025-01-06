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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPromotor: React.FC = () => {
  const { user, loading, error } = useProSession();
  const [filter, setFilter] = useState<"day" | "month" | "year">("month");
  const [events, setEvents] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });
  const [revenueData, setRevenueData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_BE;

  // API Calls
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/promotor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.events || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  const fetchOrderCount = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/orders/promotor/${user?.id}/count`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data.orderCount || 0;
    } catch (error) {
      console.error("Error fetching order count:", error);
      return 0;
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/revenue/promotor/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data.totalRevenue || 0;
    } catch (error) {
      console.error("Error fetching total revenue:", error);
      return 0;
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const [eventsData, orderCount, totalRevenue] = await Promise.all([
        fetchEvents(),
        fetchOrderCount(),
        fetchTotalRevenue(),
      ]);

      setEvents(eventsData);
      setOrders([]); // We don't need order data now, it's just for counting transactions

      setDashboardStats({
        totalEvents: eventsData.length,
        totalRevenue,
        totalTransactions: orderCount,
      });

      // Update revenue chart data
      updateRevenueChart(eventsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setIsLoading(false);
    }
  };

  // Utility Functions
  const formatRupiah = (value: number | null | undefined): string => {
    if (value == null || isNaN(value)) {
      return "Rp 0";
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getLowestTicketPrice = (tickets: any[]) => {
    if (!tickets || tickets.length === 0) return 0;
    return Math.min(...tickets.map((ticket) => ticket.price));
  };

  // Chart Data Processing
  const groupRevenueData = (
    orders: any[],
    filterType: "day" | "month" | "year"
  ) => {
    const grouped = orders.reduce((acc: any, order: any) => {
      const date = new Date(order.createdAt);
      if (isNaN(date.getTime())) return acc; // Skip invalid dates

      let key;

      switch (filterType) {
        case "day":
          key = date.toISOString().split("T")[0]; // format to YYYY-MM-DD
          break;
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`; // format to YYYY-MM
          break;
        case "year":
          key = `${date.getFullYear()}`; // format to YYYY
          break;
        default:
          return acc;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += order.final_price || 0;
      return acc;
    }, {});

    return grouped;
  };

  const updateRevenueChart = (eventsData: any[]) => {
    const groupedData = groupRevenueData(eventsData, filter);
    const now = new Date();
    let startDate = new Date();
    let labels: string[] = [];
    let data: number[] = [];

    switch (filter) {
      case "day":
        startDate.setDate(now.getDate() - 7); // 7 days ago
        while (startDate <= now) {
          const key = startDate.toISOString().split("T")[0];
          labels.push(
            startDate.toLocaleDateString("en-US", { weekday: "short" })
          );
          data.push(groupedData[key] || 0); // Ensure fallback to 0 if no data for the day
          startDate.setDate(startDate.getDate() + 1);
        }
        break;

      case "month":
        startDate.setMonth(now.getMonth() - 11); // 11 months ago
        while (startDate <= now) {
          const key = `${startDate.getFullYear()}-${String(
            startDate.getMonth() + 1
          ).padStart(2, "0")}`;
          labels.push(
            startDate.toLocaleDateString("en-US", { month: "short" })
          );
          data.push(groupedData[key] || 0); // Ensure fallback to 0 if no data for the month
          startDate.setMonth(startDate.getMonth() + 1);
        }
        break;

      case "year":
        startDate.setFullYear(now.getFullYear() - 4); // 4 years ago
        while (startDate <= now) {
          const key = `${startDate.getFullYear()}`;
          labels.push(key);
          data.push(groupedData[key] || 0); // Ensure fallback to 0 if no data for the year
          startDate.setFullYear(startDate.getFullYear() + 1);
        }
        break;
    }

    setRevenueData({
      labels,
      datasets: [
        {
          label: "Revenue",
          data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    });
  };

  // Effects
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      updateRevenueChart(events);
    }
  }, [filter, events]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Revenue Statistics",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Revenue: ${formatRupiah(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatRupiah(value);
          },
        },
      },
    },
  };

  if (loading || isLoading) {
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
            <h1 className="text-2xl font-bold text-gray-800">
              Hello, {user?.name}!
            </h1>
            <p className="text-gray-500">
              Manage your events and monitor revenue
            </p>
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
            <p className="text-3xl font-bold text-blue-500">
              {formatRupiah(dashboardStats.totalRevenue)}
            </p>
            <p className="text-gray-600">Total Revenue</p>
          </Link>
          <Link
            href="/transactionsPromotor"
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-blue-500">
              {dashboardStats.totalTransactions}
            </p>
            <p className="text-gray-600">Total Transactions</p>
          </Link>
          <Link
            href="/listEvent"
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-blue-500">
              {dashboardStats.totalEvents}
            </p>
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
                  } transition-colors`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {revenueData && <Line data={revenueData} options={chartOptions} />}
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">List of Events</h3>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events found</p>
          ) : (
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li
                  key={event.id || index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{event.title}</p>
                    <p className="text-gray-500 text-sm">
                      Date: {formatEventDate(event.datetime)} | Category:{" "}
                      {event.category} | Venue: {event.venue}
                    </p>
                  </div>
                  <div className="flex flex-col items-end min-w-[150px]">
                    <p className="text-gray-700">
                      {formatRupiah(getLowestTicketPrice(event.tickets))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default dashPromoGuard(DashboardPromotor);
