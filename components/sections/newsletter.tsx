"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, TrendingUp, Bell, Gift } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Market</h2>
            <p className="text-slate-300 text-lg">
              Get weekly price alerts, industry news, and exclusive contractor deals delivered to your inbox.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <span className="text-sm">Weekly Price Updates</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <span className="text-sm">Stock Alerts</span>
            </div>
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <span className="text-sm">Exclusive Deals</span>
            </div>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-slate-900"
                />
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">No spam. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 font-semibold">
                ✓ Successfully subscribed! Check your email for confirmation.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
