// pages/index.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  QrCodeIcon, 
  BellElectric,
  DollarSign,
  Clipboard
} from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <QrCodeIcon className="h-12 w-12 text-orange-600 dark:text-teal-400" />,
      title: 'QR Code Menus',
      description: 'Customers easily scan and view your menu'
    },
    {
      icon: <BellElectric className="h-12 w-12 text-orange-600 dark:text-teal-400" />,
      title: 'Order Notifications',
      description: 'Real-time updates for smooth operations'
    },
    {
      icon: <DollarSign className="h-12 w-12 text-orange-600 dark:text-teal-400" />,
      title: 'Affordable',
      description: 'Budget-friendly solution for small outlets'
    },
    {
      icon: <Clipboard className="h-12 w-12 text-orange-600 dark:text-teal-400" />,
      title: 'Easy Management',
      description: 'Simple menu and order tracking'
    }
  ];

  const howItWorksSteps = [
    'Sign Up',
    'Upload Your Menu',
    'Share QR Code',
    'Manage Orders'
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center"
      >
        <motion.div variants={itemVariants} className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600 dark:text-teal-400">
            Host Your Menu Online in Minutes
          </h1>
          <p className="text-xl mb-6">
            Affordable, easy-to-use platform for small food outlets to manage menus and orders
          </p>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 dark:bg-teal-500 text-white px-6 py-3 rounded-lg"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-600 dark:border-teal-500 text-orange-600 dark:text-teal-500 px-6 py-3 rounded-lg"
            >
              Log In
            </motion.button>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="md:w-1/2 mt-8 md:mt-0">
          <img 
            src="/api/placeholder/500/400" 
            alt="Menu QR Code" 
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600 dark:text-teal-400">
            Features for Your Food Outlet
          </h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center shadow-md"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600 dark:text-teal-400">
          How It Works
        </h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="flex justify-between items-center"
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600 dark:text-teal-400">
                  {index + 1}
                </span>
              </div>
              <p className="font-semibold">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 dark:bg-teal-900 py-16 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-teal-400">
            Join Hundreds of Food Outlets Today
          </h2>
          <Link 
            href="/signup"
            className="bg-orange-600 dark:bg-teal-500 text-white px-8 py-4 rounded-lg text-xl inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;