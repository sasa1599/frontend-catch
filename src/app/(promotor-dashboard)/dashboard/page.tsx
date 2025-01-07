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
 ChartOptions,
 TooltipItem
} from "chart.js";
import PromotorSidebar from "@/components/ui/prosidebar";
import useProSession from "@/hooks/promotorSession";
import Image from "next/image";
import Link from "next/link";
import dashPromoGuard from "@/hoc/dashPromoGuard";
import { IEvent } from "@/types/allInterface";

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
);

interface RevenueData {
 final_price: number;
 created_at: string;  
 event_title: string;
}

interface ChartData {
 labels: string[];
 datasets: Array<{
   label: string;
   data: number[];
   borderColor: string;
   backgroundColor: string;
   tension: number;
 }>;
}

interface DashboardState {
 totalEvents: number;
 totalRevenue: number;
 totalTransactions: number;
}

interface GroupedData {
 [key: string]: number;
}

const DashboardPromotor: React.FC = () => {
 const { user, loading, error } = useProSession();
 const [filter, setFilter] = useState<"day" | "month" | "year">("month");
 const [events, setEvents] = useState<IEvent[]>([]);
 const [dashboardStats, setDashboardStats] = useState<DashboardState>({
   totalEvents: 0,
   totalRevenue: 0,
   totalTransactions: 0,
 });
 const [revenueData, setRevenueData] = useState<ChartData | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_BE;

 const fetchEvents = async (): Promise<IEvent[]> => {
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

 const fetchOrderCount = async (): Promise<number> => {
   try {
     const response = await axios.get(
       `${BASE_URL}/admin/orders/${user?.id}`,
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }
     );
     
     const orders = response.data.result || [];
     return orders.length || 0;

   } catch (error) {
     console.error("Error fetching order count:", error);
     return 0;
   }
 };

 const fetchTotalRevenue = async (): Promise<RevenueData[]> => {
   try {
     const response = await axios.get(
       `${BASE_URL}/admin/revenue/${user?.id}`,
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }
     );
     
     const revenueData = response.data.data || response.data || [];
     
     if (!Array.isArray(revenueData)) {
       console.error("Revenue data is not an array:", revenueData);
       return [];
     }
 
     const total = revenueData.reduce((sum: number, order: RevenueData) => 
       sum + (Number(order.final_price) || 0), 0
     );
 
     setDashboardStats(prev => ({
       ...prev,
       totalRevenue: total
     }));
 
     return revenueData;
   } catch (error) {
     console.error("Error fetching total revenue:", error);
     return [];
   }
 };

 const fetchDashboardStats = async () => {
   if (!user?.id) return;
   
   try {
     const [eventsData, orderCount] = await Promise.all([
       fetchEvents(),
       fetchOrderCount(),
     ]);

     setEvents(eventsData);
     setDashboardStats(prev => ({
       ...prev,
       totalEvents: eventsData.length,
       totalTransactions: orderCount,
     }));

     setIsLoading(false);
   } catch (error) {
     console.error("Error fetching dashboard stats:", error);
     setIsLoading(false);
   }
 };

 const formatRupiah = (value: number): string => {
   if (value == null || isNaN(value)) return "Rp 0";
   return `Rp ${value.toLocaleString("id-ID")}`;
 };

 const formatDate = (dateString: string): string => {
   const date = new Date(dateString);
   if (isNaN(date.getTime())) return "Invalid Date";
   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const year = date.getFullYear();
   return `${day}-${month}-${year}`;
 };

 const groupRevenueData = (revenueData: RevenueData[], filterType: "day" | "month" | "year"): GroupedData => {
   return revenueData.reduce((acc: GroupedData, order: RevenueData) => {
     const date = new Date(order.created_at);
     if (isNaN(date.getTime())) return acc;

     let key: string;
     switch (filterType) {
       case "day":
         key = formatDate(date.toISOString());
         break;
       case "month":
         key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
         break;
       case "year":
         key = `${date.getFullYear()}`;
         break;
       default:
         return acc;
     }

     if (!acc[key]) {
       acc[key] = 0;
     }
     acc[key] += Number(order.final_price) || 0;
     return acc;
   }, {});
 };

 useEffect(() => {
   if (user?.id) {
     fetchDashboardStats();
   }
 }, [user?.id]);

 useEffect(() => {
   const updateChart = async () => {
     if (user?.id) {
       const revenueData = await fetchTotalRevenue();
       const groupedData = groupRevenueData(revenueData, filter);
       
       const now = new Date();
       const startDate = new Date();
       const labels: string[] = [];
       const data: number[] = [];

       switch (filter) {
         case "day":
           startDate.setDate(now.getDate() - 7);
           while (startDate <= now) {
             const key = formatDate(startDate.toISOString());
             labels.push(formatDate(startDate.toISOString()));
             data.push(groupedData[key] || 0);
             startDate.setDate(startDate.getDate() + 1);
           }
           break;

         case "month":
           startDate.setMonth(now.getMonth() - 11);
           while (startDate <= now) {
             const key = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;
             labels.push(startDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" }));
             data.push(groupedData[key] || 0);
             startDate.setMonth(startDate.getMonth() + 1);
           }
           break;

         case "year":
           startDate.setFullYear(now.getFullYear() - 4);
           while (startDate <= now) {
             const key = `${startDate.getFullYear()}`;
             labels.push(key);
             data.push(groupedData[key] || 0);
             startDate.setFullYear(startDate.getFullYear() + 1);
           }
           break;
       }

       setRevenueData({
         labels,
         datasets: [{
           label: "Revenue",
           data,
           borderColor: "rgb(75, 192, 192)",
           backgroundColor: "rgba(75, 192, 192, 0.2)",
           tension: 0.4,
         }],
       });
     }
   };

   updateChart();
 }, [filter, user?.id]);

 const chartOptions: ChartOptions<'line'> = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
     legend: {
       position: 'top',
       labels: {
         font: { size: 12 }
       }
     },
     title: {
       display: true,
       text: "Revenue Statistics",
       font: {
         size: 16,
         weight: 'bold'
       }
     },
     tooltip: {
       callbacks: {
         label: function(context: TooltipItem<'line'>) {
           return `Revenue: ${formatRupiah(context.parsed.y)}`;
         }
       }
     }
   },
   scales: {
     y: {
       type: 'linear',
       beginAtZero: true,
       ticks: {
         callback: function(value: number | string) {
           return formatRupiah(Number(value));
         }
       }
     },
     x: {
       type: 'category',
       grid: {
         display: false
       }
     }
   }
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
         <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition">
           <p className="text-3xl font-bold text-blue-500">
             {formatRupiah(dashboardStats.totalRevenue)}
           </p>
           <p className="text-gray-600">Total Revenue</p>
         </div>
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
         <div className="h-[400px]">
           {revenueData && <Line data={revenueData} options={chartOptions} />}
         </div>
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
                     Date: {formatDate(event.datetime)} | Category: {event.category} | Venue: {event.venue}
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