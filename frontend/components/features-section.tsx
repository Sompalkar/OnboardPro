"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { FileText, CheckCircle, CreditCard, Users, BarChart, Shield, Zap, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Contract Templates",
      description:
        "Customizable templates for contracts, NDAs, and scope documents to save time and ensure consistency.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "E-Signatures",
      description: "Secure electronic signatures for faster agreement completion with legal validity worldwide.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Payment Collection",
      description: "Integrated Stripe and PayPal for seamless payment processing and automated invoicing.",
    },
    {
      icon: <Users className="h-10 w-10 text-orange-600 dark:text-orange-400" />,
      title: "Client Management",
      description: "Organize client information and track onboarding progress all in one centralized location.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-sky-600 dark:text-sky-400" />,
      title: "Analytics Dashboard",
      description: "Gain insights into your business with comprehensive analytics and reporting tools.",
    },
    {
      icon: <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />,
      title: "Document Security",
      description: "Bank-level encryption for all your documents and client information to ensure privacy.",
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-600 dark:text-amber-400" />,
      title: "Automation",
      description: "Automate repetitive tasks like follow-ups, reminders, and status updates to save time.",
    },
    {
      icon: <Globe className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
      title: "Custom Branding",
      description: "Add your logo, colors, and branding to create a seamless client experience.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to onboard clients professionally and efficiently
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-2 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/20">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
