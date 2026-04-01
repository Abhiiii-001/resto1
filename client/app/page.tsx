'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './dashboard/_component/button';
import {
  ChefHat,
  QrCode,
  DollarSign,
  ShoppingBag,
  Clock,
  Users2,
  Star,
  ArrowRight,
  Bell,
  Settings,
  LineChart,
  Menu,
  UserPlus,
  Upload,
  Share2,
  ClipboardList,
  Utensils,
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import Navbar from './_component/Nav';
import Footer from './_component/Footer';

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Café Owner',
      content:
        'FoodFlow has transformed how we manage our café. The efficiency gains are remarkable!',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Restaurant Manager',
      content:
        "The best investment we've made for our restaurant. Customer wait times have reduced significantly.",
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Food Truck Owner',
      content:
        'Perfect for small businesses like mine. Easy to use and great customer support.',
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <section className="overflow-hidden pb-20 pt-32">
        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="mx-auto max-w-3xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent"
              >
                Revolutionize Your Food Business Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 text-xl text-muted-foreground"
              >
                Streamline operations, boost efficiency, and delight customers
                with our comprehensive management system.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center gap-4"
              >
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-4xl font-bold"
          >
            Features that empower your business
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: QrCode,
                title: 'QR Code Menus',
                description:
                  'Let customers scan and order directly from their phones',
              },
              {
                icon: Bell,
                title: 'Order Notifications',
                description:
                  'Real-time updates when orders are placed and ready',
              },
              {
                icon: DollarSign,
                title: 'Affordable Pricing',
                description: 'Perfect for small outlets, no website needed',
              },
              {
                icon: Menu,
                title: 'Easy Management',
                description: 'Update your menu items in seconds',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-primary/10 bg-card p-6 shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-20" ref={targetRef}>
        <div className="container mx-auto px-6">
          <motion.div style={{ opacity, scale }} className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">Powerful Dashboard</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Get a complete overview of your business with our intuitive
              dashboard
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-xl border bg-card p-6 shadow-2xl">
              <div className="mb-8 grid grid-cols-4 gap-6">
                <div className="rounded-lg bg-primary/10 p-4">
                  <LineChart className="mb-2 h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Sales</h4>
                  <p className="text-2xl font-bold">$12,426</p>
                </div>
                <div className="rounded-lg bg-green-500/10 p-4">
                  <ShoppingBag className="mb-2 h-6 w-6 text-green-500" />
                  <h4 className="font-semibold">Orders</h4>
                  <p className="text-2xl font-bold">284</p>
                </div>
                <div className="rounded-lg bg-orange-500/10 p-4">
                  <Users2 className="mb-2 h-6 w-6 text-orange-500" />
                  <h4 className="font-semibold">Customers</h4>
                  <p className="text-2xl font-bold">1,420</p>
                </div>
                <div className="rounded-lg bg-purple-500/10 p-4">
                  <Bell className="mb-2 h-6 w-6 text-purple-500" />
                  <h4 className="font-semibold">Notifications</h4>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 rounded-lg border bg-card p-4">
                  <h4 className="mb-4 font-semibold">Sales Overview</h4>
                  <div className="h-64 rounded-lg bg-primary/5"></div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="mb-4 font-semibold">Recent Orders</h4>
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded bg-secondary/50 p-2"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded bg-primary/10" />
                            <div>Order #{1234 + i}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            2m ago
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="mb-4 font-semibold">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Menu className="mr-1 h-4 w-4" /> Menu
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-1 h-4 w-4" /> Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold"
          >
            How It Works
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: UserPlus,
                title: 'Sign Up',
                description: 'Create your account in minutes',
              },
              {
                icon: Upload,
                title: 'Upload Menu',
                description: 'Add your dishes and prices',
              },
              {
                icon: Share2,
                title: 'Share QR Code',
                description: 'Place QR codes on tables',
              },
              {
                icon: ClipboardList,
                title: 'Manage Orders',
                description: 'Handle orders efficiently',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 3 && (
                  <div className="absolute left-full top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-primary/20 to-transparent lg:block" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-4xl font-bold"
          >
            What our customers say
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-lg bg-card p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2 variants={fadeIn} className="mb-12 text-3xl font-bold">
              Why Choose Us
            </motion.h2>
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {[
                {
                  icon: ChefHat,
                  title: 'Built for Restaurants',
                  description:
                    'Designed specifically for food service operations',
                },
                {
                  icon: DollarSign,
                  title: 'Cost-Effective',
                  description:
                    'Affordable solution for businesses of all sizes',
                },
                {
                  icon: Utensils,
                  title: 'Easy to Use',
                  description: 'Simple to set up and manage daily',
                },
                {
                  icon: Bell,
                  title: '24/7 Support',
                  description: 'Always here when you need assistance',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-start space-x-4 rounded-xl border border-primary/10 bg-card p-6 text-left"
                >
                  <div className="rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-6 text-3xl font-bold">
              Join Hundreds of Food Outlets Today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Start your digital transformation journey with MenuMaster
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary px-8 hover:bg-primary/90">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
