import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { CostCalculator } from "@/components/sections/cost-calculator"
import { ProductCategories } from "@/components/sections/product-categories"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Footer } from "@/components/sections/footer"
import { TrustBadges } from "@/components/sections/trust-badges"
import { DeliveryMap } from "@/components/sections/delivery-map"
import { FeaturedDeals } from "@/components/sections/featured-deal"
import { Newsletter } from "@/components/sections/newsletter"
import { BentoStats } from "@/components/sections/bento-stats"
import { ProgressIndicators } from "@/components/sections/progress-indicators"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background w-full mx-auto">
      <Header />
      <FeaturedDeals />
      <Hero />
      <div id="cost-calculator">
        <CostCalculator />
      </div>
      <BentoStats />
      <ProductCategories />
      <TrustBadges />
      <DeliveryMap />
      <ProgressIndicators />
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </main>
  )
}
