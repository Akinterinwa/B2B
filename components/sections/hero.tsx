import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 text-balance">Factory-Direct Building Materials for Contractors</h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Skip the middleman. Get bulk pricing on premium building materials delivered directly from manufacturers
              to your job site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Browse Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                Calculate Project Cost
              </Button>
            </div>
            <div className="flex items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="text-sm">500+ Contractors Trust Us</div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/construction-site-with-building-materials.png"
              alt="Construction materials and job site"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
