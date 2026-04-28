import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Browse or Scan',
    description: 'Find a restaurant you love or scan the QR code at your table to start.',
    icon: <Search className="text-rRed" size={32} />,
  },
  {
    title: 'Choose Your Food',
    description: 'Explore the digital menu and customize your order exactly how you want.',
    icon: <QrCode className="text-rYellow" size={32} />,
  },
  {
    title: 'Place Order Instantly',
    description: 'Confirm your order and it goes straight to the kitchen. No more waiting!',
    icon: <CheckCircle className="text-rGreen" size={32} />,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 mb-4"
          >
            How it Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Getting your food is faster and easier than ever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white border-4 border-rGray rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {step.icon}
              </div>
              <div className="relative">
                <span className="absolute -top-12 -left-4 text-8xl font-black text-gray-50 opacity-10 pointer-events-none">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
