import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Restroo - Next-Gen Dining Experience",
  description: "Learn how Restroo is rethinking food ordering with zero friction, no logins, and instant QR ordering for modern diners.",
  openGraph: {
    title: "About Restroo | Zero-Friction Dining",
    description: "Built for the next generation of food lovers. Skip the wait and order instantly.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
