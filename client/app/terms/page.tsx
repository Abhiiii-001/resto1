import React from 'react';
import Footer from '../_component/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-border shadow-sm space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Restroo ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by these terms, please do not use this
              Service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              2. Description of Service
            </h2>
            <p>
              Restroo provides a digital QR-based menu and ordering platform for
              restaurants, cafes, and food outlets. The service includes table
              management, menu digitization, and live order tracking.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              3. User Conduct
            </h2>
            <p>
              You agree to use the Service only for lawful purposes and in a way
              that does not infringe the rights of, restrict or inhibit anyone
              else's use and enjoyment of the Service. Prohibited behavior
              includes harassing or causing distress or inconvenience to any
              other user.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              4. Account Responsibilities
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your computer.
              You agree to accept responsibility for all activities that occur
              under your account or password.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              5. Modifications to Service
            </h2>
            <p>
              Restroo reserves the right at any time to modify or discontinue,
              temporarily or permanently, the Service (or any part thereof) with
              or without notice.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
