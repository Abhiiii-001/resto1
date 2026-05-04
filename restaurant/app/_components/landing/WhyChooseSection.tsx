import React from 'react';
import { motion } from 'motion/react';
import { UserMinus, Zap, Sparkles, QrCode } from 'lucide-react';

const reasons = [
  {
    title: 'No Login Required',
    description: 'We respect your privacy. No tedious forms or logins to get your food.',
    icon: <UserMinus className="text-purple-500" size={24} />,
    color: 'bg-purple-50',
  },
  {
    title: 'Fast Ordering',
    description: 'Our streamlined UI means you can order in seconds, not minutes.',
    icon: <Zap className="text-rYellow" size={24} />,
    color: 'bg-yellow-50',
  },
  {
    title: 'Clean UI',
    description: 'A modern, intuitive experience that feels like a native app.',
    icon: <Sparkles className="text-blue-500" size={24} />,
    color: 'bg-blue-50',
  },
  {
    title: 'Instant QR Access',
    description: 'Just scan and order. No app download or installation needed.',
    icon: <QrCode className="text-rGreen" size={24} />,
    color: 'bg-green-50',
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
            >
              The Modern Way to <br/>
              <span className="text-rRed">Experience Dining.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 mb-8 max-w-lg font-medium"
            >
              Restro was built for the next generation of food lovers. We removed the friction so you can focus on what matters: the meal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-rGray rounded-3xl border border-gray-100"
            >
              <p className="italic text-gray-800 font-semibold text-lg">
                &quot;No app download, no login, just scan and eat. It really is that simple.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">Alex Chen</p>
                  <p className="text-xs text-gray-500 font-medium">Digital Nomad</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${reason.color} p-8 rounded-3xl border border-transparent hover:border-gray-200 transition-all shadow-sm`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
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
