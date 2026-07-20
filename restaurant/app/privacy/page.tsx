"use client";
import React from "react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-rGray font-sans selection:bg-gray-900 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-rGreen text-white pt-36 pb-20 px-4 text-center overflow-hidden border-b-4 border-gray-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-gray-900 border-2 border-gray-900 shadow-[4px_4px_0px_#111] mb-8 font-black uppercase text-sm">
            <ShieldCheck size={18} className="text-rGreen" /> Privacy First
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-4">
            Privacy Policy
          </h1>

          <p className="text-xl font-bold max-w-xl mx-auto text-green-100 uppercase tracking-wider">
            Last updated: July 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border-4 border-gray-900 shadow-[10px_10px_0px_#111] space-y-10 text-gray-900">
          
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">1. Our Commitment to Zero Tracking</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              Restro is designed to operate with minimal data collection. We do not require account creation, social logins, or personal identification to browse menus or place orders at participating restaurants.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">2. Information We Collect</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800 mb-4">
              When placing an order, we only process the minimum information necessary to fulfill your order to your table or pickup counter:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-bold text-gray-800 text-base">
              <li>Order items and customization preferences</li>
              <li>Table number or pickup identifier</li>
              <li>Anonymized session tokens to track order status</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">3. Data Sharing</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              Your order data is shared exclusively with the restaurant staff responsible for preparing and serving your food. We never sell, rent, or trade user data to third-party advertisers.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">4. Security</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              We enforce SSL/TLS encryption for all communications between your browser and our servers to ensure your order data remains secure.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">5. Contact</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              If you have questions about our privacy practices, please reach out to us at <span className="bg-rYellow px-2 border border-gray-900 font-black">privacy@restro.com</span>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
