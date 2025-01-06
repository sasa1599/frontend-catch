"use client";
import dashPromoGuard from "@/hoc/dashPromoGuard"; // Import the guard
import React, { useEffect, useState } from "react";
import CreateTicketPage from "@/components/ticket/createTicket";
import LinkCheck from "@/components/ticket/linkCheck";
import { formatPrice } from "@/helpers/formatPrice";
import { getTicket } from "@/libs/ticket";
import { ITicket } from "@/types/allInterface";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import PromotorSidebar from "@/components/ui/prosidebar";

export default function TicketPage({ params }: { params: { event_id: string } }) {
  const [result, setResult] = useState<ITicket[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        if (!token) throw new Error("Token not found");

        const tickets = await getTicket(+params.event_id, token); // Pass token ke fungsi
        setResult(tickets);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load tickets");
      }
    };

    fetchTickets();
  }, [params.event_id]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <PromotorSidebar/>
      <div className='flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto'>
        <CreateTicketPage params={params} />
        <div className="mt-10 border-t border-black pt-4">
          <h1 className="text-2xl mb-6 font-[500]">Your Event Ticket Will Show Here</h1>
          <div className="flex flex-col gap-6">
            {result && result.map((item, idx) => {
              return (
                <div key={idx} className="flex flex-col desc-content bg-sky-400/10 border border-lightBlue px-10 pt-4 gap-4 rounded-xl relative">
                  <div className="w-[40px] h-[40px] rounded-full bg-white absolute -right-5 bottom-9 border-l border-lightBlue"></div>
                  <div className="w-[40px] h-[40px] rounded-full bg-white absolute -left-5 bottom-9 border-r border-lightBlue"></div>
                  <span className="font-semibold text-xl">{item.category}</span>
                  <span dangerouslySetInnerHTML={{ __html: item.description }} />
                  <div className="py-4 border-t border-black border-dashed flex items-center justify-between">
                    <span className="font-semibold">{formatPrice(item.price)}</span>
                    <div className="flex items-center gap-4">
                      <button><FaPencilAlt className="text-lightBlue" /></button>
                      <button><FaTrash className="text-red-500" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 border-t border-black pt-4">
          <LinkCheck result={result || []} />
        </div>
      </div>
    </main>
  );
}
