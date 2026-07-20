"use client";
import React from "react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-rGray font-sans selection:bg-gray-900 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-900 text-white pt-36 pb-20 px-4 text-center overflow-hidden border-b-4 border-gray-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rYellow text-gray-900 border-2 border-gray-900 shadow-[4px_4px_0px_#111] mb-8 font-black uppercase text-sm">
            <FileText size={18} /> Terms & Rules
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-4 text-rYellow">
            Terms of Service
          </h1>

          <p className="text-xl font-bold max-w-xl mx-auto text-gray-300 uppercase tracking-wider">
            Last updated: July 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border-4 border-gray-900 shadow-[10px_10px_0px_#111] space-y-10 text-gray-900">
          
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">1. Acceptance of Terms</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              By accessing Restro or scanning a table QR code to place an order, you agree to comply with these Terms of Service and all applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">2. Order Fulfillment</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              Restro provides the digital platform connecting you with food service providers. Orders placed via Restro are transmitted directly to the chosen restaurant kitchen. Fulfillment time and item availability are managed directly by the restaurant.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">3. Acceptable Use</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              Users agree not to submit fraudulent orders, misuse QR codes, or disrupt the operation of the platform. Restro reserves the right to refuse service to fraudulent requests.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">4. Modifications</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              Restro reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-rRed">5. Support Contact</h2>
            <p className="font-bold text-lg leading-relaxed text-gray-800">
              For inquiries regarding these terms, please contact <span className="bg-rYellow px-2 border border-gray-900 font-black">support@restro.com</span>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
