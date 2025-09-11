"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDelivery, type DeliveryData } from "@/lib/tracking"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-500",
    text: "Order Pending",
    description: "Your order has been received and is being processed",
  },
  confirmed: {
    icon: Package,
    color: "bg-blue-500",
    text: "Order Confirmed",
    description: "Your order has been confirmed and is being prepared",
  },
  shipped: {
    icon: Truck,
    color: "bg-orange-500",
    text: "Out for Delivery",
    description: "Your order is on the way to your location",
  },
  delivered: {
    icon: CheckCircle,
    color: "bg-green-500",
    text: "Delivered",
    description: "Your order has been successfully delivered",
  },
}

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [delivery, setDelivery] = useState<DeliveryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError("Please enter a tracking code")
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await getDelivery(trackingCode.trim().toUpperCase())
      if (result) {
        setDelivery(result)
      } else {
        setError("Tracking code not found. Please check and try again.")
        setDelivery(null)
      }
    } catch (err) {
      setError("Error fetching delivery information. Please try again.")
      setDelivery(null)
    } finally {
      setLoading(false)
    }
  }

  const StatusIcon = delivery ? statusConfig[delivery.status].icon : Clock

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gradient-to-br from-blue-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-6">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Track Your Order</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Enter your tracking code below to get real-time updates on your construction materials delivery
            </p>
          </div>

          <Card className="mb-8 shadow-lg border-0">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter tracking code (e.g., MAT-ABC123-XYZ)"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="h-12 text-lg"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="h-12 px-8 bg-blue-900 hover:bg-blue-800 text-lg font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {loading ? "Searching..." : "Track Order"}
                </Button>
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Information */}
          {delivery && (
            <div className="space-y-8">
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className={`${statusConfig[delivery.status].color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <StatusIcon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{statusConfig[delivery.status].text}</h2>
                      <p className="text-white/90 mt-1">{statusConfig[delivery.status].description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {delivery.trackingCode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Current Location</p>
                        <p className="font-semibold text-gray-900">{delivery.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="font-semibold text-gray-900">{format(delivery.updatedAt, "PPP")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Total Value</p>
                        <p className="font-semibold text-gray-900">₦{delivery.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-gray-900">Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-1">Customer Name</p>
                      <p className="text-lg font-semibold text-gray-900">{delivery.customerName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-1">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-900">{delivery.customerPhone}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-1">Delivery Address</p>
                      <p className="text-lg font-semibold text-gray-900">{delivery.customerAddress}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-gray-900">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {delivery.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-gray-900">₦{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                        <p className="text-lg font-bold text-gray-900">Total Amount</p>
                        <p className="text-xl font-bold text-blue-900">₦{delivery.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-gray-900">Delivery Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(statusConfig).map(([status, config], index) => {
                      const isCompleted = Object.keys(statusConfig).indexOf(delivery.status) >= index
                      const isCurrent = delivery.status === status
                      const isNext = Object.keys(statusConfig).indexOf(delivery.status) + 1 === index

                      return (
                        <div key={status} className="flex items-center gap-6">
                          <div
                            className={`relative p-3 rounded-full transition-all duration-300 ${
                              isCompleted
                                ? config.color
                                : isNext
                                  ? "bg-gray-200 border-2 border-gray-300"
                                  : "bg-gray-100"
                            }`}
                          >
                            <config.icon className={`w-6 h-6 ${isCompleted ? "text-white" : "text-gray-400"}`} />
                            {index < Object.keys(statusConfig).length - 1 && (
                              <div
                                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                                  isCompleted ? "bg-green-300" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-lg font-semibold ${
                                isCompleted ? "text-gray-900" : isNext ? "text-gray-600" : "text-gray-400"
                              }`}
                            >
                              {config.text}
                            </p>
                            <p className={`text-sm ${isCompleted ? "text-gray-600" : "text-gray-400"}`}>
                              {config.description}
                            </p>
                            {isCurrent && (
                              <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">Current Status</Badge>
                            )}
                          </div>
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">✓ Complete</Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
