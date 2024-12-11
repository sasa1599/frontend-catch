"use client";

import Link from "next/link";

interface ToggleTabsProps {
  currentPath: string;
}

const ToggleTabs = ({ currentPath }: ToggleTabsProps) => {
  const isCustomer = currentPath === "/sign-up/customer";
  const isPromoter = currentPath === "/sign-up/promoter";

  return (
    <div className="flex mb-8">
      <Link
        href="/sign-up/customer"
        className={`flex-1 text-center py-2 px-4 ${
          isCustomer
            ? "bg-blue-500 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        Customer
      </Link>
      <Link
        href="/sign-up/promotor"
        className={`flex-1 text-center py-2 px-4 ${
          isPromoter
            ? "bg-blue-500 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        Promotor
      </Link>
    </div>
  );
};

export default ToggleTabs;