"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";

interface ITicket {
  id: number;
  category: string;
  seats: number;
  price: number;
}

interface EventTicketsProps {
  tickets: ITicket[];
}

export default function ShowTickets({ tickets }: EventTicketsProps) {
  const router = useRouter();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleQuantityChange = (change: number) => {
    if (!selectedTicket) return;

    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedTicket.seats) {
      setQuantity(newQuantity);
    }
  };

  const total = selectedTicket ? selectedTicket.price * quantity : 0;

  const handleBookTicket = async () => {
    if (!selectedTicket) return;
    setIsLoading(true);
    const orderData = {
      ticketCart: [
        {
          ticket: { id: selectedTicket.id, price: selectedTicket.price },
          seats: quantity,
          subprice: selectedTicket.price,
        },
      ],
    };
    console.log(orderData);

    try {
      const response = await fetch(`${base_url}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

      alert("Order created successfully!");
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => {
              setSelectedTicketId(ticket.id);
              setQuantity(1);
            }}
            className={`cursor-pointer rounded-lg p-4 transition-all ${
              selectedTicketId === ticket.id
                ? "bg-zinc-800 border-2 border-orange-500"
                : "bg-zinc-800/50 border-2 border-transparent hover:bg-zinc-800"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{ticket.category}</h3>
                <p className="text-sm text-gray-400">
                  {ticket.seats} tickets left
                </p>
              </div>
              <span className="text-lg font-semibold text-yellow-400">
                {formatPrice(ticket.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="space-y-4">
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-1 rounded-full hover:bg-zinc-700 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= selectedTicket.seats}
                  className="p-1 rounded-full hover:bg-zinc-700 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            {/* Add Coupon Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg"
                value={couponId || ""}
                onChange={(e) => setCouponId(e.target.value)}
                placeholder="Enter coupon code (if any)"
              />
            </div>

            {/* Display total price after adjustments */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total Price</span>
              <span className="text-xl font-bold text-yellow-400">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={handleBookTicket}
              disabled={isLoading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Book Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
