"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Receipt,
  Briefcase,
  ListChecks,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useSession } from "@/context/useSession";
import { IPromotor, IUser } from "@/types/user";

// Type Guard to check if user is a Promotor
function isPromotor(user: IUser | IPromotor): user is IPromotor {
  return (user as IPromotor).is_verify !== undefined;
}

const PromotorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isAuth, setIsAuth, setUser } = useSession(); // Use context here
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  const onLogout = () => {
    // Clear token from localStorage and logout user
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove role if it's stored in localStorage
    setIsAuth(false); // Update auth state in context
    setUser(null); // Clear user data in context
    router.push("/"); // Redirect to home
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={24} />,
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Receipt size={24} />,
      text: "Transactions",
      href: "/transactionsPromotor",
    },
    {
      icon: <ListChecks size={24} />,
      text: "List Event",
      href: "/listEvent",
    },
    {
      icon: <Briefcase size={24} />,
      text: "Promotor Management",
      href: "/promotorManagement",
    },
    {
      icon: <UserCircle size={24} />,
      text: "My Profile",
      href: "/profilePromotor",
    },
  ];

  if (!isAuth) {
    return <p>Loading...</p>; // You can handle loading better, maybe with a spinner or redirect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg transition-all duration-300 relative flex flex-col`}
      >
        <div className="flex items-center p-4 border-b">
          <Link href="/">
            <Image src="/logo.gif" alt="Logo" width={32} height={32} />
          </Link>
          {!isCollapsed && (
            <Link href="/">
              <span className="ml-3 text-xl font-bold text-gray-800">CATch</span>
            </Link>
          )}
        </div>

        <nav className="flex-1 mt-8 space-y-2 px-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-lg group relative transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                } ${isCollapsed ? "justify-center" : "gap-4"}`}
              >
                <div
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                </div>
                {!isCollapsed ? (
                  <span className="font-medium">{item.text}</span>
                ) : (
                  <span className="absolute left-full ml-6 p-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.text}
                  </span>
                )}
              </Link>
            );
          })}
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
                    {user?.name || user?.username || "Promotor"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  {/* Add null check for user before calling isPromotor */}
                  {user && isPromotor(user) ? (
                    <p className="text-xs text-blue-600 capitalize">
                      {user.is_verify ? "Promotor (Verified)" : "Promotor"}
                    </p>
                  ) : (
                    <p className="text-xs text-blue-600 capitalize">Customer</p>
                  )}
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
                <span className="absolute left-full ml-6 p-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {user?.name || user?.username || "Promotor"}
                  {user?.email && <br />}
                  {user?.email}
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
    </div>
  );
};

export default PromotorSidebar;
