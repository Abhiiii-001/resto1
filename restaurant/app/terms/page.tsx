"use client";
import React from "react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50/70 via-white to-background border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
            <FileText size={14} /> Platform Rules
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
            Terms of Service
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
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              By accessing Restroo or scanning a table QR code to place an order, you agree to comply with these Terms of Service and all applicable local regulations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Order Fulfillment</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Restroo provides the digital interface connecting you directly with food outlets. Orders are transmitted immediately to the chosen restaurant kitchen. Fulfillment times and item availability are managed directly by the food provider.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Acceptable Use</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Users agree not to submit fraudulent orders or disrupt platform services. Restroo reserves the right to block fraudulent requests.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Support Contact</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              For inquiries regarding terms or service support, contact <span className="font-bold text-primary">support@restroo.com</span>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
