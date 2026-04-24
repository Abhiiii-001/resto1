'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChefHat, 
  QrCode, 
  LayoutDashboard, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  UtensilsCrossed, 
  Star,
  Quote,
  Plus,
  Minus,
  HelpCircle,
  Clock,
  Users,
  Timer,
  ShoppingBag,
  UserCheck,
  Building
} from 'lucide-react';
import Footer from './_component/Footer';
import { Button } from './_component/ui/Button';

import statsData from '@/data/stats.json';
import landingData from '@/data/landing.json';

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

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="p-8 rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
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

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Timer className="w-4 h-4" />
              <span>Zero Wait Time for Customers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
              Smart Ordering for Your <span className="text-primary">Cafe & Outlet</span>.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              {landingData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 text-lg font-bold group bg-primary hover:bg-primary/90">
                  Start for Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold">
                See How It Works
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Join <span className="font-bold text-foreground">{statsData.usersJoined}</span> small outlets growing with us</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image 
                src="/assets/hero.png" 
                alt="Restro Dashboard" 
                width={1200} 
                height={800}
                className="w-full h-auto"
              />
            </div>
            {/* Floating UI Element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Frictionless Order</p>
                <p className="font-bold">No Login Required</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <section className="py-12 border-y border-border bg-gray-50/50">
    <div className="container mx-auto px-6">
      <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Trusted by local favorites</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <h2 className="text-2xl font-bold">THE LOCAL CAFE</h2>
        <h2 className="text-2xl font-bold">CHAI POINT</h2>
        <h2 className="text-2xl font-bold">BURGER JOINT</h2>
        <h2 className="text-2xl font-bold">STREET BITES</h2>
        <h2 className="text-2xl font-bold">DESSERT BAR</h2>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section id="features" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <SectionTitle 
        title="Built for Speed, Made for Small Business" 
        subtitle="Don't let queues slow you down. Give your customers the digital experience they deserve."
      />
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={UserCheck} 
          title="No Login, No Friction" 
          description="Customers just scan and order. No annoying signup forms or app downloads to slow them down."
        />
        <FeatureCard 
          icon={ShoppingBag} 
          title="Beat the Queue" 
          description="Reduce counter pressure. Customers can order from their table or while waiting in line."
        />
        <FeatureCard 
          icon={LayoutDashboard} 
          title="Simple Owner Control" 
          description="Track every order, update your menu instantly, and see your sales from any device."
        />
      </div>
    </div>
  </section>
);

const FeatureDeepDive = () => (
  <section className="py-24 space-y-32">
    {/* Feature 1 */}
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
            <Image src="/assets/menu.png" alt="Digital Menu" width={800} height={600} className="w-full h-auto" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
            <QrCode className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6">QR Menus That Just Work</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Generate QR codes for every table. Your customers get a beautiful, mobile-optimized menu instantly. They can add to cart and place orders in seconds.
          </p>
          <ul className="space-y-4">
            {['Zero signup ordering', 'Instant menu updates', 'Mobile-first experience', 'Multi-item cart management'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Manage Orders with Ease</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your own digital command center. See new orders as they come in, manage status, and track your daily earnings without any complex hardware.
          </p>
          <ul className="space-y-4">
            {['Real-time order alerts', 'Daily sales tracking', 'Staff-friendly interface', 'Simple menu management'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
            <Image src="/assets/order.png" alt="Order Management" width={800} height={600} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-gray-50/50">
    <div className="container mx-auto px-6">
      <SectionTitle 
        title="Simple, Transparent Pricing" 
        subtitle="We're currently in early access. Get started for free today!"
      />
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Basic */}
        <div className="p-8 rounded-2xl border border-border bg-white flex flex-col">
          <h3 className="text-xl font-bold mb-2">Starter</h3>
          <p className="text-muted-foreground mb-6 text-sm">Perfect for small outlets</p>
          <div className="mb-8">
            <span className="text-4xl font-bold">Free</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            {['QR Menu', 'No-Login Ordering', 'Up to 50 items', 'Daily Sales Report'].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full" asChild><Link href="/signup">Get Started</Link></Button>
        </div>

        {/* Pro */}
        <div className="p-8 rounded-2xl border-2 border-primary bg-white shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-primary/10 rotate-45 translate-x-12 -translate-y-12 w-32 h-32" />
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="text-muted-foreground mb-6 text-sm">Coming Soon</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-muted-foreground">--</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold text-primary uppercase tracking-widest text-xs">Launching Soon</p>
            <p className="text-xs text-muted-foreground mt-2">Advanced analytics, priority support, and multi-staff access.</p>
          </div>
        </div>

        {/* Enterprise */}
        <div className="p-8 rounded-2xl border border-border bg-white flex flex-col">
          <h3 className="text-xl font-bold mb-2">Chains</h3>
          <p className="text-muted-foreground mb-6 text-sm">Coming Soon</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-muted-foreground">--</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-gray-400" />
            </div>
            <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Under Development</p>
            <p className="text-xs text-muted-foreground mt-2">Centralized management for multiple locations and franchises.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <SectionTitle title="Trusted by Local Entrepreneurs" />
      <div className="grid md:grid-cols-3 gap-8">
        {landingData.testimonials.map((t, i) => (
          <div key={i} className="p-8 rounded-2xl border border-border bg-gray-50/50 relative">
            <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-primary text-primary" />)}
            </div>
            <p className="text-lg mb-8 italic text-foreground/80">"{t.content}"</p>
            <div className="flex items-center gap-4">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border border-border" />
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-3xl">
      <div className="flex items-center justify-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold">Common Questions</h2>
      </div>
      <div className="mt-12 space-y-2">
        {landingData.faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="bg-primary rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Empower your small outlet today.</h2>
          <p className="text-xl text-white/80 mb-12">
            Join hundreds of cafes and snack bars that are modernizing their service. Get started for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-12 text-lg font-bold bg-white text-primary hover:bg-white/90">
                Start for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white text-white hover:bg-white/10">
                Ask a Question
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-white/60 text-sm">No credit card required. Setup in 5 minutes.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <FeatureDeepDive />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
