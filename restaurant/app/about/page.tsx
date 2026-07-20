"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Zap, Users, ShieldCheck, QrCode, ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: <Zap className="text-gray-900" size={32} />,
    title: "Speed First",
    description:
      "We built Restro for the impatient foodie. From browsing to ordering in under 30 seconds.",
    color: "bg-rYellow",
  },
  {
    icon: <ShieldCheck className="text-white" size={32} />,
    title: "Privacy by Default",
    description:
      "No accounts, no tracking, no fuss. Just tap, order, and enjoy your meal.",
    color: "bg-rGreen",
    textColor: "text-white"
  },
  {
    icon: <QrCode className="text-white" size={32} />,
    title: "QR-Native",
    description:
      "Scan a QR at your table and you're in — no app download required. Ever.",
    color: "bg-rRed",
    textColor: "text-white"
  },
  {
    icon: <Users className="text-white" size={32} />,
    title: "Built for Everyone",
    description:
      "Whether you're a solo diner or a big group, Restro makes ordering seamless for all.",
    color: "bg-gray-900",
    textColor: "text-white"
  },
];

const team = [
  { name: "Abhishek Kumar", role: "Founder & Developer", initials: "AK" },
  { name: "Team Restro", role: "Design & Engineering", initials: "TR" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-rGray font-sans selection:bg-gray-900 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-rYellow pt-36 pb-24 px-4 text-center overflow-hidden relative border-b-4 border-gray-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-gray-900 shadow-[4px_4px_0px_#111] mb-8"
          >
            <span className="text-sm font-black text-gray-900 uppercase tracking-wider">About Restro</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9] mb-8"
          >
            Rethinking <br />
            <span className="bg-rRed text-white px-4 py-1 inline-block rotate-[-2deg] border-4 border-gray-900 shadow-[6px_6px_0px_#111] mt-2">
              Food Ordering.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-900 font-bold max-w-2xl mx-auto leading-relaxed"
          >
            Restro is a zero-friction food ordering platform built for
            the next generation of diners — no logins, no app downloads, just instant food.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 px-4 bg-white border-b-4 border-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
              Our Mission
            </h2>
            <p className="text-gray-900 font-bold text-lg leading-relaxed mb-6">
              We believe ordering food at a restaurant should be the easiest
              thing in the world. Not a chore. Not a queue. Just a seamless
              digital experience that puts you in control.
            </p>
            <p className="text-gray-700 font-bold leading-relaxed text-lg">
              Restro connects restaurants and customers through a fast,
              intuitive ordering platform — accessible to anyone with a
              smartphone and a craving.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-rRed text-white rounded-[2rem] p-12 text-center border-4 border-gray-900 shadow-[10px_10px_0px_#111]"
          >
            <p className="text-9xl font-black text-rYellow leading-none mb-2">0</p>
            <p className="text-3xl font-black uppercase tracking-tight mb-2">Barriers to Ordering</p>
            <p className="text-white font-bold text-lg">
              No signup. No app. No friction. Just food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-4 bg-rGray border-b-4 border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              What We Stand For
            </h2>
            <p className="text-xl font-bold text-gray-700 uppercase tracking-wider">
              The principles that guide everything we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${v.color} p-8 rounded-[2rem] border-4 border-gray-900 shadow-[6px_6px_0px_#111] transition-all`}
              >
                <div className="w-16 h-16 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#111]">
                  {v.icon}
                </div>
                <h3 className={`text-3xl font-black ${v.textColor || 'text-gray-900'} mb-3 uppercase tracking-tight`}>
                  {v.title}
                </h3>
                <p className={`${v.textColor ? 'text-gray-200' : 'text-gray-900'} font-bold text-lg leading-relaxed`}>
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-4 bg-white border-b-4 border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            The People Behind Restro
          </h2>
          <p className="text-xl text-gray-700 font-bold uppercase tracking-wider mb-16">
            A passionate team obsessed with removing dining friction.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-24 h-24 rounded-3xl bg-gray-900 border-4 border-gray-900 flex items-center justify-center text-rYellow text-3xl font-black shadow-[6px_6px_0px_#C8161D] group-hover:rotate-6 transition-transform">
                  {member.initials}
                </div>
                <div>
                  <p className="font-black text-2xl uppercase tracking-tight text-gray-900">{member.name}</p>
                  <p className="text-sm font-bold uppercase tracking-wider text-rRed">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 bg-rRed text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Ready to Experience It?</h2>
          <p className="text-white font-bold mb-10 text-xl max-w-xl mx-auto">
            Find a restaurant near you and experience the easiest way to order food.
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-3 bg-gray-900 text-rYellow font-black text-xl uppercase tracking-wider px-10 py-5 rounded-full border-4 border-gray-900 shadow-[6px_6px_0px_#FFF] hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
          >
            Explore Restaurants <ArrowRight size={24} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
