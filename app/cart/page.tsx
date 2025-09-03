import { CartItems } from "@/components/sections/cart-items"
import { OrderSummary } from "@/components/sections/order-summary"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your selected materials and generate an order code</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
