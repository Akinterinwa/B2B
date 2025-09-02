"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, Package, Truck, Award } from "lucide-react"

const stats = [
  { icon: Users, label: "Active Contractors", value: 2500, suffix: "+" },
  { icon: Package, label: "Products Available", value: 15000, suffix: "+" },
  { icon: Truck, label: "Deliveries This Month", value: 8500, suffix: "+" },
  { icon: Award, label: "Years in Business", value: 25, suffix: "" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl font-bold text-slate-800">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function BentoStats() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Trusted by Thousands of Contractors</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join the growing community of contractors who trust us for their building material needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-orange-500" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-600 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Quality Guarantee</h3>
            <p className="text-blue-100 mb-4">
              Every product comes with our 30-day quality guarantee. If you are not satisfied, we will make it right.
            </p>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">ISO 9001 Certified Quality</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-2xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-green-100 mb-4">
              Same-day delivery available for orders placed before 2 PM. We understand your project timelines.
            </p>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span className="text-sm">Free delivery on orders $500+</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
