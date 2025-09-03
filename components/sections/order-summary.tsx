"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Copy, MessageCircle, Phone } from "lucide-react"

export function OrderSummary() {
  const [orderGenerated, setOrderGenerated] = useState(false)
  const [orderCode, setOrderCode] = useState("")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    location: "",
    notes: "",
  })

  // Sample cart data - in real app this would come from state management
  const cartItems = [
    { name: "Dangote Cement", quantity: 20, price: 4500, unit: "bag" },
    { name: "Aluminum Roofing Sheets", quantity: 15, price: 8500, unit: "sheet" },
    { name: "Steel Nails Pack", quantity: 5, price: 2500, unit: "pack" },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 15000
  const total = subtotal + deliveryFee

  const generateOrderCode = () => {
    const code = `MAT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    setOrderCode(code)
    setOrderGenerated(true)
  }

  const copyOrderCode = () => {
    navigator.clipboard.writeText(orderCode)
  }

  const shareViaWhatsApp = () => {
    const message = `Hello! I'd like to place an order:

Order Code: ${orderCode}

Items:
${cartItems.map((item) => `- ${item.quantity} ${item.unit}s of ${item.name}`).join("\n")}

Total Estimate: ₦${total.toLocaleString()}

Contact Details:
Name: ${contactInfo.name}
Phone: ${contactInfo.phone}
Location: ${contactInfo.location}

${contactInfo.notes ? `Notes: ${contactInfo.notes}` : ""}

Please confirm availability and payment details.`

    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const callSalesTeam = () => {
    window.location.href = "tel:+2348123456789"
  }

  if (!orderGenerated) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="location">Delivery Location *</Label>
              <Input
                id="location"
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                placeholder="Enter delivery address"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={contactInfo.notes}
                onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                placeholder="Any special requirements or notes"
                rows={3}
              />
            </div>

            <Button
              onClick={generateOrderCode}
              className="w-full"
              disabled={!contactInfo.name || !contactInfo.phone || !contactInfo.location}
            >
              Generate Order Code
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600">Order Code Generated!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 mb-2">Your Order Code</p>
          <p className="text-2xl font-bold text-green-800">{orderCode}</p>
          <Button variant="outline" size="sm" onClick={copyOrderCode} className="mt-2 bg-transparent">
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">Order Summary:</h4>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                - {item.quantity} {item.unit}s of {item.name}
              </span>
            </div>
          ))}
          <div className="border-t pt-2 font-semibold">Total Estimate: ₦{total.toLocaleString()}</div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Next Steps:</h4>
          <p className="text-sm text-gray-600">
            Share your order code with our sales team to confirm availability and arrange payment.
          </p>

          <div className="space-y-2">
            <Button onClick={shareViaWhatsApp} className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
            <Button variant="outline" onClick={callSalesTeam} className="w-full bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Call Sales Team
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <p>
            <strong>Payment Methods:</strong> Bank Transfer, Cash, POS
          </p>
          <p>
            <strong>Delivery:</strong> 1-3 business days after payment confirmation
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
