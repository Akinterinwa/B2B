import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">BuildSource Pro</h5>
            <p className="text-blue-200 mb-4">
              Your trusted partner for factory-direct building materials and construction supplies.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Categories</h6>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white">
                  Foundation Materials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Lumber & Framing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Roofing Systems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Electrical Supplies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Support</h6>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Company</h6>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 BuildSource Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
