"use client";
import React, { useState } from "react";
import { useGetAllRestaurantIdQuery } from "@/redux/api/restaurant";
import { AnimatePresence } from "motion/react";
import { Restaurant } from "@/types";

// Components
import Navbar from "./_components/landing/Navbar";
import HeroSection from "./_components/landing/HeroSection";
import TopRestaurantsSection from "./_components/landing/TopRestaurantsSection";
import SmartDiscoverySection from "./_components/landing/SmartDiscoverySection";
import HowItWorksSection from "./_components/landing/HowItWorksSection";
import WhyChooseSection from "./_components/landing/WhyChooseSection";
import OrderExperienceSection from "./_components/landing/OrderExperienceSection";
import PartnerSection from "./_components/landing/PartnerSection";
import Footer from "./_components/landing/Footer";
import RestaurantModal from "./_components/RestaurantModal";

export default function Home() {
  const { data, isLoading } = useGetAllRestaurantIdQuery();
  const restaurants = data?.restaurant || [];
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rRed/10 selection:text-rRed">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <TopRestaurantsSection 
          restaurants={restaurants} 
          isLoading={isLoading} 
          setSelectedRestaurant={setSelectedRestaurant} 
        />
        
        <SmartDiscoverySection />
        
        <HowItWorksSection />
        
        <WhyChooseSection />
        
        <OrderExperienceSection />

        <PartnerSection />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedRestaurant && (
          <RestaurantModal 
            restaurant={selectedRestaurant} 
            onClose={() => setSelectedRestaurant(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
