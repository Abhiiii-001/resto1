"use client";
import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, Zap, Layers } from 'lucide-react';

const steps = [
  {
    title: '1. Browse & Scan',
    description: 'Find a nearby restaurant or scan the QR code placed at your dining table.',
    icon: <Search className="text-primary" size={24} />,
  },
  {
    title: '2. Select & Customize',
    description: 'Explore variants, adjust portions, and customize your orders seamlessly.',
    icon: <QrCode className="text-primary" size={24} />,
  },
  {
    title: '3. Instant Kitchen Dispatch',
    description: 'Order confirmed straight to the kitchen display. Track status live in real-time.',
    icon: <Zap className="text-primary" size={24} />,
  },
];

export default function HowItWorksSection() {
  const router = useRouter();

  return (
    <section id="how-it-works" className="py-24 bg-white font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
            <Layers size={14} />
            3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            How Restroo Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Designed to save time for hungry diners and busy restaurant teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => router.push('/restaurants')}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-primary group-hover:underline">
                Explore restaurants →
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
