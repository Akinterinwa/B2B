import { Shield, Truck, Calculator } from "lucide-react"

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Why Contractors Choose BuildSource Pro</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Factory Direct Pricing</h4>
            <p className="text-gray-600">
              Skip distributors and retailers. Get materials at manufacturer prices with bulk discounts up to 40% off
              retail.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Fast Delivery</h4>
            <p className="text-gray-600">
              Same-day and next-day delivery available. Schedule deliveries to match your project timeline perfectly.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-orange-500" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Project Planning Tools</h4>
            <p className="text-gray-600">
              Advanced calculators, material estimators, and project management tools to streamline your workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
