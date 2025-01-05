"use client";

import { createContext, useEffect, useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";
import { ITicket } from "@/types/allInterface";
import TicketOrder from "./ticketOrder";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";
import { getTicket } from "@/libs/ticket";

interface ITicketContext {
  ticket: ITicket;
  quantity: number;
}

export interface TicketContextValue {
  ticketCart: ITicketContext[] | null;
  setTicketCart: (param: ITicketContext[] | null) => void;
}

export const TicketContext = createContext<TicketContextValue | null>(null);

export default function ShowTickets({ event_id }: { event_id: string }) {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const router = useRouter();
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [ticketCart, setTicketCart] = useState<ITicketContext[] | null>(null);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const handleOrderTicket = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      console.log(ticketCart);
      const orderData = {
        total_price: totalPrice,
        final_price: totalPrice,
        ticketCart,
      };

      const response = await fetch(`${base_url}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      toast.success("OrderCreated");
      console.log("Order created successfully:", data);
      router.push("/transaksiCustomer");
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ticketCart) {
      setTotalPrice(
        ticketCart.reduce((a, b) => a + b.ticket.price * b.quantity, 0)
      );
    }
  }, [ticketCart]);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found");
        return;
      }
      const data = await getTicket(+event_id, token); // Kirim token di sini
      setTickets(data);
    };
    getData();
  }, [event_id]);
  

  return (
    <main>
      <TicketContext.Provider value={{ ticketCart, setTicketCart }}>
        <div className="flex flex-col">
          <div className="desc-content">
            {/* isi kontent */}
            <div className="flex flex-col">
              {tickets &&
                tickets.map((item, idx) => {
                  return <TicketOrder key={idx} ticket={item} />;
                })}
            </div>
          </div>
        </div>
        <div className="sticky top-0 flex flex-col xl:self-start">
          <div className="rounded-xl shadow-2xl flex flex-col gap-4  py-6">
            <div className="flex flex-col gap-6">
              {ticketCart && ticketCart.length > 0 ? (
                ticketCart.map((item, idx) => {
                  return (
                    <div
                      className="flex border-b pb-4 rounded-md gap-4"
                      key={idx}
                    >
                      <div className="flex flex-col w-full gap-2">
                        <span className="font-semibold">
                          {item.ticket.category}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-semibold">
                            {item.quantity} Ticket
                          </span>
                          <span className="font-semibold text-yellow-400">
                            {formatPrice(item.quantity * item.ticket.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1></h1>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {ticketCart && ticketCart?.length > 0 ? (
                <>
                  <div className="flex justify-between items-center py-2">
                    <span>
                      Selected {ticketCart.reduce((a, b) => a + b.quantity, 0)}{" "}
                      tickets
                    </span>
                    <span className="font-semibold text-yellow-400 text-xl">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </>
              ) : null}
            </div>
            <button
              disabled={isLoading}
              onClick={handleOrderTicket}
              className={`${
                isLoading &&
                "disabled:opacity-[0.5] disabled:cursor-not-allowed"
              } bg-yellow-500 rounded-md text-center text-white py-2 font-semibold`}
            >
              {isLoading ? "Loading ..." : "Book your ticket now!"}
            </button>
          </div>
        </div>
      </TicketContext.Provider>
    </main>
  );
}
