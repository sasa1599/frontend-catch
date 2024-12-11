"use client";

import PromoterFormFields from "@/components/ui/promotorFormFields";
import ToggleTabs from "@/components/ui/tabSwitcher";

export default function PromoterSignUpPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-gray-300 mt-16">
      <div className="w-full lg:w-1/2 relative">
        <img
          src="/cinema.jpeg"
          alt="Cinema venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-snug">
            Organize events with ease, while keeping your budget in check!
          </h1>
          <p className="text-lg">
            Create an account to access special tools, manage multiple events,
            and unlock exclusive benefits for your promotions.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col justify-center p-6 lg:p-12">
        <ToggleTabs currentPath="/sign-up/promoter" />
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
            Promotor
          </h2>
          <p className="text-gray-400">
            As a promoter, you can manage events, transactions, and gather
            feedback from customers.
          </p>
        </div>
        <PromoterFormFields />
      </div>
    </div>
  );
}
