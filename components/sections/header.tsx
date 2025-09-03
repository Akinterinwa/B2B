"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { state } = useCart()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-blue-900 cursor-pointer">BuildSource Pro</h1>
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link href="/products" className="text-gray-700 hover:text-blue-900">
                Products
              </Link>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Framing
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Roofing
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Electrical
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Plumbing
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search materials..." className="pl-10 w-64" />
            </div>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
              Login
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-sm px-3 md:px-4">
              <span className="hidden sm:inline">Get Quote</span>
              <span className="sm:hidden">Quote</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search materials..." className="pl-10 w-full" />
              </div>

              {/* Mobile navigation */}
              <nav className="flex flex-col space-y-3">
                <Link href="/products" className="text-gray-700 hover:text-blue-900 py-2">
                  Products
                </Link>
                <a href="#" className="text-gray-700 hover:text-blue-900 py-2">
                  Framing
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-900 py-2">
                  Roofing
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-900 py-2">
                  Electrical
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-900 py-2">
                  Plumbing
                </a>
              </nav>

              <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 py-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({state.totalItems})</span>
              </Link>

              {/* Mobile login button */}
              <Button variant="outline" className="sm:hidden w-full bg-transparent">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
