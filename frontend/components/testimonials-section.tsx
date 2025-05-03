"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "OnboardPro has completely transformed how I onboard new clients. The contract templates and e-signature feature save me hours of work, and I get paid faster with the integrated payment system.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Agency Owner",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "As an agency owner, keeping track of multiple clients was always a challenge. With OnboardPro, we've streamlined our entire onboarding process and improved our client experience significantly.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Developer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The analytics dashboard gives me insights I never had before. I can see which services are most popular and optimize my offerings accordingly. Plus, clients love the professional experience.",
      rating: 4,
    },
    {
      name: "David Wilson",
      role: "Consulting Business",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "I was skeptical at first, but OnboardPro has paid for itself many times over. The time saved on paperwork alone is worth it, not to mention the professional impression it makes on new clients.",
      rating: 5,
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
    <section className="py-20 bg-white dark:bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied freelancers and agencies who have transformed their client onboarding
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
