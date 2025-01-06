import { useContext, useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { TicketContext, TicketContextValue } from "./showTicket";
import { ITicket } from "@/types/allInterface";
import { Minus, Plus } from "lucide-react";

export default function TicketOrder({ ticket }: { ticket: ITicket }) {
  const [order, setOrder] = useState<number>(0);
  const context = useContext<TicketContextValue | null>(TicketContext);

  if (!context) {
    throw new Error("There is no context");
  }

  const { ticketCart, setTicketCart } = context;

  const MAX_TICKETS = 5;

  const handleAddTicket = () => {
    if (ticket.seats === 0) {
      alert("This ticket is sold out.");
      return;
    }

    if (order < MAX_TICKETS && order < ticket.seats) {
      const newOrder = order + 1;
      setOrder(newOrder);

      const ticketCartId = ticketCart?.findIndex(
        (item) => item.ticket.id === ticket.id
      );

      if (ticketCartId !== undefined && ticketCartId > -1 && ticketCart) {
        const newTicketCart = [...ticketCart];
        newTicketCart[ticketCartId].quantity = newOrder;
        setTicketCart(newTicketCart);
      } else {
        setTicketCart([
          ...(ticketCart || []),
          { ticket, quantity: newOrder },
        ]);
      }
    } else if (order >= ticket.seats) {
      alert("Not enough seats available.");
    } else {
      alert("You can only buy up to 5 tickets.");
    }
  };

  const handleDecreaseTicket = () => {
    if (order > 0) {
      const newOrder = order - 1;
      setOrder(newOrder);

      const ticketCartId = ticketCart?.findIndex(
        (item) => item.ticket.id === ticket.id
      );

      if (ticketCartId !== undefined && ticketCartId > -1 && ticketCart) {
        const newTicketCart = [...ticketCart];
        if (newOrder === 0) {
          newTicketCart.splice(ticketCartId, 1);
        } else {
          newTicketCart[ticketCartId].quantity = newOrder;
        }
        setTicketCart(newTicketCart);
      }
    }
  };

  return (
    <div className="flex flex-col bg-black w-full">
      <p className="font-semibold text-xl pt-4">{ticket.category}</p>

      {/* Click to Order Ticket */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-yellow-400">
          {formatPrice(ticket.price)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecreaseTicket}
            disabled={order === 0}
            className={`disabled:cursor-pointer w-[25px] h-[25px] rounded-full font-semibold border-2 border-lightBlue flex items-center justify-center`}
          >
            <Minus className="h-4 w-4" />
          </button>
          <div>{order}</div>
          <button
            onClick={handleAddTicket}
            disabled={
              order >= MAX_TICKETS ||
              order >= ticket.seats ||
              ticket.seats === 0
            }
            className={`w-[25px] h-[25px] rounded-full font-semibold border-2 border-lightBlue flex items-center justify-center ${
              ticket.seats === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Available seats */}
      <span className="text-xs">
        {ticket.seats === 0 ? (
          <span className="text-red-500">No available seats</span>
        ) : (
          `Available seats: ${ticket.seats} left`
        )}
      </span>
    </div>
  );
}
