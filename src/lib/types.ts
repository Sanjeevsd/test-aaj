export type PropertyType = "apartment" | "villa" | "townhouse" | "penthouse";
export type ProjectStatus = "off-plan" | "ready" | "under-construction";

export interface UnitType {
  beds: number;
  baths: number;
  sqft: number;
  priceFrom: number;
  priceTo: number;
}

export interface PaymentPlan {
  label: string;
  percentage: number;
  milestone: string;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  area: string;
  status: ProjectStatus;
  propertyType: PropertyType;
  description: string;
  shortDescription: string;
  images: string[];
  coverImage: string;
  priceFrom: number;
  priceTo: number;
  currency: string;
  handoverDate: string;
  completionPercentage: number;
  unitTypes: UnitType[];
  amenities: Amenity[];
  paymentPlan: PaymentPlan[];
  features: string[];
  latitude: number;
  longitude: number;
  featured: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  area?: string;
  propertyType?: PropertyType;
  status?: ProjectStatus;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  developer?: string;
  sortBy?: "price-asc" | "price-desc" | "newest" | "handover";
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  address: string;
  phone: string;
  email: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  team: { name: string; role: string; image: string }[];
}
