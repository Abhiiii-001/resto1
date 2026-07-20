import React from 'react';
import { motion } from 'motion/react';
import { UserMinus, Zap, Sparkles, QrCode } from 'lucide-react';

const reasons = [
  {
    title: 'No Login Needed',
    description: 'We respect your time and privacy. Zero tedious forms or accounts.',
    icon: <UserMinus className="text-gray-900" size={28} />,
    color: 'bg-rYellow',
  },
  {
    title: 'Instant Speed',
    description: 'Our ultra-streamlined UI lets you order in seconds flat.',
    icon: <Zap className="text-white" size={28} />,
    color: 'bg-rRed',
    textColor: 'text-white'
  },
  {
    title: 'Brutalist UI',
    description: 'A punchy, dynamic experience designed for 2026.',
    icon: <Sparkles className="text-white" size={28} />,
    color: 'bg-gray-900',
    textColor: 'text-white'
  },
  {
    title: 'Scan & Dine',
    description: 'Just scan the table QR. No app downloads required.',
    icon: <QrCode className="text-white" size={28} />,
    color: 'bg-rGreen',
    textColor: 'text-white'
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-32 bg-white border-b-4 border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none"
            >
              The Next-Gen <br/>
              <span className="text-rRed">Dining Way.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-800 font-bold mb-8 max-w-lg leading-relaxed"
            >
              Restro is built for speed. We removed every unnecessary click so you can order and eat without friction.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-rYellow rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_#111] relative"
            >
              <p className="italic text-gray-900 font-black text-xl">
                &quot;No app download, no login, just scan and eat. It really is that simple.&quot;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-900"></div>
                <div>
                  <p className="font-black text-base uppercase text-gray-900">Alex Chen</p>
                  <p className="text-xs text-gray-900 font-bold uppercase tracking-wider">Digital Nomad</p>
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
                whileHover={{ y: -6, rotate: index % 2 === 0 ? 1 : -1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${reason.color} p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111] transition-all`}
              >
                <div className="w-14 h-14 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#111]">
                  {reason.icon}
                </div>
                <h3 className={`text-2xl font-black ${reason.textColor || 'text-gray-900'} mb-3 uppercase tracking-tight`}>{reason.title}</h3>
                <p className={`${reason.textColor ? 'text-gray-200' : 'text-gray-800'} text-base font-bold leading-relaxed`}>
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
