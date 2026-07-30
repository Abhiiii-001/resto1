"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useSubmitContactMutation } from "@/redux/api/contact";
import { toast } from "react-toastify";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitContact] = useSubmitContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsLoading(true);
      try {
        const response = await submitContact({ ...formData, type: 'Restaurant Inquiry' }).unwrap();
        if (response.success) {
          toast.success("Message sent! We'll be in touch soon.");
          setSubmitted(true);
        } else {
          toast.error(response.message || "Failed to send message.");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "An error occurred. Please try again later.");
        console.error("Failed to send message", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50/70 via-white to-background border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-6"
          >
            <MessageSquare size={14} />
            Contact Restroo Direct
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4"
          >
            Get In Touch With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-medium max-w-xl mx-auto"
          >
            Have questions, restaurant onboarding requests, or feedback? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Mail size={22} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-xs font-semibold text-gray-600">support@restroo.in</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Phone size={22} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Call Support</h3>
              <p className="text-xs font-semibold text-gray-600">+91 7808968996</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-4">
                <MapPin size={22} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">HQ Address</h3>
              <p className="text-xs font-semibold text-gray-600">Satguru Enclave, Gurgaon, India</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 text-success p-8 rounded-3xl border border-green-200 text-center"
                >
                  <CheckCircle2 size={40} className="mx-auto mb-3 text-success" />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Message Sent Successfully!</h3>
                  <p className="text-xs font-medium text-gray-600 mb-6">Thank you for reaching out. Our team will respond shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                    className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs py-3.5 rounded-2xl shadow-md shadow-primary/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Submit Message"} {!isLoading && <Send size={15} />}
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
