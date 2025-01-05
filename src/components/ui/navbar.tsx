"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUser, IPromotor } from "@/types/user";
import { useSession } from "@/context/useSession";
import SearchBar from "@/helpers/searchBar";
import AvatarMenu from "./avatarmenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuth, setIsAuth } = useSession();
  const router = useRouter();
  const menuItems = [
    { label: "Browse events", href: "/browse_events" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Help Center", href: "/help" },
    { label: "Blog", href: "/blog" },
  ];

  const loginOptions = [
    { label: "Customer", href: "/sign-in/signCustomer" },
    { label: "Promotor", href: "/sign-in/signPromotor" },
  ];

  const pathName = [
    "/dashboard",
    "/dashboardCustomer",
    "/profileCustomer",
    "/events",
    "/loading",
    "/profilePromotor",
    "/transactionsPromotor",
    "/listEvent",
    "/promotorManagement",
    "/transaksiCustomer",
    "/ticketCustomer",
    "/browse_events",
    "/Order",
    "/ListEvents",
  ];
  const paths = usePathname();
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuth(false);
    router.push("/");
  };

  // Type guards to differentiate between IUser and IPromotor
  const isCustomer = (user: IUser | IPromotor | null): user is IUser => {
    return user !== null && "ref_code" in user && "isVerify" in user;
  };

  const isPromotor = (user: IUser | IPromotor | null): user is IPromotor => {
    return user !== null && "company" in user && "events" in user;
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".dropdown-button") &&
        !target.closest(".dropdown-menu")
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  if (pathName.includes(paths)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 px-4 md:px-6 py-4 shadow text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.gif" alt="Logo" width={40} height={40} />
          <span className="text-lg md:text-2xl font-bold">CATch</span>
        </Link>
        <div className="hidden md:flex flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className=" hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          {isAuth && user ? (
            <AvatarMenu user={user} onLogout={onLogout} />
          ) : (
            <div className="relative">
              <button
                className="dropdown-button  hover:opacity-70 transition-opacity"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Login
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2  hover:bg-gray-100"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          <button className="px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
            GET THE APP
          </button>
        </div>
        <button
          className="block md:hidden "
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4">
          {/* Search bar for mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
            {/* Search dropdown below the input */}
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20">
              <ul className="mt-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2  hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mt-4">
            {isAuth && (isCustomer(user) || isPromotor(user)) ? (
              <li>
                <AvatarMenu user={user} onLogout={onLogout} />
              </li>
            ) : (
              <li>
                <button
                  className="dropdown-button  hover:opacity-70 transition-opacity"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  Login
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu absolute top-full mt-2 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {loginOptions.map((option) => (
                      <Link
                        key={option.label}
                        href={option.href}
                        className="block px-4 py-2  hover:bg-gray-100"
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            )}
            <li>
              <button className="px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
                GET THE APP
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
