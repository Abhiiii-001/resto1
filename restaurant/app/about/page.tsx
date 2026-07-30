"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Zap, Users, ShieldCheck, QrCode, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: <Zap className="text-primary" size={24} />,
    title: "Speed First",
    description: "From browsing to ordering in under 30 seconds with instant table dispatch.",
  },
  {
    icon: <ShieldCheck className="text-success" size={24} />,
    title: "Privacy by Default",
    description: "No mandatory accounts or trackings. Just tap, order, and enjoy your meal.",
  },
  {
    icon: <QrCode className="text-blue-500" size={24} />,
    title: "QR-Native",
    description: "Scan a QR code at your dining table and browse digital menus instantly.",
  },
  {
    icon: <Users className="text-purple-500" size={24} />,
    title: "Built for Everyone",
    description: "Designed for solo diners, groups, and restaurant teams alike.",
  },
];

const team = [
  { name: "Abhishek Kumar", role: "Founder & Lead Engineer", initials: "AK" },
  { name: "Team Restroo", role: "Design & Product Engineering", initials: "TR" },
];

export default function About() {
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
            <Heart size={14} />
            About Restroo Direct
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
          >
            Rethinking Digital Dining <br />
            <span className="text-primary">Without Friction.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Restroo is an instant, zero-friction dining platform designed for modern foodies and restaurant outlets — no app downloads, no account passwords, just food.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Our Mission
            </h2>
            <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed mb-4">
              We believe ordering food at a restaurant should be fast, seamless, and pleasant. Not a queue, not a wait, and not a tedious signup form.
            </p>
            <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed">
              Restroo connects diners and restaurant outlets through an intuitive web app accessible on any smartphone browser instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-3xl p-10 text-center shadow-lg shadow-primary/20"
          >
            <p className="text-7xl font-extrabold mb-1">0</p>
            <p className="text-xl font-bold uppercase tracking-wider mb-2">Friction Points</p>
            <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
              No account creation. No app installation. Just scan & enjoy your meal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
              What Guides Us
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Core principles embedded in every product decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          The Team Behind Restroo
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-12">
          Engineers and designers building next-generation culinary software.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-primary/20">
                {member.initials}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{member.name}</p>
                <p className="text-xs text-primary font-semibold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Ready to Order?</h2>
          <p className="text-xs sm:text-sm text-gray-300 font-medium mb-8">
            Explore participating outlets near you and start ordering in seconds.
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg shadow-primary/30 transition-all"
          >
            Explore Outlets <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
