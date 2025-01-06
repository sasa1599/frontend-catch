"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = [
    "/dashboard",
    "/dashboardCustomer",
    "/profileCustomer",
    "/events",
    "/transactions",
    "/transactionsCustomer",
    "/loading",
    "/profilePromotor",
    "/transactionsPromotor",
    "/listEvent",
    "/promotorManagement",
    "/ticketCustomer",
    "/transaksiCustomer",
    "/sign-up/customer",
    "/sign-up/promotor",
  ];

  const paths = usePathname();

  const shouldHideFooter =
    pathName.includes(paths) || paths.startsWith("/promotorManagement/");

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="bg-white text-black py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link href="/" className="flex justify-center md:justify-start">
              <Image
                src="/Cat.gif"
                width={150}
                height={150}
                className="object-contain"
                alt="Cat Logo"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-4 text-lg font-semibold text-violet-500">
                CAT<span className="text-black">ch</span> the Moment
              </h2>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-violet-500 transition duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-violet-500 transition duration-200"
                  >
                    Why Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Partner WITH US
              </h2>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link
                    href="/sign-up/promotor"
                    className="hover:text-violet-500 transition duration-200"
                  >
                    as Event Organizer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-violet-500 transition duration-200"
                  >
                    Why Event With Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-semibold uppercase">
                The Event
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/browse_events" className="hover:underline">
                    Our Event
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact</h2> */}
            {/* <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link href="/contact" className="hover:text-violet-500 transition duration-200">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-violet-500 transition duration-200">FAQ</Link>
                </li>
              </ul> */}
            {/* </div> */}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              <span>CAT</span>ch The Moment™
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
