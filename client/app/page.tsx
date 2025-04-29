"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "./dashboard/_component/button"
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
  Utensils
} from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import Navbar from "./_component/Navbar"


export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Café Owner",
      content: "FoodFlow has transformed how we manage our café. The efficiency gains are remarkable!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Restaurant Manager",
      content: "The best investment we've made for our restaurant. Customer wait times have reduced significantly.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Food Truck Owner",
      content: "Perfect for small businesses like mine. Easy to use and great customer support.",
      rating: 5
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

 
  return (
    <div className="min-h-screen bg-background relative">

           <div className="h-16 top-0 z-50 fixed w-screen">
              <Navbar />
            </div>
   
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Revolutionize Your Food Business Management
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8"
              >
                Streamline operations, boost efficiency, and delight customers with our comprehensive management system.
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
                <Button size="lg" variant="outline">Watch Demo</Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Features that empower your business
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: QrCode,
                title: "QR Code Menus",
                description: "Let customers scan and order directly from their phones"
              },
              {
                icon: Bell,
                title: "Order Notifications",
                description: "Real-time updates when orders are placed and ready"
              },
              {
                icon: DollarSign,
                title: "Affordable Pricing",
                description: "Perfect for small outlets, no website needed"
              },
              {
                icon: Menu,
                title: "Easy Management",
                description: "Update your menu items in seconds"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-6 rounded-xl shadow-lg border border-primary/10"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-20" ref={targetRef}>
        <div className="container mx-auto px-6">
          <motion.div 
            style={{ opacity, scale }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Powerful Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a complete overview of your business with our intuitive dashboard
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-card rounded-xl shadow-2xl p-6 border">
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <LineChart className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-semibold">Sales</h4>
                  <p className="text-2xl font-bold">$12,426</p>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-green-500 mb-2" />
                  <h4 className="font-semibold">Orders</h4>
                  <p className="text-2xl font-bold">284</p>
                </div>
                <div className="bg-orange-500/10 p-4 rounded-lg">
                  <Users2 className="h-6 w-6 text-orange-500 mb-2" />
                  <h4 className="font-semibold">Customers</h4>
                  <p className="text-2xl font-bold">1,420</p>
                </div>
                <div className="bg-purple-500/10 p-4 rounded-lg">
                  <Bell className="h-6 w-6 text-purple-500 mb-2" />
                  <h4 className="font-semibold">Notifications</h4>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-card rounded-lg border p-4">
                  <h4 className="font-semibold mb-4">Sales Overview</h4>
                  <div className="h-64 bg-primary/5 rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-semibold mb-4">Recent Orders</h4>
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded" />
                            <div>Order #{1234 + i}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">2m ago</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-semibold mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Menu className="h-4 w-4 mr-1" /> Menu
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" /> Settings
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
         <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: UserPlus,
                title: "Sign Up",
                description: "Create your account in minutes"
              },
              {
                icon: Upload,
                title: "Upload Menu",
                description: "Add your dishes and prices"
              },
              {
                icon: Share2,
                title: "Share QR Code",
                description: "Place QR codes on tables"
              },
              {
                icon: ClipboardList,
                title: "Manage Orders",
                description: "Handle orders efficiently"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center relative"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent -translate-y-1/2" />
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
            className="text-4xl font-bold text-center mb-12"
          >
            What our customers say
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold mb-12"
            >
              Why Choose Us
            </motion.h2>
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                {
                  icon: ChefHat,
                  title: "Built for Restaurants",
                  description: "Designed specifically for food service operations"
                },
                {
                  icon: DollarSign,
                  title: "Cost-Effective",
                  description: "Affordable solution for businesses of all sizes"
                },
                {
                  icon: Utensils,
                  title: "Easy to Use",
                  description: "Simple to set up and manage daily"
                },
                {
                  icon: Bell,
                  title: "24/7 Support",
                  description: "Always here when you need assistance"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-left flex items-start space-x-4 p-6 rounded-xl bg-card border border-primary/10"
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="py-16 bg-primary/5">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Join Hundreds of Food Outlets Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your digital transformation journey with MenuMaster
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="px-8 bg-primary hover:bg-primary/90"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">FoodFlow</span>
              </div>
              <p className="text-muted-foreground">
                Streamline your food business operations with our comprehensive management system.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FoodFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
    