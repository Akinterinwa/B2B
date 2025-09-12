"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export function CartItems() {
  const { state, dispatch } = useCart()
  const [localQuantities, setLocalQuantities] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const quantities = state.items.reduce(
      (acc, item) => {
        acc[item.id] = item.quantity
        return acc
      },
      {} as { [key: number]: number }
    )
    setLocalQuantities(quantities)
  }, [state.items])

  const handleLocalQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    // Update local state immediately
    setLocalQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }))

    // Update cart in real-time
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2 2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-4">Add some materials to get started</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {state.items.map((item) => {
        const localQuantity = localQuantities[item.id] || item.quantity
        return (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 mb-1">₦{item.price.toLocaleString()} per unit</p>
                  <p className="text-sm text-gray-500 mb-3">Supplier: {item.supplier}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-hover-lift hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleLocalQuantityChange(item.id, localQuantity - 1)}
                        disabled={localQuantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-4 py-2 border rounded-md text-center min-w-[60px] font-medium">
                        {localQuantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-hover-lift hover:bg-green-50 hover:border-green-300"
                        onClick={() => handleLocalQuantityChange(item.id, localQuantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₦{(item.price * localQuantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">{localQuantity} units</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${item.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 btn-hover-lift"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 btn-hover-lift hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
