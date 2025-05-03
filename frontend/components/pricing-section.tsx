"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: "Basic",
      price: "$10",
      description: "Perfect for freelancers just getting started",
      features: ["5 clients", "3 templates", "Basic analytics", "Email support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$30",
      description: "For growing freelancers and small agencies",
      features: [
        "20 clients",
        "Unlimited templates",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Team collaboration",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Agency",
      price: "$50",
      description: "For established agencies with multiple team members",
      features: [
        "Unlimited clients",
        "Unlimited templates",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Team collaboration",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Get Started",
      popular: false,
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
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={item} className="relative">
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <div
                className={`h-full flex flex-col rounded-xl border-2 ${
                  plan.popular
                    ? "border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                    : "border-border"
                } overflow-hidden`}
              >
                <div className="p-6 bg-white dark:bg-gray-950">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900/30">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle
                          className={`mr-2 h-4 w-4 ${
                            plan.popular ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
                          }`}
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white dark:bg-gray-950">
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
