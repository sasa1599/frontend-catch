"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUser, IPromotor } from "@/types/user";
import { useSession } from "@/context/useSession";
import SearchBar from "@/helpers/searchBar";
import AvatarMenu from "./avatarmenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { user, isAuth, setIsAuth } = useSession();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Browse events", href: "/browse_events" },
    { label: "About", href: "/about" },
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
    "/browse_events/[slug]",
    "/browse_events/category/[category]]",
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

  const handleMobileLoginClick = (href: string) => {
    setMobileDropdownOpen(false);
    setMenuOpen(false);
    router.push(href);
  };

  const isCustomer = (user: IUser | IPromotor | null): user is IUser => {
    return user !== null && "ref_code" in user && "isVerify" in user;
  };

  const isPromotor = (user: IUser | IPromotor | null): user is IPromotor => {
    return user !== null && "company" in user && "events" in user;
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close desktop dropdown if click outside
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(target) &&
        !(
          target instanceof HTMLElement &&
          target.closest(".desktop-dropdown-button")
        )
      ) {
        setDesktopDropdownOpen(false);
      }

      // Close mobile dropdown if click outside
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target) &&
        !(
          target instanceof HTMLElement &&
          target.closest(".mobile-dropdown-button")
        )
      ) {
        setMobileDropdownOpen(false);
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

  if (pathName.includes(paths)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 px-4 md:px-6 py-4 shadow text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.gif" alt="Logo" width={40} height={40} />
          <span className="text-lg md:text-2xl font-bold">CATch</span>
        </Link>

        {/* Desktop SearchBar */}
        <div className="hidden md:flex flex-1 mx-4">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        {/* Desktop Menu */}
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
          {isAuth && user ? (
            <AvatarMenu user={user} onLogout={onLogout} />
          ) : (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                className="desktop-dropdown-button text-black hover:opacity-70 transition-opacity"
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
              >
                Login
              </button>
              {desktopDropdownOpen && (
                <div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                      onClick={() => setDesktopDropdownOpen(false)}
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
          className="block md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
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
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          {/* Mobile Menu Items */}
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-center text-black rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Login Section */}
          <div className="mt-4 space-y-3" ref={mobileDropdownRef}>
            {isAuth && (isCustomer(user) || isPromotor(user)) ? (
              <div>
                <AvatarMenu user={user} onLogout={onLogout} />
              </div>
            ) : (
              <div>
                <button
                  className="w-full px-4 py-2 text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors mobile-dropdown-button"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                >
                  Login
                </button>
                {mobileDropdownOpen && (
                  <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {loginOptions.map((option) => (
                      <button
                        key={option.label}
                        className="w-full px-4 py-2 text-center text-black hover:bg-gray-100"
                        onClick={() => handleMobileLoginClick(option.href)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;