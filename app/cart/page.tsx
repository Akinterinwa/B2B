"use client"

import { useState } from "react"
import { CartItems } from "@/components/sections/cart-items"
import { OrderSummary } from "@/components/sections/order-summary"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { createDelivery } from "@/lib/tracking"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const [orderCode, setOrderCode] = useState<string | undefined>()
  const { state: cartState } = useCart()

  const generateOrder = async (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    notes?: string
  }) => {
    if (cartState.items.length === 0) {
      throw new Error("Cart is empty")
    }

    const deliveryData = {
      ...data,
      items: cartState.items.map((item) => ({ ...item, id: item.id.toString() })),
      totalAmount: cartState.totalPrice,
      status: "pending" as const,
    }

    try {
      const code = await createDelivery(deliveryData)
      setOrderCode(code)
    } catch (error) {
      console.error("Failed to create delivery:", error)
      // You might want to show an error message to the user
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your selected materials and generate an order code</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary orderCode={orderCode} onGenerate={generateOrder} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
