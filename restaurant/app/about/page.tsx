"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Zap, Users, ShieldCheck, QrCode } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: <Zap className="text-rYellow" size={28} />,
    title: "Speed First",
    description:
      "We built Restro for the impatient foodie. From browsing to ordering in under 30 seconds.",
    bg: "bg-yellow-50",
  },
  {
    icon: <ShieldCheck className="text-rGreen" size={28} />,
    title: "Privacy by Default",
    description:
      "No accounts, no tracking, no fuss. Just tap, order, and enjoy your meal.",
    bg: "bg-green-50",
  },
  {
    icon: <QrCode className="text-rRed" size={28} />,
    title: "QR-Native",
    description:
      "Scan a QR at your table and you're in — no app download required. Ever.",
    bg: "bg-red-50",
  },
  {
    icon: <Users className="text-blue-500" size={28} />,
    title: "Built for Everyone",
    description:
      "Whether you're a solo diner or a big group, Restro makes ordering seamless for all.",
    bg: "bg-blue-50",
  },
];

const team = [
  { name: "Abhishek Kumar", role: "Founder & Developer", initials: "AK" },
  { name: "Team Restro", role: "Design & Engineering", initials: "TR" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-rGray pt-24 pb-32 px-4 text-center overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-rYellow rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-rRed rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
          >
            <span className="text-sm font-medium text-gray-700">About Restro</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6"
          >
            We&apos;re rethinking <br />
            <span className="text-rRed">how you order food.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Restro is a modern, zero-friction food ordering platform built for
            the next generation of diners — no logins, no downloads, just great
            food delivered fast.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              Our Mission
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              We believe ordering food at a restaurant should be the easiest
              thing in the world. Not a chore. Not a queue. Just a seamless
              digital experience that puts you in control.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              Restro connects restaurants and their customers through a fast,
              intuitive ordering platform — accessible to anyone with a
              smartphone and a hunger to eat.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-rGray rounded-3xl p-10 text-center"
          >
            <p className="text-7xl font-black text-rRed mb-4">0</p>
            <p className="text-xl font-bold text-gray-900 mb-2">Barriers to ordering</p>
            <p className="text-gray-500 font-medium">
              No signup. No app. No friction. Just food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-rGray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 font-medium">
              The principles that guide everything we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${v.bg} p-8 rounded-3xl border border-transparent hover:border-gray-200 transition-all shadow-sm`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            The People Behind Restro
          </h2>
          <p className="text-gray-600 font-medium mb-16">
            A small, passionate team obsessed with solving dining friction.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-3xl bg-gray-900 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-rRed text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-black mb-6">Ready to try it?</h2>
          <p className="text-red-100 font-medium mb-10 text-lg">
            Find a restaurant near you and experience the easiest way to order food.
          </p>
          <Link
            href="/restaurants"
            className="inline-block bg-white text-rRed font-bold text-lg px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Explore Restaurants →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
