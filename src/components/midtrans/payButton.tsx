// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { CONFIG } from "@/config/config";
// import { useRouter } from 'next/navigation';

// interface TicketCart {
//   quantity: number;
//   ticket: {
//     id: number;
//     price: number;
//     seats: number;
//   };
// }

// interface PayButtonProps {
//   token: () => Promise<string | undefined>;
//   ticketCart: TicketCart[];
//   priceToPay: number;
//   originalAmount: number;
// }

// export default function PayButton({ token, ticketCart, priceToPay, originalAmount }: PayButtonProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
//   const router = useRouter();

//   const handleClick = async () => {
//     try {
//       // Fetch the token
//       const generatedToken = await token();
//       if (!generatedToken) {
//         console.error("Token is missing!");
//         return;
//       }

//       // Make the payment request to the backend
//       const response = await axios.post(CONFIG.API_URL + "/order-payment", {
//         payment_type: "bank_transfer",
//         bank: selectedPayment || "bca",
//         total_price: originalAmount, // Original amount before any discounts
//         final_price: priceToPay,    // Final price to pay after discounts
//         ticketCart: ticketCart,
//         token: generatedToken, // Pass token if needed
//       });

//       // Check if response contains redirect_url
//       if (response.data?.redirect_url) {
//         window.location.href = response.data.redirect_url;
//       } else {
//         // If no redirect URL, go to order status page
//         router.push(`/order/${response.data.order_id}`);
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       // Handle error (show error message to user)
//     }
//   };

//   const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedPayment(event.target.value);
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <button
//         type="button"
//         onClick={openModal}
//         className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
//       >
//         Pay
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-lg font-semibold">Payment Method</h2>
//             <div className="mt-4">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   id="bca"
//                   name="bank"
//                   value="bca"
//                   className="w-4 h-4"
//                   onChange={handlePaymentChange}
//                 />
//                 <label htmlFor="bca" className="text-sm flex items-center">
//                   <Image
//                     src="/logo-BCA.png"
//                     alt="BCA Logo"
//                     width={20}
//                     height={20}
//                     className="mr-2"
//                   />
//                   Bank Transfer - BCA
//                 </label>
//               </div>
//               <div className="flex items-center space-x-2 mt-2">
//                 <input
//                   type="radio"
//                   id="mandiri"
//                   name="bank"
//                   value="mandiri"
//                   className="w-4 h-4"
//                   onChange={handlePaymentChange}
//                 />
//                 <label htmlFor="mandiri" className="text-sm flex items-center">
//                   <Image
//                     src="/logo-mandiri.png"
//                     alt="MANDIRI Logo"
//                     width={20}
//                     height={20}
//                     className="mr-2"
//                   />
//                   Bank Transfer - Mandiri
//                 </label>
//               </div>
//             </div>
//             <div className="mt-4">
//               <div className="text-sm text-gray-600">
//                 <p>Original Amount: Rp {originalAmount.toLocaleString('id-ID')}</p>
//                 <p className="font-semibold">
//                   Final Price: Rp {priceToPay.toLocaleString('id-ID')}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={closeModal}
//                 className="text-gray-600 hover:text-gray-800 text-sm px-3 py-1"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleClick}
//                 disabled={!selectedPayment}
//                 className={`${
//                   selectedPayment
//                     ? 'bg-blue-500 hover:bg-blue-600'
//                     : 'bg-gray-300 cursor-not-allowed'
//                 } text-white text-sm px-3 py-1 rounded-md`}
//               >
//                 Pay Now!
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

// import { getToken } from "@/libs/action";
import { getSnapToken } from "@/libs/order";
import { IOrder } from "@/types/order";

export default function PayButton({ order }: { order: IOrder }) {
  // const token = async () => {
  //   if (token) {
  //     console.log("token", token);
  //     return token;
  //   } else {
  //     console.error("Failed to retrieve Snap Token");
  //   }
  // };
  
  const handleClick = async () => {
    // const snapToken = await token();
    const snapToken = await getSnapToken(order.id, order.total_price);
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
