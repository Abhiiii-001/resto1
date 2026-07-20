"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-rGray font-sans selection:bg-gray-900 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-rRed text-white pt-36 pb-24 px-4 text-center overflow-hidden border-b-4 border-gray-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-gray-900 border-2 border-gray-900 shadow-[4px_4px_0px_#111] mb-8 font-black uppercase text-sm"
          >
            Contact Restro
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6"
          >
            Say Hello. <br />
            <span className="bg-rYellow text-gray-900 px-4 py-1 inline-block rotate-[2deg] border-4 border-gray-900 shadow-[6px_6px_0px_#111] mt-2">
              We Don&apos;t Bite.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold max-w-xl mx-auto text-red-100"
          >
            Have feedback, a partnership idea, or need help? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-rYellow p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111]">
              <div className="w-14 h-14 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#111]">
                <Mail className="text-gray-900" size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-1">Email Us</h3>
              <p className="font-bold text-gray-800">support@restro.com</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111]">
              <div className="w-14 h-14 bg-rRed border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#111]">
                <Phone className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-1">Call Us</h3>
              <p className="font-bold text-gray-800">+1 (555) 000-RESTRO</p>
            </div>

            <div className="bg-rGreen text-white p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111]">
              <div className="w-14 h-14 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#111]">
                <MapPin className="text-gray-900" size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-1">HQ Location</h3>
              <p className="font-bold text-gray-100">123 Gourmet St, Foodie City, FC 90210</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7">
            <div className="bg-white p-10 rounded-[2.5rem] border-4 border-gray-900 shadow-[10px_10px_0px_#111]">
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-8">Send a Message</h2>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-rGreen text-white p-8 rounded-[2rem] border-4 border-gray-900 text-center"
                >
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-rYellow" />
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Message Sent!</h3>
                  <p className="font-bold text-lg">Thanks for reaching out. We&apos;ll get back to you fast.</p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                    className="mt-6 px-6 py-3 bg-white text-gray-900 font-black uppercase rounded-full border-2 border-gray-900 shadow-[3px_3px_0px_#111] hover:bg-rYellow transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider text-gray-900 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 border-4 border-gray-900 rounded-2xl bg-rGray font-bold focus:outline-none focus:bg-white transition-colors shadow-[4px_4px_0px_#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider text-gray-900 mb-2">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 border-4 border-gray-900 rounded-2xl bg-rGray font-bold focus:outline-none focus:bg-white transition-colors shadow-[4px_4px_0px_#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider text-gray-900 mb-2">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 border-4 border-gray-900 rounded-2xl bg-rGray font-bold focus:outline-none focus:bg-white transition-colors shadow-[4px_4px_0px_#111]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 text-rYellow font-black text-xl uppercase tracking-wider py-5 rounded-2xl border-4 border-gray-900 shadow-[6px_6px_0px_#C8161D] hover:bg-rRed hover:text-white transition-all transform hover:scale-[1.01]"
                  >
                    Submit Message <Send size={22} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
