import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Restroo - Get in Touch",
  description: "Have questions or feedback? Contact the Restroo team for support, partnerships, or inquiries.",
  openGraph: {
    title: "Contact Restroo | We're Here to Help",
    description: "Get in touch with the Restroo team.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
