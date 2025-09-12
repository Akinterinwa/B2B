export interface Product {
  id: number;
  name: string;
  price: number;
  bulkPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  supplier: string;
  inStock: boolean;
  bulkDiscount: string;
  description?: string;
  specifications?: Record<string, string>;
  features?: string[];
  bulkPricing?: Array<{ quantity: string; price: number }>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dangote Cement 50kg Bag",
    price: 4500,
    bulkPrice: 4200,
    category: "Foundation Materials",
    image: "/images/concrete-foundation-materials.png",
    rating: 4.8,
    reviews: 234,
    supplier: "Dangote Factory Direct",
    inStock: true,
    bulkDiscount: "7% off 100+ bags",
    description: "Premium quality Portland cement perfect for all construction needs. Manufactured to international standards with consistent strength and durability.",
    specifications: {
      Weight: "50kg",
      Type: "Portland Cement",
      Grade: "42.5N",
      "Compressive Strength": "42.5 MPa",
      "Setting Time": "Initial: 45 min, Final: 10 hours",
      Fineness: "300-400 m²/kg",
    },
    features: [
      "High compressive strength",
      "Consistent quality",
      "Fast setting time",
      "Suitable for all weather conditions",
      "Factory sealed packaging",
    ],
    bulkPricing: [
      { quantity: "1-49 bags", price: 4500 },
      { quantity: "50-99 bags", price: 4350 },
      { quantity: "100+ bags", price: 4200 },
    ],
  },
  {
    id: 2,
    name: "Premium Pine Lumber 2x4x8ft",
    price: 1200,
    bulkPrice: 1050,
    category: "Lumber & Framing",
    image: "/images/lumber-wood-framing-materials.png",
    rating: 4.6,
    reviews: 156,
    supplier: "TimberCorp Direct",
    inStock: true,
    bulkDiscount: "12% off 50+ pieces",
    description: "High-grade pine lumber ideal for framing, construction, and DIY projects. Kiln-dried for stability and strength.",
    specifications: {
      Dimensions: "2x4x8ft",
      Species: "Southern Yellow Pine",
      Grade: "Construction Grade",
      "Moisture Content": "19% or less",
      Treatment: "Kiln Dried",
    },
    features: [
      "Kiln-dried for stability",
      "Straight and true lumber",
      "Ideal for framing",
      "Sustainable sourcing",
      "Quality graded",
    ],
    bulkPricing: [
      { quantity: "1-24 pieces", price: 1200 },
      { quantity: "25-49 pieces", price: 1125 },
      { quantity: "50+ pieces", price: 1050 },
    ],
  },
  {
    id: 3,
    name: "Asphalt Roofing Shingles",
    price: 8500,
    bulkPrice: 7800,
    category: "Roofing Systems",
    image: "/images/roofing-shingles-materials.png",
    rating: 4.7,
    reviews: 89,
    supplier: "RoofMax Factory",
    inStock: true,
    bulkDiscount: "8% off 20+ bundles",
    description: "Durable asphalt shingles with excellent weather resistance and long-lasting performance.",
    specifications: {
      Type: "3-Tab Asphalt Shingles",
      Coverage: "33.3 sq ft per bundle",
      Weight: "50 lbs per bundle",
      Warranty: "25 years",
      "Wind Rating": "60 mph",
    },
    features: [
      "Weather resistant",
      "Easy installation",
      "25-year warranty",
      "Multiple color options",
      "Fire resistant",
    ],
    bulkPricing: [
      { quantity: "1-9 bundles", price: 8500 },
      { quantity: "10-19 bundles", price: 8150 },
      { quantity: "20+ bundles", price: 7800 },
    ],
  },
  {
    id: 4,
    name: "Electrical Wire 12 AWG 250ft",
    price: 15000,
    bulkPrice: 13500,
    category: "Electrical Supplies",
    image: "/images/electrical-wiring-supplies.png",
    rating: 4.9,
    reviews: 312,
    supplier: "ElectroSource Direct",
    inStock: true,
    bulkDiscount: "10% off 10+ rolls",
    description: "Professional-grade electrical wire suitable for residential and commercial applications.",
    specifications: {
      Gauge: "12 AWG",
      Length: "250 feet",
      Insulation: "THHN/THWN",
      Voltage: "600V",
      Temperature: "90°C",
    },
    features: [
      "UL Listed",
      "Copper conductor",
      "Dual rated insulation",
      "Flexible and durable",
      "Color coded",
    ],
    bulkPricing: [
      { quantity: "1-4 rolls", price: 15000 },
      { quantity: "5-9 rolls", price: 14250 },
      { quantity: "10+ rolls", price: 13500 },
    ],
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch x 10ft",
    price: 2800,
    bulkPrice: 2500,
    category: "Plumbing",
    image: "/images/plumbing-pipes-fixtures.png",
    rating: 4.5,
    reviews: 178,
    supplier: "PlumbPro Factory",
    inStock: false,
    bulkDiscount: "11% off 25+ pipes",
    description: "High-quality PVC pipe for drainage and sewer applications. Corrosion resistant and long-lasting.",
    specifications: {
      Diameter: "4 inches",
      Length: "10 feet",
      Material: "PVC Schedule 40",
      "Pressure Rating": "220 PSI",
      Standard: "ASTM D1785",
    },
    features: [
      "Corrosion resistant",
      "Lightweight",
      "Easy to install",
      "Chemical resistant",
      "Long service life",
    ],
    bulkPricing: [
      { quantity: "1-9 pipes", price: 2800 },
      { quantity: "10-24 pipes", price: 2650 },
      { quantity: "25+ pipes", price: 2500 },
    ],
  },
  {
    id: 6,
    name: "Galvanized Nails 3 inch (5kg)",
    price: 3200,
    bulkPrice: 2900,
    category: "Hardware & Fasteners",
    image: "/images/construction-hardware-nails-screws.png",
    rating: 4.4,
    reviews: 267,
    supplier: "FastenMax Direct",
    inStock: true,
    bulkDiscount: "9% off 20+ boxes",
    description: "Galvanized common nails for general construction and framing applications. Rust-resistant coating.",
    specifications: {
      Length: "3 inches",
      Weight: "5kg per box",
      Coating: "Hot-dip galvanized",
      Head: "Round head",
      Shank: "Smooth shank",
    },
    features: [
      "Rust resistant",
      "High holding power",
      "Consistent quality",
      "Bulk packaging",
      "Professional grade",
    ],
    bulkPricing: [
      { quantity: "1-9 boxes", price: 3200 },
      { quantity: "10-19 boxes", price: 3050 },
      { quantity: "20+ boxes", price: 2900 },
    ],
  },
  {
    id: 7,
    name: "Steel Rebar #4 (20ft)",
    price: 2200,
    bulkPrice: 1980,
    category: "Foundation Materials",
    image: "/images/concrete-foundation-materials.png",
    rating: 4.6,
    reviews: 145,
    supplier: "SteelMax Direct",
    inStock: true,
    bulkDiscount: "10% off 50+ pieces",
    description: "Grade 60 steel rebar for concrete reinforcement. Meets ASTM A615 standards.",
    bulkPricing: [
      { quantity: "1-24 pieces", price: 2200 },
      { quantity: "25-49 pieces", price: 2090 },
      { quantity: "50+ pieces", price: 1980 },
    ],
  },
  {
    id: 8,
    name: "Plywood 3/4 inch 4x8ft",
    price: 3800,
    bulkPrice: 3420,
    category: "Lumber & Framing",
    image: "/images/lumber-wood-framing-materials.png",
    rating: 4.5,
    reviews: 198,
    supplier: "WoodCorp Direct",
    inStock: true,
    bulkDiscount: "10% off 25+ sheets",
    description: "Construction-grade plywood for subflooring, sheathing, and general construction.",
    bulkPricing: [
      { quantity: "1-9 sheets", price: 3800 },
      { quantity: "10-24 sheets", price: 3610 },
      { quantity: "25+ sheets", price: 3420 },
    ],
  },
  {
    id: 9,
    name: "Metal Roofing Panels",
    price: 12000,
    bulkPrice: 10800,
    category: "Roofing Systems",
    image: "/images/roofing-shingles-materials.png",
    rating: 4.8,
    reviews: 76,
    supplier: "MetalRoof Pro",
    inStock: true,
    bulkDiscount: "12% off 15+ panels",
    description: "Corrugated metal roofing panels with superior durability and weather resistance.",
    bulkPricing: [
      { quantity: "1-7 panels", price: 12000 },
      { quantity: "8-14 panels", price: 11400 },
      { quantity: "15+ panels", price: 10800 },
    ],
  },
  {
    id: 10,
    name: "Circuit Breaker 20A",
    price: 850,
    bulkPrice: 765,
    category: "Electrical Supplies",
    image: "/images/electrical-wiring-supplies.png",
    rating: 4.7,
    reviews: 234,
    supplier: "ElectroMax Direct",
    inStock: true,
    bulkDiscount: "8% off 20+ units",
    description: "Single-pole circuit breaker for residential electrical panels. UL listed.",
    bulkPricing: [
      { quantity: "1-9 units", price: 850 },
      { quantity: "10-19 units", price: 808 },
      { quantity: "20+ units", price: 765 },
    ],
  },
];

// Search functionality
export const searchProducts = (query: string, limit: number = 10): Product[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return products
    .filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const supplierMatch = product.supplier.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description?.toLowerCase().includes(searchTerm);
      
      return nameMatch || categoryMatch || supplierMatch || descriptionMatch;
    })
    .sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.name.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name.toLowerCase().includes(searchTerm);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Then sort by rating
      return b.rating - a.rating;
    })
    .slice(0, limit);
};

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All Products") return products;
  return products.filter(product => product.category === category);
};

// Get featured products
export const getFeaturedProducts = (limit: number = 6): Product[] => {
  return products
    .filter(product => product.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};
