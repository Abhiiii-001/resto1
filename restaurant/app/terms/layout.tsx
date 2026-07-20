import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Restro",
  description: "Read Restro's terms of service for dining and ordering food.",
  openGraph: {
    title: "Terms of Service | Restro",
    description: "Rules and terms governing the use of the Restro platform.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
