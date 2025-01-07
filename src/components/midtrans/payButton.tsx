"use client";

// import { getToken } from "@/libs/action";
import { getSnapToken } from "@/libs/order";
import { IOrder } from "@/types/order";

export default function PayButton({ order }: { order: IOrder }) {

  const handleClick = async () => {
    const snapToken = await getSnapToken(order.id, order.total_price, order.final_price);
    if (snapToken) {
      window.snap.pay(snapToken);
    } else {
      console.error("Invalid Snap Token");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
    >
      Pay
    </button>
  );
}