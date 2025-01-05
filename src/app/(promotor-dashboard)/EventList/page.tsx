"use client";

import React from "react";
import Image from "next/image";
import PromotorSidebar from "@/components/ui/prosidebar";
import { getCustomerOrderDetail } from "@/libs/order";

interface Event {
  id: number;
  title: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  price?: number | "Free";
  imageUrl: string;
  rating: number;
  recommended: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "BTS World Tour: Music Concert",
    location: "Seoul, Korea",
    dateFrom: "13th Jan 2024",
    dateTo: "14th Jan 2024",
    price: 1139,
    imageUrl: "/events/concert.jpg",
    rating: 50,
    recommended: 100,
  },
  {
    id: 2,
    title: "Running Man Fanmeet",
    location: "Busan, Korea",
    dateFrom: "15th Jan 2024",
    dateTo: "16th Jan 2024",
    price: "Free",
    imageUrl: "/events/fanmeet.jpg",
    rating: 60,
    recommended: 95,
  },
  {
    id: 3,
    title: "Crash Landing on You: Theater Show",
    location: "Incheon, Korea",
    dateFrom: "20th Jan 2024",
    dateTo: "21st Jan 2024",
    price: "Free",
    imageUrl: "/events/theater.jpg",
    rating: 70,
    recommended: 90,
  },
  {
    id: 4,
    title: "K-League Sports Championship",
    location: "Seoul, Korea",
    dateFrom: "25th Jan 2024",
    dateTo: "26th Jan 2024",
    price: "Free",
    imageUrl: "/events/sports.jpg",
    rating: 80,
    recommended: 85,
  },
];

const ListEvents: React.FC = async () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <PromotorSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {event.price === "Free" ? "Free" : `$ ${event.price}`}
                </div>
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Online Event
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                <p className="text-xs text-gray-400 mt-1">
                  From {event.dateFrom} to {event.dateTo}
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Rating</span>
                    <span>{event.rating}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-yellow-400 h-1.5 rounded-full"
                      style={{ width: `${event.rating}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Recommended</span>
                    <span>{event.recommended}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-orange-400 h-1.5 rounded-full"
                      style={{ width: `${event.recommended}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListEvents;
