import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "@/lib/cart-context"
import "@/app/globals.css"

export const metadata = {
  title: "SmartBuild - B2B Construction Materials",
  description: "Your one-stop B2B platform for sourcing high-quality construction materials. We provide a seamless and efficient way to get the best prices on a wide range of products, from cement and steel to finishing materials. Built for contractors, developers, and builders.",
  keywords: ["construction materials", "B2B marketplace", "building supplies", "contractors", "developers", "Nigeria", "Lagos", "Abuja", "electrical supplies", "plumbing", "hardware", "fasteners"],
  authors: [{ name: "SmartBuild" }],
  openGraph: {
    title: "SmartBuild - B2B Construction Materials",
    description: "The future of construction material procurement.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBuild - B2B Construction Materials",
    description: "The future of construction material procurement.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
