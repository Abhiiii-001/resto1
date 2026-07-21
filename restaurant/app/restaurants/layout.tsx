import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Restaurants | Restroo",
  description: "Browse top local restaurants and order food instantly with zero friction or downloads.",
  openGraph: {
    title: "Explore Local Restaurants | Restroo",
    description: "Browse top local restaurants and order food instantly.",
  },
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
