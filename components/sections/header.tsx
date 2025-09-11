"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, X, Phone, Mail } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: 1,
    name: "Dangote Cement 50kg Bag",
    price: 4500,
    category: "Foundation Materials",
    image: "/images/concrete-foundation-materials.png",
  },
  {
    id: 2,
    name: "Premium Pine Lumber 2x4x8ft",
    price: 1200,
    category: "Lumber & Framing",
    image: "/images/lumber-wood-framing-materials.png",
  },
  {
    id: 3,
    name: "Asphalt Roofing Shingles",
    price: 8500,
    category: "Roofing Systems",
    image: "/images/roofing-shingles-materials.png",
  },
  {
    id: 4,
    name: "Electrical Wire 12 AWG 250ft",
    price: 15000,
    category: "Electrical Supplies",
    image: "/images/electrical-wiring-supplies.png",
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch x 10ft",
    price: 2800,
    category: "Plumbing",
    image: "/images/plumbing-pipes-fixtures.png",
  },
  {
    id: 6,
    name: "Galvanized Nails 3 inch (5kg)",
    price: 3200,
    category: "Hardware & Fasteners",
    image: "/images/construction-hardware-nails-screws.png",
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { state } = useCart()

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const searchResults = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5) // Limit to 5 results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSearchResults(value.length > 0)
  }

  const handleSearchResultClick = () => {
    setShowSearchResults(false)
    setSearchQuery("")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+234 800 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>info@buildmart.ng</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Free delivery on orders above ₦50,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-900 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">SB</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">SmartBuild</h1>
              <p className="text-xs text-gray-600">Construction Materials</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for construction materials..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={handleSearchResultClick}
                      className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-md mr-3 flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                        <p className="text-sm font-semibold text-blue-900">₦{product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="p-3 text-center text-gray-500 text-sm">No products found for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
            <Button className="ml-2 bg-blue-900 hover:bg-blue-800">Search</Button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <Badge className="bg-red-500 text-white text-xs px-1 py-0 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search materials..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={handleSearchResultClick}
                    className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-sm font-semibold text-blue-900">₦{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 py-4">
              <li>
                <Link href="/products" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900 font-medium">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/cement" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900">
                  Cement & Concrete
                </Link>
              </li>
              <li>
                <Link href="/categories/steel" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900">
                  Steel & Iron
                </Link>
              </li>
              <li>
                <Link href="/categories/roofing" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900">
                  Roofing Materials
                </Link>
              </li>
              <li>
                <Link href="/categories/tools" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900">
                  Tools & Equipment
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="block py-2 md:py-0 text-gray-700 hover:text-blue-900 font-medium">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="block py-2 md:py-0 text-blue-900 hover:text-blue-700 font-medium">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
