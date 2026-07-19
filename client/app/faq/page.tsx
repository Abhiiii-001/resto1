import React from 'react';
import Footer from '../_component/Footer';

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">Everything you need to know about Restro.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">How do I generate QR codes for my tables?</h3>
              <p className="text-muted-foreground">Once you register your restaurant and add tables in the dashboard, the system automatically generates unique, printable QR codes for each table. Simply download and place them on your tables.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">Can I update my menu in real-time?</h3>
              <p className="text-muted-foreground">Yes! Any changes you make to your menu via the dashboard—including price updates, out-of-stock toggles, or new items—are instantly reflected when customers scan the QR code.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">How do I receive orders?</h3>
              <p className="text-muted-foreground">Orders appear instantly on your live dashboard. You will hear an audio notification (if enabled) and see the order details, table number, and any special instructions from the customer.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">Is there a limit to how many items I can add?</h3>
              <p className="text-muted-foreground">No, there is no limit on the number of categories, products, or variants you can add to your digital menu.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
