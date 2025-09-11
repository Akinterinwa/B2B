"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  bulkPrice: number
  image: string
  quantity: number
  supplier: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "TOGGLE_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      let updatedItems: CartItem[]

      if (existingItem) {
        updatedItems = state.items.filter((item) => item.id !== action.payload.id)
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        totalPrice,
      }
    }

    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      let updatedItems: CartItem[]

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        totalPrice,
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        totalPrice,
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0)

      const totalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        totalPrice,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  })

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
