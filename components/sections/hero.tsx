"use client"

import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToCostCalculator = () => {
    const costCalculatorElement = document.querySelector("#cost-calculator")
    if (costCalculatorElement) {
      costCalculatorElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-5xl font-bold mb-6 text-balance">Factory-Direct Building Materials for Contractors</h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Skip the middleman. Get bulk pricing on premium building materials delivered directly from manufacturers
              to your job site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                onClick={scrollToCostCalculator}
              >
                Calculate Project Cost
              </Button>
            </div>
            <div className="flex items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="text-sm">500+ Contractors Trust Us</div>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <Image
              src="/images/construction-site-with-building-materials.png"
              alt="Construction materials and job site"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
