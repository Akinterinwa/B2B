"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Flame } from "lucide-react"

const deals = [
  {
    title: "Winter Lumber Sale",
    discount: "25% OFF",
    description: "Premium framing lumber - limited time offer",
    timeLeft: "2 days left",
    urgent: true,
  },
  {
    title: "Bulk Concrete Mix",
    discount: "Buy 10 Get 2 FREE",
    description: "High-strength concrete mix for foundations",
    timeLeft: "5 days left",
    urgent: false,
  },
  {
    title: "Roofing Bundle Deal",
    discount: "30% OFF",
    description: "Complete roofing materials package",
    timeLeft: "1 week left",
    urgent: false,
  },
]

export function FeaturedDeals() {
  const [currentDeal, setCurrentDeal] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % deals.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 animate-pulse" />
              <span className="font-bold">HOT DEAL</span>
            </div>

            <div className="hidden md:block h-6 w-px bg-white/30"></div>

            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {deals[currentDeal].discount}
              </Badge>
              <span className="font-semibold">{deals[currentDeal].title}</span>
              <span className="hidden sm:inline text-white/90">- {deals[currentDeal].description}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{deals[currentDeal].timeLeft}</span>
            </div>
            <Button variant="secondary" size="sm" className="bg-white text-orange-600 hover:bg-white/90">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
