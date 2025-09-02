"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-900">BuildSource Pro</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Foundation
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Framing
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Roofing
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Electrical
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900">
                Plumbing
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search materials..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">Login</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Get Quote</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
