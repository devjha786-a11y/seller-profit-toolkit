"use client";

import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");

  const productPrice = Number(price) || 0;
  const shippingPrice = Number(shipping) || 0;

  const totalSale = productPrice + shippingPrice;

  const transactionFee = totalSale * 0.065; // Etsy 6.5%
  const processingFee = totalSale * 0.03 + 0.25; // Approx US fee
  const totalFees = transactionFee + processingFee;
  const netRevenue = totalSale - totalFees;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-2">
          Etsy Fee Calculator
        </h1>

        <p className="text-gray-600 mb-8">
          Calculate Etsy fees instantly.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Product Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Shipping Charged ($)
            </label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="10"
            />
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Transaction Fee</span>
            <span>${transactionFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Processing Fee</span>
            <span>${processingFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Fees</span>
            <span>${totalFees.toFixed(2)}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-xl font-bold">
            <span>Net Revenue</span>
            <span>${netRevenue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}