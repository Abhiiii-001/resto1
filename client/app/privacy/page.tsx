import React from 'react';
import Footer from '../_component/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, update your profile, use the interactive features of our services, or communicate with us. The types of information we may collect include your name, email address, postal address, password, phone number, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Use of Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, such as to administer your account, process your transactions, and send you related information, including confirmations and receipts.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@restro.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
