'use client';

import { motion } from 'framer-motion';
import { Target, Award, Heart, Zap, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '../_component/Footer';

export default function AboutPage() {
  const team = [
    {
      name: 'Arjun Sharma',
      role: 'CEO & Founder',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Former tech lead at Zomato, passionate about revolutionizing food delivery for students.',
    },
    {
      name: 'Priya Patel',
      role: 'CTO',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Full-stack developer with 8+ years experience in building scalable food-tech platforms.',
    },
    {
      name: 'Rahul Kumar',
      role: 'Head of Operations',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Operations expert who ensures lightning-fast delivery and seamless user experience.',
    },
    {
      name: 'Sneha Gupta',
      role: 'Head of Marketing',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Marketing strategist focused on connecting with Gen-Z and building community-driven growth.',
    },
  ];

  const values = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Speed & Efficiency',
      description:
        "We believe your time is precious. That's why we focus on lightning-fast delivery and seamless ordering experience.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Student-First Approach',
      description:
        'Built by students, for students. We understand your needs, budget, and lifestyle better than anyone.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Community Building',
      description:
        "More than just food delivery - we're building a community of food lovers who share, discover, and enjoy together.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Quality Assurance',
      description:
        'Every restaurant partner is carefully vetted. Every order is tracked. Every bite should be perfect.',
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Founded',
      description: 'Started with a simple idea in a college dorm room',
    },
    {
      year: '2022',
      title: 'First 100 Orders',
      description: 'Delivered our first 100 orders to fellow students',
    },
    {
      year: '2023',
      title: 'QR Menu Launch',
      description: 'Introduced revolutionary QR menu scanning feature',
    },
    {
      year: '2023',
      title: '10K Users',
      description: 'Reached 10,000 active users across 5 cities',
    },
    {
      year: '2024',
      title: '50K+ Users',
      description: 'Now serving 50,000+ happy customers daily',
    },
    {
      year: '2024',
      title: '500+ Restaurants',
      description: 'Partnered with 500+ restaurants and food outlets',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 pt-16">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg md:p-12">
              <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
                About Our Platform
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
                We're revolutionizing food delivery with a focus on speed,
                convenience, and student-friendly features. Born from the
                frustration of slow food delivery and complicated ordering
                processes.
              </p>
              <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Restaurant Partners
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    1M+
                  </div>
                  <div className="text-sm text-gray-600">Orders Delivered</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                To make food ordering as simple as scanning a QR code. We're
                eliminating the friction between craving and satisfaction,
                especially for students and young professionals who value speed,
                convenience, and affordability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                To become the go-to food platform for every student and young
                professional in India. We envision a world where great food is
                just a scan away, and every meal brings people together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From dorm room idea to nationwide platform
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-gray-800">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate people behind your favorite food app
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <img
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                />
                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-blue-600">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                Join Our Food Revolution
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                Whether you're a student, restaurant owner, or food lover -
                there's a place for you in our community.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition-colors duration-300 hover:bg-blue-700"
                >
                  Start Ordering
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border-2 border-blue-600 px-8 py-3 font-medium text-blue-600 transition-colors duration-300 hover:bg-blue-50"
                >
                  Partner With Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
