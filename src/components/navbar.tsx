"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Browse events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Help Center", href: "/help" },
    { label: "Blog", href: "/blog" },
    { label: "Login", href: "/login" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 px-4 md:px-6 py-4 text-black shadow">
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
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className="text-black hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
              {hoveredItem === item.label && (
                <div className="absolute -top-4 left-0 right-0 h-0.5 bg-black" />
              )}
            </div>
          ))}
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
