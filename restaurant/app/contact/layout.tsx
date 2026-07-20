import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Restro - Get in Touch",
  description: "Have questions or feedback? Contact the Restro team for support, partnerships, or inquiries.",
  openGraph: {
    title: "Contact Restro | We're Here to Help",
    description: "Get in touch with the Restro team.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
