"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, X, Phone, Mail, Star, Package } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { searchProducts, type Product } from "@/lib/products-data"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { state } = useCart()

  // Show count of unique products, not total quantity
  const totalItems = state.items.length

  // Enhanced search with debouncing
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      const results = searchProducts(searchQuery, 8) // Get up to 8 results
      setSearchResults(results)
      setShowSearchResults(true)
      setIsSearching(false)
      setSelectedIndex(-1)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
  }

  const handleSearchResultClick = (productId?: number) => {
    setShowSearchResults(false)
    setSearchQuery("")
    setSelectedIndex(-1)

    if (productId) {
      router.push(`/products/${productId}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        // Navigate to selected product
        router.push(`/products/${searchResults[selectedIndex].id}`)
      } else {
        // Navigate to products page with search query
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      }
      handleSearchResultClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          router.push(`/products/${searchResults[selectedIndex].id}`)
          handleSearchResultClick()
        } else {
          handleSearchSubmit(e)
        }
        break
      case 'Escape':
        setShowSearchResults(false)
        setSelectedIndex(-1)
        searchInputRef.current?.blur()
        break
    }
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
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search for construction materials..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              {/* Search Results Dropdown */}
              {(showSearchResults && (searchResults.length > 0 || isSearching)) && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product, index) => (
                        <div
                          key={product.id}
                          onClick={() => handleSearchResultClick(product.id)}
                          className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                            index === selectedIndex
                              ? 'bg-blue-50 border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-gray-500">{product.category}</p>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                              </div>
                              {!product.inStock && (
                                <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm font-semibold text-blue-900">₦{product.price.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">{product.supplier}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="p-2 border-t bg-gray-50">
                        <button
                          type="submit"
                          className="w-full text-left px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        >
                          View all results for "{searchQuery}" →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      No products found for "{searchQuery}"
                      <div className="mt-2">
                        <button
                          type="submit"
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Search all products →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
            <Button
              type="submit"
              onClick={handleSearchSubmit}
              className="ml-2 bg-blue-900 hover:bg-blue-800 btn-hover-lift"
              disabled={!searchQuery.trim()}
            >
              Search
            </Button>
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
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search materials..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

            {/* Mobile Search Results */}
            {(showSearchResults && (searchResults.length > 0 || isSearching)) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchResultClick(product.id)}
                        className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                          index === selectedIndex
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{product.category}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-blue-900 mt-1">₦{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 border-t bg-gray-50">
                      <button
                        type="submit"
                        className="w-full text-left px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      >
                        View all results →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    <Package className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                    No products found
                    <div className="mt-2">
                      <button
                        type="submit"
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Search all products →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
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
