"use client";
import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Utensils } from 'lucide-react';

const categories = [
  { name: 'Pizza & Italian', icon: '🍕', color: 'from-amber-500/10 to-orange-500/10 border-orange-200' },
  { name: 'Gourmet Burgers', icon: '🍔', color: 'from-red-500/10 to-pink-500/10 border-red-200' },
  { name: 'Refreshing Drinks', icon: '🥤', color: 'from-blue-500/10 to-cyan-500/10 border-blue-200' },
  { name: 'Decadent Desserts', icon: '🍰', color: 'from-purple-500/10 to-indigo-500/10 border-purple-200' },
];

export default function SmartDiscoverySection() {
  const router = useRouter();

  return (
    <section className="py-24 bg-gray-50/50 font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
            <Utensils size={14} />
            Instant Discovery
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Explore By Craving
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Jump straight into the categories you love most from top local spots.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => router.push('/restaurants')}
              className={`bg-gradient-to-br ${category.color} p-8 rounded-3xl border shadow-soft hover:shadow-soft-md cursor-pointer flex flex-col items-center justify-center text-center group transition-all`}
            >
              <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <h3 className="text-base font-bold text-gray-900">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
