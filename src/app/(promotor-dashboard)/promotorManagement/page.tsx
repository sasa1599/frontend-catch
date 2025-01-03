"use client"; 

import dashPromoGuard from "@/hoc/dashPromoGuard"; // Import the guard
import CreateEventPage from "@/components/event/createEvent";
import PromotorSidebar from "@/components/ui/prosidebar";

function PromotorManagement() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <PromotorSidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen text-black overflow-auto shadow-lg rounded-lg">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Create Your Event Here</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Event Details</h2>
          <CreateEventPage />
        </div>
      </div>
    </div>
  );
}

// Wrap the PromotorManagement component with the dashPromoGuard
export default dashPromoGuard(PromotorManagement);
