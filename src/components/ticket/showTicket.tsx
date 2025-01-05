"use client";

import { createContext, useEffect, useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";
import { ITicket } from "@/types/allInterface";

import TicketOrder from "./ticketOrder";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";
import { getTicket } from "@/libs/ticket";
import { getCoupon, getPoint } from "@/libs/customer";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  let final_price = totalPrice;
  const [coupon, setCoupon] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  let point = 0;
  const [isReedemedCoupon, setIsReedemedCoupon] = useState<boolean>(false);
  const [isReedemedPoints, setIsReedemedPoints] = useState<boolean>(false);
  const { user } = useSession();
  const [ticketCart, setTicketCart] = useState<ITicketContext[] | null>(null);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const handleOrderTicket = async () => {
    if (!user) return;
    try {
      // Cek apakah ticketCart kosong
      if (!ticketCart || ticketCart.length === 0) {
        toast.error(
          "You must select at least one ticket before placing an order."
        );
        return;
      }

      setIsLoading(true);
      if (isReedemedPoints) {
        final_price -= points;
        point = points;
      }
      if (isReedemedCoupon) final_price -= final_price / 10;

      const orderData = {
        total_price: totalPrice,
        coupon: isReedemedCoupon,
        point,
        final_price,
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
      toast.success("Order created successfully");
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
      const dataCoupon = await getCoupon();
      const dataPoints = await getPoint();
      setCoupon(dataCoupon);
      setPoints(dataPoints);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found");
        return;
      }
      const data = await getTicket(+event_id, token);
      console.log("data", data);

      setTickets(data);
    };
    getData();
  }, [event_id]);

  const handleReedemCoupon = () => {
    setIsReedemedCoupon(true);
    setCoupon(false);
  };

  const handleReedemPoints = () => {
    setIsReedemedPoints(true);
  };

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
                  {coupon || points ? (
                    <div className="flex gap-2 justify-between">
                      <button
                        onClick={handleReedemCoupon}
                        disabled={!coupon}
                        className="rounded-md px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 bg-lightBlue font-semibold text-white text-xs"
                      >
                        CLAIM COUPON
                      </button>
                      <button
                        onClick={handleReedemPoints}
                        disabled={isReedemedPoints || points <= 0}
                        className={`flex gap-1 px-2 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 border-lightBlue font-semibold text-lightBlue text-xs`}
                      >
                        <span>CLAIM POINTS</span>
                        <span>
                          {!isReedemedPoints
                            ? points >= 1000
                              ? `${points / 1000}K`
                              : points
                            : 0}
                        </span>
                      </button>
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center py-2">
                      <span>
                        Total {ticketCart.reduce((a, b) => a + b.quantity, 0)}{" "}
                        tiket
                      </span>
                      <span className="font-semibold text-blue-500 text-xl">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    {isReedemedPoints ? (
                      <div className="py-2 flex justify-end">
                        <span className="font-semibold text-red-500 text-xl">
                          - {formatPrice(points)}
                        </span>
                      </div>
                    ) : null}
                    {isReedemedCoupon ? (
                      <div className="py-2 flex justify-end">
                        <span className="font-semibold text-red-500 text-xl">
                          -
                          {isReedemedPoints
                            ? formatPrice((totalPrice - points) / 10)
                            : formatPrice(totalPrice / 10)}
                        </span>
                      </div>
                    ) : null}
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