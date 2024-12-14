"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Receipt,
  UserCircle,
  LogOut,
} from "lucide-react";
import useProSession from "@/hooks/promotorSession";
import { deleteCookie } from "@/components/libs/action";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isAuth, loading, error, setIsAuth } = useProSession();
  const router = useRouter();

  const onLogout = () => {
    deleteCookie("token");
    setIsAuth(false);
    
    router.push("/");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={24} />,
      text: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Calendar size={24} />, text: "Events", href: "/events" },
    {
      icon: <Receipt size={24} />,
      text: "Transactions",
      href: "/dashboard/transaction",
    },
    {
      icon: <UserCircle size={24} />,
      text: "My Profile",
      href: "/dashboard/profile",
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg transition-all duration-300 relative flex flex-col`}
      >
        <div className="flex items-center p-4 border-b">
          <Image src="/logo.gif" alt="Logo" width={32} height={32} />
          {!isCollapsed && (
            <span className="ml-3 text-xl font-bold text-gray-800">
              Ngeivent
            </span>
          )}
        </div>
        <nav className="flex-1 mt-8 space-y-2 px-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative ${
                !isCollapsed ? "gap-4" : "justify-center"
              }`}
            >
              <div className="text-gray-500 group-hover:text-blue-600">
                {item.icon}
              </div>

              {!isCollapsed ? (
                <span className="font-medium">{item.text}</span>
              ) : (
                <span
                  className="absolute left-full ml-6 p-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                >
                  {item.text}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t">
          <div className="p-4">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <Image
                  src={user?.avatar || "/user.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || user?.username || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  <p className="text-xs text-blue-600 capitalize">
                    {user?.is_verify ? "Promotor (Verified)" : "Promotor"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center group relative">
                <Image
                  src={user?.avatar || "/user.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span
                  className="absolute left-full ml-6 p-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                >
                  {user?.name || user?.username || "Guest"}
                  {user?.email && <br />}
                  {user?.email}
                  <br />
                  <span className="capitalize">
                    {user?.is_verify ? "Promotor (Verified)" : "Promotor"}
                  </span>
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-4 text-gray-500 hover:bg-gray-100 transition-colors flex justify-center"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <div className="border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-4 text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome, {isAuth ? user?.name || user?.username : "Guest"}!
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardSidebar;
