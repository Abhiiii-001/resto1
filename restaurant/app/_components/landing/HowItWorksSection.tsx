import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, Zap } from 'lucide-react';

const steps = [
  {
    title: 'Browse',
    description: 'Find a spot you love or scan a QR code at your table.',
    icon: <Search className="text-gray-900" size={40} />,
    color: 'bg-rYellow'
  },
  {
    title: 'Customize',
    description: 'Explore the digital menu and craft your perfect meal.',
    icon: <QrCode className="text-gray-900" size={40} />,
    color: 'bg-white'
  },
  {
    title: 'Eat.',
    description: 'Order confirmed. Straight to the kitchen. Zero wait.',
    icon: <Zap className="text-white" size={40} />,
    color: 'bg-gray-900',
    textColor: 'text-white'
  },
];

export default function HowItWorksSection() {
  const router = useRouter();

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tighter"
          >
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-rRed to-rYellow drop-shadow-sm">Flows</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-gray-600 uppercase tracking-wider"
          >
            Getting your food is faster than ever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => router.push('/restaurants')}
              className={`relative flex flex-col p-8 ${step.color} border-4 border-gray-900 shadow-[8px_8px_0px_#111] rounded-[2rem] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111] transition-all transform md:${index === 1 ? 'translate-y-8' : (index === 2 ? 'translate-y-16' : '')}`}
            >
              <div className="absolute -top-10 -right-4 text-[150px] font-black text-gray-900 opacity-5 pointer-events-none leading-none select-none">
                {index + 1}
              </div>
              
              <div className={`w-20 h-20 ${step.textColor ? 'bg-rRed' : 'bg-white'} border-4 border-gray-900 rounded-2xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_#111] rotate-[-3deg]`}>
                {step.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className={`text-4xl font-black ${step.textColor || 'text-gray-900'} mb-4 uppercase tracking-tighter`}>{step.title}</h3>
                <p className={`text-lg font-bold ${step.textColor ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
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
