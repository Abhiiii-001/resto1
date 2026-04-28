import React from 'react';
import { motion } from 'motion/react';

const categories = [
  { name: 'Pizza', icon: '🍕', color: 'bg-orange-50' },
  { name: 'Burgers', icon: '🍔', color: 'bg-red-50' },
  { name: 'Drinks', icon: '🥤', color: 'bg-blue-50' },
  { name: 'Desserts', icon: '🍰', color: 'bg-pink-50' },
];

export default function SmartDiscoverySection() {
  return (
    <section className="py-24 bg-rGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 mb-4"
          >
            Find What You Crave
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Explore our most popular categories and discover new favorites.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${category.color} p-8 rounded-3xl border border-gray-100 shadow-sm cursor-pointer transition-shadow hover:shadow-xl flex flex-col items-center justify-center group`}
            >
              <span className="text-6xl mb-4 transform transition-transform group-hover:scale-125 duration-300">
                {category.icon}
              </span>
              <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
