import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Hammer, Shield, Zap, Wrench } from "lucide-react"
import Image from "next/image"

export function ProductCategories() {
  const categories = [
    { name: "Foundation Materials", icon: Building, price: "From $2,500", image: "/images/concrete-foundation-materials.png" },
    { name: "Lumber & Framing", icon: Hammer, price: "From $1,800", image: "/images/lumber-wood-framing-materials.png" },
    { name: "Roofing Systems", icon: Shield, price: "From $3,200", image: "/images/roofing-shingles-materials.png" },
    { name: "Electrical Supplies", icon: Zap, price: "From $850", image: "/images/electrical-wiring-supplies.png" },
    { name: "Plumbing", icon: Wrench, price: "From $1,200", image: "/images/plumbing-pipes-fixtures.png" },
    {
      name: "Hardware & Fasteners",
      icon: Building,
      price: "From $450",
      image: "/images/construction-hardware-nails-screws.png",
    },
  ]

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Shop by Category</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for your construction project, sourced directly from manufacturers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <category.icon className="h-6 w-6 text-orange-500" />
                    <h4 className="font-semibold text-lg">{category.name}</h4>
                  </div>
                  <p className="text-gray-600 mb-3">{category.price}</p>
                  <Badge variant="secondary" className="group-hover:bg-orange-100">
                    Bulk Discounts Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
