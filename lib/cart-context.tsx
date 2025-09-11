"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"

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
  | { type: "SET_STATE"; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_STATE":
      return action.payload

    case "TOGGLE_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      let updatedItems: CartItem[]

      if (existingItem) {
        updatedItems = state.items.filter((item) => item.id !== action.payload.id)
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

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

      const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        totalPrice,
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

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

      const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

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

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        dispatch({ type: "SET_STATE", payload: parsedCart })
      } catch (e) {
        console.error("Could not parse cart from local storage", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(state),
    )}; path=/; max-age=2592000; samesite=lax` // 30 days
  }, [state])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}