"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PromotorSidebar from "@/components/ui/prosidebar";
import { IEvent } from "@/types/allInterface";
import useProSession from "@/hooks/promotorSession";
import dashPromoGuard from "@/hoc/dashPromoGuard";

const ListEvents: React.FC = () => {
  const { isAuth, user, loading: sessionLoading, error: sessionError } = useProSession();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isAuth) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${base_url}/events/promotor`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuth && user) {
      fetchEvents();
    }
  }, [isAuth, user]);

  const roundToNearestCategory = (price: number) => {
    if (price === 0) return "Free";

    // Define categories for rounding
    const categories = [20000, 100000, 500000, 1000000];
    let roundedPrice = categories[0]; // Default to 20,000

    // Find the nearest price category
    for (let i = 0; i < categories.length; i++) {
      if (price <= categories[i]) {
        roundedPrice = categories[i];
        break;
      }
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Remove decimals
    }).format(roundedPrice);
  };

  const getLowestTicketPrice = (tickets: IEvent["tickets"]) => {
    if (!tickets || tickets.length === 0) return "Free";

    const lowestPrice = Math.min(...tickets.map((ticket) => ticket.price));

    return roundToNearestCategory(lowestPrice);
  };

  const getFormattedTicketPrice = (price: number) => {
    return roundToNearestCategory(price);
  };

  const handleEventClick = (event: IEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Function to remove <p> tags from description
  const sanitizeDescription = (description: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;

    // Convert HTMLCollection to array before iterating
    const paragraphs = Array.from(tempDiv.getElementsByTagName("p"));

    // Iterate through paragraphs and remove <p> tags
    paragraphs.forEach(p => {
      p.parentNode?.replaceChild(document.createTextNode(p.textContent || ""), p);
    });

    return tempDiv.innerHTML;
  };

  if (isLoading || sessionLoading) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
        <PromotorSidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error || sessionError) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
        <PromotorSidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-xl text-red-600">{error || sessionError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <PromotorSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Events</h1>
        {events.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">
            No events found. Start by creating a new event!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="relative">
                  <Image
                    src={event.thumbnail || "/placeholder-event.jpg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {getLowestTicketPrice(event.tickets)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(event.datetime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for event details */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
            <p className="text-gray-600 mt-4">Price starts from: {getLowestTicketPrice(selectedEvent.tickets)}</p>
            <p className="text-gray-600 mt-4">Tickets:</p>
            <ul>
              {selectedEvent.tickets.map((ticket, index) => (
                <li key={index} className="text-gray-500">
                  {ticket.price === 0
                    ? "Free"
                    : getFormattedTicketPrice(ticket.price)} 
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <strong className="text-gray-600">Description:</strong>
              <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: sanitizeDescription(selectedEvent.description) }} />
            </div>
            <p className="text-gray-600 mt-4">Slug: {selectedEvent.slug}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default dashPromoGuard(ListEvents) ;
