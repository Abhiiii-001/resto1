import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Restro",
  description: "Read Restro's privacy policy. We prioritize your privacy with zero unnecessary data collection.",
  openGraph: {
    title: "Privacy Policy | Restro",
    description: "Your privacy is paramount. Simple, transparent privacy practices.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
