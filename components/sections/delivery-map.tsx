"use client"

import { useState } from "react"
import { MapPin, Clock, Truck } from "lucide-react"

const deliveryZones = [
  { name: "Downtown", time: "Same Day", color: "bg-green-500", coords: "top-1/4 left-1/3" },
  { name: "North District", time: "Next Day", color: "bg-blue-500", coords: "top-1/6 left-1/2" },
  { name: "South Valley", time: "2-3 Days", color: "bg-orange-500", coords: "bottom-1/4 right-1/3" },
  { name: "East Side", time: "2-3 Days", color: "bg-orange-500", coords: "top-1/2 right-1/4" },
  { name: "West Hills", time: "3-5 Days", color: "bg-red-500", coords: "top-1/3 left-1/6" },
]

export function DeliveryMap() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Fast Delivery Across All Zones</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Check delivery times for your location. We serve contractors across the entire metropolitan area.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-slate-100 rounded-2xl p-8 h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 opacity-50"></div>
              {deliveryZones.map((zone) => (
                <div
                  key={zone.name}
                  className={`absolute ${zone.coords} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110`}
                  onClick={() => setSelectedZone(zone.name)}
                >
                  <div className={`w-4 h-4 ${zone.color} rounded-full animate-pulse`}></div>
                  <div
                    className={`w-8 h-8 ${zone.color} rounded-full opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {deliveryZones.map((zone) => (
              <div
                key={zone.name}
                className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  selectedZone === zone.name
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedZone(zone.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-slate-600" />
                    <span className="font-semibold text-slate-800">{zone.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{zone.time}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Free Delivery</span>
              </div>
              <p className="text-sm text-blue-700">Orders over $500 qualify for free delivery to all zones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
