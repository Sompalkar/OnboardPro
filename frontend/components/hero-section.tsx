"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles, FileText, CheckCircle, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/10 dark:bg-sky-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col items-center text-center space-y-8 md:space-y-12"
        >
          <motion.div variants={item} className="space-y-4 max-w-3xl">
            <div className="flex justify-center mb-6">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Streamlined Client Onboarding</span>
              </motion.div>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform Your{" "}
              <span className="relative inline-block text-blue-600 dark:text-blue-400">
                Client Experience
                <motion.div
                  className="absolute -bottom-2 left-0 h-2 w-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional contracts, e-signatures, and payments in one seamless platform. Perfect for freelancers and
              agencies.
            </motion.p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="font-medium rounded-full px-8 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg shadow-blue-500/20"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="font-medium rounded-full px-8 border-2">
                <Link href="#features">
                  <FileText className="mr-2 h-4 w-4" />
                  View Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="relative w-full max-w-5xl mx-auto mt-8 md:mt-16">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-xl blur-xl"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-500" />

                <div className="p-4 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">OnboardPro Dashboard</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Client Overview</h3>
                        <p className="text-muted-foreground text-sm">
                          Track and manage all your clients and contracts in one place.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          <span>12</span>
                          <span className="ml-1">Clients</span>
                        </div>
                        <div className="flex items-center px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 rounded-full text-xs font-medium">
                          <span>7</span>
                          <span className="ml-1">Projects</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background rounded-lg p-4 border border-border/50 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="font-medium text-sm">Contracts</span>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-800 dark:text-blue-300">3</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full mb-2" />
                        <div className="h-2 w-2/3 bg-muted rounded-full" />
                      </div>
                      <div className="bg-background rounded-lg p-4 border border-border/50 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-sky-500 mr-2" />
                            <span className="font-medium text-sm">Templates</span>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-sky-800 dark:text-sky-300">6</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full mb-2" />
                        <div className="h-2 w-2/3 bg-muted rounded-full" />
                      </div>
                      <div className="bg-background rounded-lg p-4 border border-border/50 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 text-cyan-500 mr-2" />
                            <span className="font-medium text-sm">Payments</span>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-cyan-800 dark:text-cyan-300">$4.3k</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full mb-2" />
                        <div className="h-2 w-2/3 bg-muted rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-8 mt-12">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center text-white">
                <span className="text-xl font-bold">10K+</span>
              </div>
              <span className="text-muted-foreground">Contracts Signed</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center text-white">
                <span className="text-xl font-bold">5K+</span>
              </div>
              <span className="text-muted-foreground">Active Users</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center text-white">
                <span className="text-xl font-bold">$2M+</span>
              </div>
              <span className="text-muted-foreground">Payments Processed</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          >
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="h-6 w-6" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
