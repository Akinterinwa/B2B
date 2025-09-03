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
    <section className="py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <span className="font-bold text-sm sm:text-base">HOT DEAL</span>
            </div>

            <div className="hidden sm:block h-6 w-px bg-white/30"></div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                {deals[currentDeal].discount}
              </Badge>
              <span className="font-semibold text-sm sm:text-base">{deals[currentDeal].title}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-xs sm:text-sm text-white/90 sm:hidden">{deals[currentDeal].description}</span>
            <span className="hidden sm:inline text-sm text-white/90">- {deals[currentDeal].description}</span>

            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{deals[currentDeal].timeLeft}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-orange-600 hover:bg-white/90 text-xs sm:text-sm px-3 sm:px-4"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
