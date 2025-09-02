import Image from "next/image"

const badges = [
  { name: "ISO 9001 Certified", logo: "/iso-9001-certification-badge.png" },
  { name: "Better Business Bureau A+", logo: "/bbb-a-rating-badge.png" },
  { name: "Construction Industry Award", logo: "/construction-industry-award-badge.png" },
  { name: "Green Building Certified", logo: "/green-building-certification-badge.png" },
]

export function TrustBadges() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl  mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Trusted by Industry Leaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {badges.map((badge, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <Image
                src={badge.logo || "/placeholder.svg"}
                alt={badge.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
