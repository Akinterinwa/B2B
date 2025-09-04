"use client"

import { ArrowRight, Hammer, Wrench, HardHat, Truck, Zap, Pipette as Pipe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    id: "foundation-materials",
    title: "Foundation Materials",
    description: "Ready-mix concrete, blocks, bricks, and masonry supplies for foundations and structures.",
    icon: HardHat,
    image: "/images/concrete-foundation-materials.png",
    itemCount: "150+ items",
    featured: ["Ready-Mix Concrete", "Concrete Blocks", "Mortar & Cement", "Rebar & Wire Mesh"],
  },
  {
    id: "lumber-framing",
    title: "Lumber & Framing",
    description: "Quality lumber, engineered wood, and framing materials for residential and commercial projects.",
    icon: Hammer,
    image: "/images/lumber-wood-framing-materials.png",
    itemCount: "200+ items",
    featured: ["Dimensional Lumber", "Engineered Beams", "Plywood & OSB", "Metal Framing"],
  },
  {
    id: "roofing-systems",
    title: "Roofing Systems",
    description: "Complete roofing systems, siding materials, and weatherproofing solutions.",
    icon: Wrench,
    image: "/images/roofing-shingles-materials.png",
    itemCount: "120+ items",
    featured: ["Asphalt Shingles", "Metal Roofing", "Vinyl Siding", "Gutters & Downspouts"],
  },
  {
    id: "electrical-supplies",
    title: "Electrical Supplies",
    description: "Professional electrical components, wiring, and safety equipment for all projects.",
    icon: Zap,
    image: "/images/electrical-wiring-supplies.png",
    itemCount: "180+ items",
    featured: ["Electrical Wire", "Circuit Breakers", "Outlets & Switches", "Conduit & Fittings"],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description: "Complete plumbing solutions including pipes, fixtures, and installation materials.",
    icon: Pipe,
    image: "/images/plumbing-pipes-fixtures.png",
    itemCount: "160+ items",
    featured: ["PVC Pipes", "Copper Fittings", "Valves & Fixtures", "Drain Systems"],
  },
  {
    id: "hardware-fasteners",
    title: "Hardware & Fasteners",
    description: "Professional-grade tools, safety equipment, and fasteners for construction projects.",
    icon: Truck,
    image: "/images/construction-hardware-nails-screws.png",
    itemCount: "300+ items",
    featured: ["Galvanized Nails", "Screws & Bolts", "Anchors & Brackets", "Safety Hardware"],
  },
]

export function ProductCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Shop by Category</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Find everything you need for your construction project. From foundation to finish, we have the materials and
            tools to get the job done right.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-orange-300"
              >
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <IconComponent className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-slate-800 group-hover:text-orange-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{category.itemCount}</span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-700 mb-2">Featured Products:</p>
                      {category.featured.slice(0, 3).map((item, index) => (
                        <p key={index} className="text-xs text-slate-500">
                          • {item}
                        </p>
                      ))}
                    </div>

                    <Link href={`/products?category=${encodeURIComponent(category.title)}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300 bg-transparent"
                      >
                        Browse Category
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
