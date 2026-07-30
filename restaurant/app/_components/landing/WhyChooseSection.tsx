"use client";
import React from 'react';
import { motion } from 'motion/react';
import { UserMinus, Zap, Sparkles, QrCode, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    title: 'Zero Account Friction',
    description: 'No passwords or registrations. Jump straight to the menu and order.',
    icon: <UserMinus className="text-primary" size={24} />,
  },
  {
    title: 'Lightning Performance',
    description: 'Minimal load times, optimized image assets, and instant cart updates.',
    icon: <Zap className="text-primary" size={24} />,
  },
  {
    title: 'Modern UI & Motion',
    description: 'Seamless smooth animations designed for touchscreens and desktop.',
    icon: <Sparkles className="text-primary" size={24} />,
  },
  {
    title: 'QR Code Native',
    description: 'Works out-of-the-box with table QR codes across any device browser.',
    icon: <QrCode className="text-primary" size={24} />,
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-24 bg-gray-50/50 font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-4">
              <ShieldCheck size={14} />
              Built For Speed
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Why Diners Choose <span className="text-primary">Restroo</span>
            </h2>

            <p className="text-base text-gray-600 font-medium leading-relaxed mb-8">
              We eliminated non-essential steps from traditional dining so you can focus entirely on enjoying your food.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-soft"
            >
              <p className="italic text-gray-800 font-semibold text-sm leading-relaxed">
                &quot;No app download, no login, just scan and eat. It really is that simple.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 text-primary font-bold text-xs rounded-full flex items-center justify-center">
                  AC
                </div>
                <div>
                  <p className="font-bold text-xs text-gray-900">Alex Chen</p>
                  <p className="text-[11px] text-gray-500 font-medium">Verified Diner</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-md transition-all"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
