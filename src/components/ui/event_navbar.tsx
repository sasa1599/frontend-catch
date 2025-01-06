"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUser, IPromotor } from "@/types/user";
import { useSession } from "@/context/useSession";
import SearchBar from "@/helpers/searchBar";
import EventAvatarMenu from "./event_avatar";
import AvatarMenu from "./avatarmenu";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuth, setIsAuth } = useSession();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null); // Ref for burger menu
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown login

  const menuItems = [
    { label: "Browse events", href: "/browse_events" },
    { label: "About", href: "/about" },
  ];

  const loginOptions = [
    { label: "Customer", href: "/sign-in/signCustomer" },
    { label: "Promotor", href: "/sign-in/signPromotor" },
  ];

  

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
      const target = event.target as Node;

      // Close dropdown if click outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !(target instanceof HTMLElement && target.closest(".dropdown-button"))
      ) {
        setDropdownOpen(false);
      }

      // Close menu if click outside
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50 px-4 md:px-6 py-4 shadow text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.gif" alt="Logo" width={40} height={40} />
          <span className="text-lg md:text-2xl font-bold">CATch</span>
        </Link>

        {/* Desktop SearchBar */}
        <div className="hidden md:flex flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
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
            <EventAvatarMenu user={user} onLogout={onLogout} />
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                className="dropdown-button text-white hover:opacity-70 transition-opacity"
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
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)} // Close dropdown on click
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 bg-white shadow-lg rounded-lg px-4 py-6"
          ref={menuRef}
        >
          {/* Mobile SearchBar */}
          <div className="mb-4">
            <SearchBar />
          </div>

          {/* Mobile Menu Items */}
          <ul className="space-y-3 text-black">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-center  rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login Section */}
          <ul className="mt-4 space-y-3">
            {isAuth && (isCustomer(user) || isPromotor(user)) ? (
              <li>
                <AvatarMenu user={user} onLogout={onLogout} />
              </li>
            ) : (
              <li>
                <button
                  className="block w-full px-4 py-2 text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  Login
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu mt-2 w-full bg-white text-black border border-gray-200 rounded-lg shadow-lg">
                    {loginOptions.map((option) => (
                      <Link
                        key={option.label}
                        href={option.href}
                        className="block px-4 py-2 text-center hover:bg-gray-100"
                        onClick={() => {
                          setDropdownOpen(false); // Close dropdown on click
                          setMenuOpen(false); // Close menu if needed
                        }}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
