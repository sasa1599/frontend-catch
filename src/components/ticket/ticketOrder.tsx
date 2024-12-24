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

  const handleAddTicket = () => {
    setOrder(order + 1);
    const ticketCartId = ticketCart?.findIndex(
      (item) => item.ticket.id == ticket.id
    );
    console.log(ticketCartId);
    if (ticketCartId! > -1 && ticketCart) {
      const newTicketCart = [...ticketCart];
      newTicketCart[ticketCartId!].quantity = order + 1;
      console.log(newTicketCart);

      setTicketCart(newTicketCart);
    } else {
      if (ticketCart?.length! > 0) {
        setTicketCart([...ticketCart!, { ticket, quantity: 1 }]);
      } else {
        setTicketCart([{ ticket, quantity: 1 }]);
      }
    }
  };

  const handleDecreaseTicket = () => {
    setOrder(order - 1);
    const ticketCartId = ticketCart?.findIndex(
      (item) => item.ticket.id == ticket.id
    );
    console.log(ticketCart);

    if (ticketCartId! > -1 && ticketCart) {
      const newTicketCart = [...ticketCart];
      newTicketCart[ticketCartId!].quantity = order - 1;
      setTicketCart(newTicketCart);
    }
    if (order === 1 && ticketCart && ticketCartId! > -1) {
      const newTicketCart = [...ticketCart];
      newTicketCart.splice(ticketCartId as number, 1);
      setTicketCart(newTicketCart);
    }
  };

  return (
    <div className="flex flex-col pt-4 gap-0 bg-gray-950 w-full">
      {/* <div className="w-[40px] h-[40px] rounded-full bg-black absolute -right-5 bottom-9 border-l border-lightBlue"></div>
      <div className="w-[40px] h-[40px] rounded-full black absolute -left-5 bottom-9 border-r border-lightBlue"></div> */}
      <p className="font-semibold text-xl">{ticket.category}</p>
      {/* <p dangerouslySetInnerHTML={{ __html: ticket.description }}></p> */}

      {/* Click to Order Ticket */}
      <div className="py-4 border-t border-black flex items-center justify-between">
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
            className="w-[25px] h-[25px] rounded-full font-semibold border-2 border-lightBlue flex items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <span>available seats: {ticket.seats} left</span>
    </div>
  );
}

