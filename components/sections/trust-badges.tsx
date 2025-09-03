import Image from "next/image"

const badges = [
  { name: "ISO 9001 Certified", logo: "/images/Dangote_Group_Logo.png" },
  { name: "Better Business Bureau A+", logo: "/images/lafarge-logo.jpg" },
  { name: "Construction Industry Award", logo: "/images/pt3-ckeWWb4Z.jpeg" },
  { name: "Green Building Certified", logo: "/images/lafarge-logo.jpg"},
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
