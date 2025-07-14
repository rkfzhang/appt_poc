// Type definitions for the apartment rent planner

export interface AmenityValueAdd {
  name: string;
  type: 'building' | 'unit';
  valueAdd: number; // The specific value this amenity adds to this apartment's rent
}

export interface Apartment {
  id: string;
  name: string;
  address: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  currentRent: number;
  estimatedBaseRent: number; // Base rent without amenities
  amenities: AmenityValueAdd[]; // Each amenity with its specific value-add for this apartment
}

export interface RentEstimate {
  low: number;
  mid: number;
  high: number;
}

export interface AmenityWithAvgValue {
  name: string;
  type: 'building' | 'unit';
  avgValueAdd: number;
}
