'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from './_component/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Icon */}
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </motion.div>

          <h1 className="text-8xl md:text-9xl font-black text-primary mb-4 opacity-20 select-none">404</h1>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Table Not Found.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
            It seems like the page you are looking for has been taken off the menu. Don't worry, our kitchen is still open!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 min-w-[200px]">
                <Home className="mr-2 w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg font-bold min-w-[200px]"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Support Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4 font-semibold uppercase tracking-widest">
            Need Help?
          </p>
          <div className="flex justify-center gap-8">
            <Link href="/contact" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Contact Support
            </Link>
            <Link href="/about" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Our Story
            </Link>
            <Link href="/signup" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <Search className="w-12 h-12 text-primary/20" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
      >
        <UtensilsCrossed className="w-16 h-16 text-primary/20" />
      </motion.div>
    </div>
  );
}
