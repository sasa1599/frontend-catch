"use client";

import useSession from "@/hooks/useSession";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { label: "Browse events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Help Center", href: "/help" },
    { label: "Blog", href: "/blog" },
  ];

  const loginOptions = [
    { label: "Customer Login", href: "/sign-in/signCustomer" },
    { label: "Promotor Login", href: "/sign-in/signPromotor" },
  ];

  const {user} = useSession();
  console.log(user, "user");
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 px-4 md:px-6 py-4 shadow text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.gif" alt="Logo" width={40} height={40} />
          <span className="text-lg md:text-2xl font-bold">CATch</span>
        </Link>
        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-black hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className="dropdown-button text-black hover:opacity-70 transition-opacity"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu absolute top-full mt-2 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {loginOptions.map((option) => (
                  <Link
                    key={option.label}
                    href={option.href}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button className="px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
            GET THE APP
          </button>
        </div>
        <button
          className="block md:hidden text-black"
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
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none mb-4"
          />
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-black hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                className="dropdown-button text-black hover:opacity-70 transition-opacity"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Login
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
              GET THE APP
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
