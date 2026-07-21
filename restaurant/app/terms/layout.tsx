import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Restroo",
  description: "Read Restroo's terms of service for dining and ordering food.",
  openGraph: {
    title: "Terms of Service | Restroo",
    description: "Rules and terms governing the use of the Restroo platform.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
