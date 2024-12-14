"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { deleteCookie } from "@/components/libs/action";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Receipt,
  UserCircle,
  LogOut,
} from "lucide-react";
import useSession from "@/hooks/useSession";
import { IUser } from "@/types/user";

const CustomerDashboard = () => {
  const { isAuth, user, role, setIsAuth } = useSession();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    { icon: <Calendar size={24} />, text: "Bookings", href: "/bookings" },
    {
      icon: <Receipt size={24} />,
      text: "Transactions",
      href: "/transactions",
    },
    {
      icon: <UserCircle size={24} />,
      text: "My Profile",
      href: "/profile",
    },
  ];

  const customer = user as IUser;

  if (role === "promotor") {
    router.push("/promotor-dashboard");
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
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
              className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group ${
                isCollapsed ? "justify-center" : "gap-4"
              }`}
            >
              <div className="text-gray-500 group-hover:text-blue-600">
                {item.icon}
              </div>
              {!isCollapsed && <span className="font-medium">{item.text}</span>}
            </Link>
          ))}
        </nav>
        <div className="border-t">
          <div className="p-4">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <Image
                  src={customer?.avatar || "/user.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {customer?.name || customer?.username || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {customer?.email || ""}
                  </p>
                  <p className="text-xs text-blue-600 capitalize">
                    {customer?.isVerify ? "Verified Customer" : "Customer"}
                  </p>
                  {customer?.ref_code && (
                    <p className="text-xs text-gray-400">
                      Referral Code: {customer.ref_code}
                    </p>
                  )}
                  {customer?.referred_code && (
                    <p className="text-xs text-gray-400">
                      Referred By: {customer.referred_code}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Image
                  src={customer?.avatar || "/user.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
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
            className={`w-full flex items-center justify-center p-4 text-red-500 hover:bg-red-50 transition-colors ${
              isCollapsed ? "justify-center" : "gap-2"
            }`}
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
            Welcome, {isAuth ? customer?.name || customer?.username : "Guest"}!
          </p>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
