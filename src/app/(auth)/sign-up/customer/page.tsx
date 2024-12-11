"use client";

import CustomerFormFields from "@/components/ui/customerFormFields";
import ToggleTabs from "@/components/ui/tabSwitcher";

export default function CustomerSignUpPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-gray-300 mt-16">
      <div className="w-full lg:w-1/2 relative">
        <img
          src="/cinema.jpeg"
          alt="Cinema venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 text-white">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-snug">
            You can attend events as you wish, <br /> but your wallet remains
            safe!
          </h1>
          <p className="text-lg">
            Create an account to get cheaper prices, extra discounts, & free
            insurance.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col justify-center p-6 lg:p-12">
        <ToggleTabs currentPath="/sign-up/customer" />
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
            Customer
          </h2>
          <p className="text-gray-400">
            When you register as a customer, you can browse available events,
            purchase tickets for events, and provide feedback on the events you
            have attended.
          </p>
        </div>
        <CustomerFormFields />
      </div>
    </div>
  );
}
