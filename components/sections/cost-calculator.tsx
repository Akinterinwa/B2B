"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

export function CostCalculator() {
  const [houseType, setHouseType] = useState("")
  const [squareFootage, setSquareFootage] = useState("")
  const [location, setLocation] = useState("")
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateCost = async () => {
    if (houseType && squareFootage) {
      setIsCalculating(true)

      // Simulate calculation time for better UX
      await new Promise(resolve => setTimeout(resolve, 800))

      const baseRate = houseType === "single-family" ? 120 : houseType === "duplex" ? 110 : 95
      const cost = Number.parseInt(squareFootage) * baseRate
      setEstimatedCost(cost)
      setIsCalculating(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Estimate Your Project Cost</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate for your building materials based on project type and size
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">House Type</label>
                  <Select value={houseType} onValueChange={setHouseType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select house type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="commercial">Commercial Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Square Footage</label>
                  <Input
                    type="number"
                    placeholder="e.g., 2500"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urban Area</SelectItem>
                      <SelectItem value="suburban">Suburban Area</SelectItem>
                      <SelectItem value="rural">Rural Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateCost}
                  className="w-full bg-orange-500 hover:bg-orange-600 btn-hover-lift"
                  disabled={!houseType || !squareFootage}
                  loading={isCalculating}
                  loadingText="Calculating..."
                >
                  Calculate Estimate
                </Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Cost Breakdown</h4>
                {estimatedCost > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Foundation Materials</span>
                      <span>${(estimatedCost * 0.25).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Framing & Lumber</span>
                      <span>${(estimatedCost * 0.35).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roofing Materials</span>
                      <span>${(estimatedCost * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Materials</span>
                      <span>${(estimatedCost * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total Estimate</span>
                      <span className="text-orange-600">${estimatedCost.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent btn-hover-lift">
                      Get Detailed Quote
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500">Fill in the details to see your estimate</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
