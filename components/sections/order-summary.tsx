"use client"

import { useState, useEffect } from "react"
import { useCart, type CartItem } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, MessageCircle, Phone } from "lucide-react"

export function OrderSummary({
  orderCode,
  onGenerate,
}: {
  orderCode?: string
  onGenerate: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    notes?: string
  }) => Promise<void>
}) {
  const { state, dispatch } = useCart()
  const [loading, setLoading] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState<{ items: CartItem[]; total: number } | null>(null)
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    notes: "",
  })

  useEffect(() => {
    if (orderCode) {
      dispatch({ type: "CLEAR_CART" })
    }
  }, [orderCode, dispatch])

  const cartItems = state.items
  const subtotal = state.totalPrice
  const deliveryFee = 15000
  const total = subtotal + deliveryFee

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setSubmittedOrder({ items: cartItems, total })
    try {
      await onGenerate(contactInfo)
    } finally {
      setLoading(false)
    }
  }

  const copyOrderCode = () => {
    if (orderCode) {
      navigator.clipboard.writeText(orderCode)
    }
  }

  const shareViaWhatsApp = () => {
    if (!orderCode || !submittedOrder) return

    const message = `Hello! I'd like to place an order:

Order Code: ${orderCode}

Items:
${submittedOrder.items.map((item) => `- ${item.quantity} unit(s) of ${item.name}`).join("\n")}

Total Estimate: ₦${submittedOrder.total.toLocaleString()}

My Details:
Name: ${contactInfo.firstName} ${contactInfo.lastName}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
Location: ${contactInfo.location}

${contactInfo.notes ? `Notes: ${contactInfo.notes}` : ""}

Please confirm availability and payment details.`

    const whatsappUrl = `https://wa.me/2347026045597?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const callSalesTeam = () => {
    window.location.href = "tel:+2347026045597"
  }

  if (orderCode) {
    const displayItems = submittedOrder?.items || []
    const displayTotal = submittedOrder?.total || 0

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
            {displayItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  - {item.quantity} unit(s) of {item.name}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 font-semibold">Total Estimate: ₦{displayTotal.toLocaleString()}</div>
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

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add some products to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ... cart items ... */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={contactInfo.firstName}
                onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={contactInfo.lastName}
                onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Delivery Location *</Label>
            <Input
              id="location"
              value={contactInfo.location}
              onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={contactInfo.notes}
              onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone || !contactInfo.location}
          >
            {loading ? "Generating..." : "Generate Order Code"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
