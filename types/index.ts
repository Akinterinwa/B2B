export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface HouseEstimate {
  houseType: string;
  squareFootage: number;
  location: string;
  estimatedCost: number;
}
