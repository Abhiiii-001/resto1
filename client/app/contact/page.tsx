'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Plus,
  Minus,
} from 'lucide-react';
import contactData from '@/data/contact.json';
import Image from 'next/image';
import Footer from '../_component/Footer';
import { Button } from '../_component/ui/button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

// --- Components ---

const SectionTitle = ({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) => (
  <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-border py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 hover:text-primary transition-colors"
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="py-4 text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

// --- Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden bg-white">
    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            <span>Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            We're here to <span className="text-primary">help</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const ContactInfo = () => {
  const info = [
    { icon: MapPin, title: 'Visit Us', desc: contactData.address },
    { icon: Phone, title: 'Call Us', desc: `${contactData.phone} (${contactData.hours})` },
    { icon: Mail, title: 'Email Us', desc: contactData.email },
    { icon: Clock, title: 'Working Hours', desc: '24/7 Monitoring, Support: 9am-8pm IST' },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Message sent! We'll be in touch soon.");
      reset();
    }, 1500);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50/50 p-8 md:p-12 rounded-[2rem] border border-border"
          >
            <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Full Name</label>
                  <input 
                    {...register('name', { required: true })}
                    className="w-full h-12 px-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Email Address</label>
                  <input 
                    {...register('email', { required: true })}
                    className="w-full h-12 px-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Inquiry Type</label>
                <select 
                  {...register('type', { required: true })}
                  className="w-full h-12 px-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                >
                  <option value="partnership">Restaurant Partnership</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Pricing & Plans</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Message</label>
                <textarea 
                  {...register('message', { required: true })}
                  rows={5}
                  className="w-full p-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your cafe or food outlet..."
                />
              </div>

              <Button size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                {isLoading ? 'Sending...' : 'Send Message'}
                {!isLoading && <Send className="ml-2 w-5 h-5" />}
              </Button>
            </form>
          </motion.div>

          {/* Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-border">
              <Image 
                src="/assets/contact.png" 
                alt="Customer Support" 
                width={800} 
                height={600} 
                className="w-full h-auto"
              />
            </div>
            <div className="p-8 rounded-[2rem] bg-primary text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-2xl font-bold mb-4">Immediate Assistance?</h3>
              <p className="text-white/80 mb-6">
                Need help setting up your QR codes? Our team can guide you through the process in under 10 minutes.
              </p>
              {/* <Button className="bg-white text-primary hover:bg-white/90 font-bold">
                View Setup Guide
              </Button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => (
  <section className="py-24 bg-gray-50/50">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionTitle title="Common Questions" subtitle="Quick answers for local outlet owners." />
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-border shadow-sm">
        <FAQItem 
          question="Is it really zero-friction for customers?" 
          answer="Yes. We've removed every barrier. Customers scan the QR, see your menu, and order. No app download, no account creation, and no login required." 
        />
        <FAQItem 
          question="How do I get my QR codes?" 
          answer="Our dashboard generates unique, high-quality QR codes for your outlet instantly. You can download and print them on anything from stickers to table mats." 
        />
        <FAQItem 
          question="Can I manage it from my phone?" 
          answer="Absolutely. The owner dashboard is fully responsive. You can track orders and update your menu while on the move." 
        />
        <FAQItem 
          question="What happens if an item is out of stock?" 
          answer="You can mark any item as 'Sold Out' with a single tap. It will be removed from your digital menu immediately, preventing disappointed customers." 
        />
        <FAQItem 
          question="Are paid plans coming?" 
          answer="Yes! While our core features will always have a free tier for small outlets, we are developing Pro features like advanced analytics and staff accounts." 
        />
      </div>
    </div>
  </section>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ContactInfo />
      <ContactFormSection />
      <FAQ />
      <Footer />
    </div>
  );
}
