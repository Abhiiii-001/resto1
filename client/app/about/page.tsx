'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Heart, Zap, Globe, Users, TrendingUp, CheckCircle2, ShoppingBag, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../_component/Footer';
import { Button } from '../_component/ui/button';
import statsData from '@/data/stats.json';
import aboutData from '@/data/about.json';

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
            <span>Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Empowering the <span className="text-primary">Local Cafe</span> Hero.
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Restro was built for the small business owner who wants to provide a 5-star digital experience without the enterprise complexity. We believe every local outlet deserves smart tools.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-border mt-12"
      >
        <Image 
          src="/assets/about.png" 
          alt="Restro Team" 
          width={1600} 
          height={900} 
          className="w-full h-auto object-cover max-h-[600px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-white">
            <div>
              <p className="text-4xl font-bold mb-1">{statsData.ordersDaily}</p>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Orders Daily</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">{statsData.localOutlets}</p>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Local Outlets</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">{statsData.customerLogins}</p>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Customer Logins</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">{statsData.reliability}</p>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Reliability</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-24 bg-gray-50/50">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutData.mission}
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutData.vision}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Values = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="The Values We Live By" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.values.map((v, i) => {
            const icons = [Zap, Heart, Smartphone, TrendingUp];
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Milestones = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <SectionTitle title="Our Journey So Far" />
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {aboutData.milestones.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-24 text-right pt-1">
                  <span className="text-2xl font-black text-primary">{m.year}</span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute top-3 -left-[41px] w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                  <div className="pl-8 pb-8 border-l border-border last:border-0">
                    <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="Meet the Visionaries" subtitle="A small, dedicated team building the future of local dining." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.team.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl border border-border bg-white text-center hover:shadow-xl transition-all"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center border-4 border-primary/5">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <p className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">{m.role}</p>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MissionVision />
      <Values />
      <Milestones />
      <Team />
      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to grow your small business?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              We're looking for more local cafes and outlets to join our mission of frictionless dining.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90">
                  Register Your Outlet
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white text-white hover:bg-white/10">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
