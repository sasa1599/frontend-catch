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
    "/ListEvents",
  ];
  
  const paths = usePathname();
  
  const shouldHideFooter =
    pathName.includes(paths) || paths.startsWith("/promotorManagement/");
  
  if (shouldHideFooter) {
    return null;
  }
  
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="http://localhost:3000/" className="flex items-center">
              <Image
                src="/Cat.gif"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-[150px]"
                alt="Cat Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:grid-cols-4">
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase">
                <span className="text-violet-500">CAT</span>ch the Moment
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Why Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold text-gray-900 uppercase">
                Partner WITH US
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/sign-up/promotor" className="hover:underline">
                    as Event Organizer
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
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
            <div></div>
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
