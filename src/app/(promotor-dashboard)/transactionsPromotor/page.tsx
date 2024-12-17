"use client";


import PromotorSidebar from "@/components/ui/prosidebar";
import React, { useState, useEffect } from "react";

interface Transaction {
  id: number;
  event: string;
  priceToPay: string;
  originalAmount: string;
  redeemedPoints: number;
  voucher: string;
  paymentStatus: string;
  date: string;
  paymentProof: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    event: "ONE OK ROCK Live in Concert 2024",
    priceToPay: "Rp 290.000,00",
    originalAmount: "Rp 300.000,00",
    redeemedPoints: 10000,
    voucher: "No voucher provided",
    paymentStatus: "Paid",
    date: "2024-05-21",
    paymentProof: "Show",
  },
];

const PromotorTransaction: React.FC = () => {
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.event.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <PromotorSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen text-black overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Transactions</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Event..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white shadow-md rounded-lg table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left w-1/5">Event</th>
                <th className="p-3 text-left w-1/5">Price To Pay</th>
                <th className="p-3 text-left w-1/5">Original Amount</th>
                <th className="p-3 text-left w-1/5">Redeemed Points</th>
                <th className="p-3 text-left w-1/5">Voucher</th>
                <th className="p-3 text-left w-1/5">Payment Status</th>
                <th className="p-3 text-left w-1/5">Date</th>
                <th className="p-3 text-left w-1/5">Payment Proof</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3">{transaction.event}</td>
                    <td className="p-3">{transaction.priceToPay}</td>
                    <td className="p-3">{transaction.originalAmount}</td>
                    <td className="p-3">
                      <span className="inline-block bg-gray-800 text-white text-sm px-2 py-1 rounded-full">
                        {transaction.redeemedPoints.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3">{transaction.voucher}</td>
                    <td className="p-3">
                      {transaction.paymentStatus === "Paid" ? (
                        <span className="inline-block bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-block bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="p-3">{transaction.date}</td>
                    <td className="p-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
                        {transaction.paymentProof}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-4 text-gray-500 font-medium"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromotorTransaction;
