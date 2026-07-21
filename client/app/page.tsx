'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  QrCode,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Star,
  Quote,
  Plus,
  Minus,
  HelpCircle,
  Clock,
  Timer,
  ShoppingBag,
  UserCheck,
  Building,
  Shield,
  Crown,
  Zap,
  Loader2,
} from 'lucide-react';
import Footer from './_component/Footer';
import { Button } from './_component/ui/button';

import statsData from '@/data/stats.json';
import landingData from '@/data/landing.json';
import DemoModal from './_component/DemoModal';
import { useGetPlansQuery } from '@/redux/api/subscription';
import { useAppSelector } from '@/redux/redux';

// --- Components ---

const SectionTitle = ({
  title,
  subtitle,
  center = true,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) => (
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

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
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

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
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

const Hero = ({ onOpenDemo }: { onOpenDemo: () => void }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <section className="relative pt-16 pb-20 overflow-hidden bg-white">
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
              Smart Ordering for Your{' '}
              <span className="text-primary">Cafe & Outlet</span>.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              {landingData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg font-bold group bg-primary hover:bg-primary/90"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg font-bold group bg-primary hover:bg-primary/90"
                  >
                    Start for Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg font-bold"
                  onClick={onOpenDemo}
                >
                  See a Demo
                </Button>
              )}
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="user"
                    />
                  </div>
                ))}
              </div>
              <p>
                Join{' '}
                <span className="font-bold text-foreground">
                  {statsData.usersJoined}
                </span>{' '}
                small outlets growing with us
              </p>
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
                alt="Restroo Dashboard"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
            {/* Floating UI Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Frictionless Order
                </p>
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
      <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
        Trusted by local favorites
      </p>
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
            <Image
              src="/assets/menu.png"
              alt="Digital Menu"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
            <QrCode className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6">QR Menus That Just Work</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Generate QR codes for every table. Your customers get a beautiful,
            mobile-optimized menu instantly. They can add to cart and place
            orders in seconds.
          </p>
          <ul className="space-y-4">
            {[
              'Zero signup ordering',
              'Instant menu updates',
              'Mobile-first experience',
              'Multi-item cart management',
            ].map((item) => (
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
            Your own digital command center. See new orders as they come in,
            manage status, and track your daily earnings without any complex
            hardware.
          </p>
          <ul className="space-y-4">
            {[
              'Real-time order alerts',
              'Daily sales tracking',
              'Staff-friendly interface',
              'Simple menu management',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
            <Image
              src="/assets/order.png"
              alt="Order Management"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = () => {
  const {
    data: plansData,
    isLoading: isLoadingPlans,
    isError,
  } = useGetPlansQuery({});
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoadingPlans) {
    return (
      <section
        id="pricing"
        className="py-24 bg-gray-50/50 flex flex-col items-center justify-center"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground mt-2 font-medium">
          Loading pricing options...
        </p>
      </section>
    );
  }

  const plans = plansData?.plans || [];

  // Hide completely if no plans are available
  if (isError || plans.length === 0) {
    return null;
  }

  return (
    <section id="pricing" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Simple, Transparent Pricing"
          subtitle="Empower your outlet with robust operational controls."
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan: any) => {
            const isPro = plan.type === 2;
            const isPremium = plan.type === 3;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col relative ${
                  isPro
                    ? 'border-2 border-primary shadow-lg shadow-primary/5'
                    : 'border-border shadow-sm'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="mb-6 flex justify-between items-start">
                  <div
                    className={`p-3 rounded-2xl ${
                      plan.type === 1
                        ? 'bg-blue-50 text-blue-600'
                        : plan.type === 2
                          ? 'bg-primary/10 text-primary'
                          : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {plan.type === 1 && <Zap className="w-8 h-8" />}
                    {plan.type === 2 && <Shield className="w-8 h-8" />}
                    {plan.type === 3 && <Crown className="w-8 h-8" />}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  {plan.type === 1
                    ? 'Perfect for trying out our features'
                    : plan.type === 2
                      ? 'Ideal for growing restaurants'
                      : 'Unleash the full power of your business'}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-foreground">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground font-medium text-sm">
                      / month
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features?.map((feat: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground/80 font-medium text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}

                  {/* Dynamic Capacity Indicators */}
                  <li className="flex items-start gap-3 text-slate-500 text-xs mt-4 pt-4 border-t border-slate-100">
                    <span>
                      Products:{' '}
                      {plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-500 text-xs">
                    <span>
                      Staff:{' '}
                      {plan.maxEmployees === -1
                        ? 'Unlimited'
                        : `${plan.maxEmployees} users`}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-500 text-xs">
                    <span>
                      Tables/QRs:{' '}
                      {plan.maxQRCodes === -1
                        ? 'Unlimited'
                        : `${plan.maxQRCodes} tables`}
                    </span>
                  </li>
                </ul>

                {/* Action button */}
                {isAuthenticated ? (
                  <Button className="w-full mt-auto" asChild>
                    <Link href="/dashboard/subscription">
                      {plan.price === 0 ? 'Activate Plan' : 'Upgrade Plan'}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full mt-auto bg-foreground text-background hover:bg-foreground/90"
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <SectionTitle title="Trusted by Local Entrepreneurs" />
      <div className="grid md:grid-cols-3 gap-8">
        {landingData.testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border border-border bg-gray-50/50 relative"
          >
            <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg mb-8 italic text-foreground/80">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full border border-border"
              />
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
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Empower your small outlet today.
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Join hundreds of cafes and snack bars that are modernizing their
            service. Get started for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-16 px-12 text-lg font-bold bg-white text-primary hover:bg-white/90"
              >
                Start for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 text-lg font-bold border-white text-white hover:bg-white/10"
              >
                Ask a Question
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-white/60 text-sm">
            No credit card required. Setup in 5 minutes.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// --- Main Page ---

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />
      <TrustBar />
      <ProblemSolution />
      <FeatureDeepDive />
      <PricingSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />

      {/* Interactive role-based demo selection modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
