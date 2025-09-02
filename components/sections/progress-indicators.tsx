"use client"

import { motion } from "framer-motion"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Browse & Select",
    description: "Choose from 15,000+ building materials",
    completed: true,
  },
  {
    title: "Get Quote",
    description: "Instant pricing with bulk discounts",
    completed: true,
  },
  {
    title: "Place Order",
    description: "Secure checkout with flexible payment",
    completed: true,
  },
  {
    title: "Fast Delivery",
    description: "Direct to your job site",
    completed: false,
  },
]

export function ProgressIndicators() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Simple 4-Step Process</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From selection to delivery, we have streamlined the entire process to save you time and money.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200">
              <motion.div
                className="h-full bg-orange-500"
                initial={{ width: "0%" }}
                whileInView={{ width: "75%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-200 mb-4 relative z-10">
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-orange-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-400" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>

                  {/* Arrow (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 -right-4 z-20">
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 inline-block">
              <p className="text-slate-600 mb-2">
                <strong className="text-slate-800">Average order processing time:</strong>
              </p>
              <div className="text-3xl font-bold text-orange-500">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true }}
                >
                  2.5 hours
                </motion.span>
              </div>
              <p className="text-sm text-slate-500 mt-1">From order to dispatch</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
