"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Grid, List, Star, ShoppingCart, Eye, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  "All Products",
  "Foundation Materials",
  "Lumber & Framing",
  "Roofing Systems",
  "Electrical Supplies",
  "Plumbing",
  "Hardware & Fasteners",
]

const products = [
  {
    id: 1,
    name: "Dangote Cement 50kg Bag",
    price: 4500,
    bulkPrice: 4200,
    category: "Foundation Materials",
    image: "/images/concrete-foundation-materials.png",
    rating: 4.8,
    reviews: 234,
    supplier: "Dangote Factory Direct",
    inStock: true,
    bulkDiscount: "7% off 100+ bags",
  },
  {
    id: 2,
    name: "Premium Pine Lumber 2x4x8ft",
    price: 1200,
    bulkPrice: 1050,
    category: "Lumber & Framing",
    image: "/images/lumber-wood-framing-materials.png",
    rating: 4.6,
    reviews: 156,
    supplier: "TimberCorp Direct",
    inStock: true,
    bulkDiscount: "12% off 50+ pieces",
  },
  {
    id: 3,
    name: "Asphalt Roofing Shingles",
    price: 8500,
    bulkPrice: 7800,
    category: "Roofing Systems",
    image: "/images/roofing-shingles-materials.png",
    rating: 4.7,
    reviews: 89,
    supplier: "RoofMax Factory",
    inStock: true,
    bulkDiscount: "8% off 20+ bundles",
  },
  {
    id: 4,
    name: "Electrical Wire 12 AWG 250ft",
    price: 15000,
    bulkPrice: 13500,
    category: "Electrical Supplies",
    image: "/images/electrical-wiring-supplies.png",
    rating: 4.9,
    reviews: 312,
    supplier: "ElectroSource Direct",
    inStock: true,
    bulkDiscount: "10% off 10+ rolls",
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch x 10ft",
    price: 2800,
    bulkPrice: 2500,
    category: "Plumbing",
    image: "/images/plumbing-pipes-fixtures.png",
    rating: 4.5,
    reviews: 178,
    supplier: "PlumbPro Factory",
    inStock: false,
    bulkDiscount: "11% off 25+ pipes",
  },
  {
    id: 6,
    name: "Galvanized Nails 3 inch (5kg)",
    price: 3200,
    bulkPrice: 2900,
    category: "Hardware & Fasteners",
    image: "/images/construction-hardware-nails-screws.png",
    rating: 4.4,
    reviews: 267,
    supplier: "FastenMax Direct",
    inStock: true,
    bulkDiscount: "9% off 20+ boxes",
  },
]

export default function ProductsPage() {
  const { state, dispatch } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  const handleToggleCart = (product: (typeof products)[0]) => {
    dispatch({
      type: "TOGGLE_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        bulkPrice: product.bulkPrice,
        image: product.image,
        supplier: product.supplier,
      },
    })
  }

  const isInCart = (productId: number) => {
    return state.items.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 space-y-4 lg:space-y-6">
            <Card className="lg:sticky lg:top-4">
              <CardContent className="p-4 lg:p-6">
                <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Search Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search materials..."
                    className="pl-10 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Categories</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs lg:text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-900 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <h3 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Price Range</h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="text-xs lg:text-sm"
                    />
                    <span className="text-gray-500 text-sm">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 50000])}
                      className="text-xs lg:text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-3 lg:gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Building Materials</h1>
                <p className="text-sm lg:text-base text-gray-600">{filteredProducts.length} products found</p>
              </div>

              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
                  : "space-y-3 lg:space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <div className="space-y-3 lg:space-y-4">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={250}
                            className="w-full h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm lg:text-base">Out of Stock</span>
                            </div>
                          )}
                          <div className="absolute top-2 lg:top-3 right-2 lg:right-3">
                            <Badge className="bg-orange-500 text-white text-xs">{product.bulkDiscount}</Badge>
                          </div>
                        </div>

                        <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                          <div>
                            <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-600">{product.supplier}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs lg:text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-base lg:text-lg font-bold text-gray-900">
                                ₦{product.price.toLocaleString()}
                              </span>
                              <span className="text-xs lg:text-sm text-gray-500">per unit</span>
                            </div>
                            <div className="text-xs lg:text-sm text-green-600">
                              Bulk: ₦{product.bulkPrice.toLocaleString()} per unit
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              className={`flex-1 text-xs lg:text-sm ${
                                isInCart(product.id) ? "bg-green-600 hover:bg-red-600" : "bg-blue-900 hover:bg-blue-800"
                              }`}
                              disabled={!product.inStock}
                              onClick={() => handleToggleCart(product)}
                            >
                              {isInCart(product.id) ? (
                                <>
                                  <Check className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                  Remove from Cart
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                  Add to Cart
                                </>
                              )}
                            </Button>
                            <Link href={`/products/${product.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex p-3 lg:p-4 space-x-3 lg:space-x-4">
                        <div className="relative w-24 h-20 lg:w-32 lg:h-24 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <span className="text-white text-xs font-semibold">Out of Stock</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm lg:text-base text-gray-900 line-clamp-1">
                                {product.name}
                              </h3>
                              <p className="text-xs lg:text-sm text-gray-600">{product.supplier}</p>
                            </div>
                            <Badge className="bg-orange-500 text-white text-xs flex-shrink-0">
                              {product.bulkDiscount}
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs lg:text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                            <div className="text-sm lg:text-lg font-bold text-gray-900">
                              ₦{product.price.toLocaleString()}
                            </div>
                            <div className="text-xs lg:text-sm text-green-600">
                              Bulk: ₦{product.bulkPrice.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className={`text-xs ${
                                isInCart(product.id) ? "bg-green-600 hover:bg-red-600" : "bg-blue-900 hover:bg-blue-800"
                              }`}
                              disabled={!product.inStock}
                              onClick={() => handleToggleCart(product)}
                            >
                              {isInCart(product.id) ? (
                                <>
                                  <Check className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                  Remove
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                  Add to Cart
                                </>
                              )}
                            </Button>
                            <Link href={`/products/${product.id}`}>
                              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("All Products")
                    setSearchQuery("")
                    setPriceRange([0, 50000])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
