import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Pizza', icon: '🍕', color: 'bg-rYellow', textColor: 'text-gray-900' },
  { name: 'Burgers', icon: '🍔', color: 'bg-rRed', textColor: 'text-white' },
  { name: 'Drinks', icon: '🥤', color: 'bg-rGreen', textColor: 'text-white' },
  { name: 'Desserts', icon: '🍰', color: 'bg-gray-900', textColor: 'text-white' },
];

export default function SmartDiscoverySection() {
  const router = useRouter();

  return (
    <section className="py-32 bg-rGray border-b-4 border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tighter text-center"
          >
            Find What You <br/>
            <span className="inline-block bg-rRed text-white px-4 py-2 rotate-[-2deg] border-4 border-gray-900 shadow-[4px_4px_0px_#111] mt-2">Crave.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => router.push('/restaurants')}
              className={`${category.color} p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111] cursor-pointer flex flex-col items-center justify-center group relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent bg-[length:15px_15px]"></div>
              
              <span className="text-7xl mb-4 transform transition-transform group-hover:scale-125 duration-500 relative z-10 drop-shadow-md">
                {category.icon}
              </span>
              <h3 className={`text-2xl font-black ${category.textColor} uppercase tracking-tight relative z-10`}>
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
