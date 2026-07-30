"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat, ArrowUp, Store } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

  return (
    <footer className="bg-white border-t border-gray-200/80 text-gray-900 pt-14 pb-8 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-md shadow-primary/20">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Restroo<span className="text-primary">.</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
              The digital directory and table QR ordering platform for registered partner restaurants.
            </p>
          </div>

          {/* Real Clickable Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Direct Links */}
            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-3.5">Navigation</h4>
              <ul className="space-y-2.5 text-gray-600 font-medium">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/restaurants" className="hover:text-primary transition-colors">All Restaurants</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Outlet Partner Link */}
            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-3.5">For Restaurant Outlets</h4>
              <ul className="space-y-2.5 text-gray-600 font-medium">
                <li>
                  <a
                    href={clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-bold"
                  >
                    <Store size={13} />
                    Partner Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-3.5">Legal</h4>
              <ul className="space-y-2.5 text-gray-600 font-medium">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Restroo Platform. All rights reserved.</p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-full"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
