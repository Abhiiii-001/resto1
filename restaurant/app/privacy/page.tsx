"use client";
import React from "react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50/70 via-white to-background border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-extrabold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} /> Privacy First Platform
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Last updated: July 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-soft space-y-8 text-gray-800">
          
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Our Commitment to Zero Tracking</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Restroo is designed to operate with minimal data collection. We do not require account creation, social logins, or personal identification to browse menus or place orders at participating restaurants.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Process</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mb-3">
              When placing an order, we only process the minimum information necessary to fulfill your order to your table or pickup counter:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600 font-medium">
              <li>Order items and customization variant options</li>
              <li>Table number or optional guest name for kitchen identification</li>
              <li>Anonymized order session tokens</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Data Sharing</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Your order details are shared strictly with the restaurant kitchen staff responsible for preparing your meal. We never sell or share user data with third-party advertisers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Contact Us</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              For any questions regarding privacy, please reach out at <span className="font-bold text-primary">privacy@restroo.com</span>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
