'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Users,
  Building,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '../_component/Footer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Contact form submission:', data);
      toast.success("Message sent successfully! We'll get back to you soon.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Visit Us',
      details: ['123 Food Street, Tech Park', 'Bangalore, Karnataka 560001'],
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109'],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email Us',
      details: ['hello@foodapp.com', 'support@foodapp.com'],
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Working Hours',
      details: [
        'Mon - Fri: 9:00 AM - 8:00 PM',
        'Sat - Sun: 10:00 AM - 6:00 PM',
      ],
    },
  ];

  const supportTypes = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'General Inquiry',
      description:
        'Questions about our services, features, or how to get started',
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Customer Support',
      description: 'Need help with your order, account, or technical issues',
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Restaurant Partnership',
      description:
        'Interested in partnering with us or listing your restaurant',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Careers',
      description:
        "Want to join our team? We're always looking for talented people",
    },
  ];

  const faqs = [
    {
      question: 'How fast is your delivery?',
      answer:
        'We deliver most orders within 30 minutes. Delivery time may vary based on location and restaurant preparation time.',
    },
    {
      question: 'Is there a minimum order amount?',
      answer:
        'Minimum order amount varies by restaurant, typically ranging from ₹99 to ₹199. This is clearly displayed on each restaurant page.',
    },
    {
      question: 'How does the QR menu feature work?',
      answer:
        "Simply scan the QR code at any partner restaurant using your phone camera. You'll be directed to their digital menu where you can place orders directly.",
    },
    {
      question: 'Can I track my order?',
      answer:
        "Yes! You can track your order in real-time through our app or website. You'll receive updates at every step of the process.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.',
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
                Get In Touch
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
                Have questions, feedback, or want to partner with us? We'd love
                to hear from you! Our team is here to help 24/7.
              </p>
              <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    {'< 2hrs'}
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="p-4">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    5-Star
                  </div>
                  <div className="text-sm text-gray-600">Service Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  {info.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="mb-1 text-sm text-gray-600">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              How Can We Help?
            </h2>
            <p className="text-lg text-gray-600">
              Choose the type of support you need
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supportTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cursor-pointer rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  {type.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {type.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-8 shadow-lg md:p-12"
            >
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as
                  possible. We typically respond within 2-4 hours during
                  business hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        errors.name
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      type="email"
                      id="email"
                      className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        errors.email
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      {...register('type', {
                        required: 'Please select an inquiry type',
                      })}
                      id="type"
                      className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        errors.type
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">
                        Restaurant Partnership
                      </option>
                      <option value="careers">Careers</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <input
                    {...register('subject', {
                      required: 'Subject is required',
                    })}
                    type="text"
                    id="subject"
                    className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                      errors.subject
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                    placeholder="Enter subject"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                    })}
                    id="message"
                    rows={6}
                    className={`w-full resize-none rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                      errors.message
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 font-medium text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <p className="leading-relaxed text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
              <p className="mb-4 text-lg text-gray-600">
                Still have questions?
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition-colors duration-300 hover:bg-blue-700"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
