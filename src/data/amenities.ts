// Types for amenities
export interface Amenity {
  id: string;
  name: string;
  type: 'building' | 'unit';
}

// Building and unit amenities
export const buildingAmenities: Amenity[] = [
  { id: 'b1', name: 'Swimming Pool', type: 'building' },
  { id: 'b2', name: 'BBQ / Grill', type: 'building' },
  { id: 'b3', name: 'Doorman', type: 'building' },
  { id: 'b4', name: 'Gym / Fitness Center', type: 'building' },
  { id: 'b5', name: 'Pets Allowed', type: 'building' },
  { id: 'b6', name: 'EV Parking', type: 'building' },
  { id: 'b7', name: 'Shared Laundry', type: 'building' },
  { id: 'b8', name: 'Basketball Court', type: 'building' },
];

export const unitAmenities: Amenity[] = [
  { id: 'u1', name: 'In-unit Laundry', type: 'unit' },
  { id: 'u2', name: 'Private Balcony', type: 'unit' },
  { id: 'u3', name: 'Quartz', type: 'unit' },
  { id: 'u4', name: 'Granite', type: 'unit' },
  { id: 'u5', name: 'Vinyl Flooring', type: 'unit' },
  { id: 'u6', name: 'Stainless Steel', type: 'unit' },
];

// All amenities combined
export const allAmenities: Amenity[] = [...buildingAmenities, ...unitAmenities];

// Helper function to get amenity by name
export const getAmenityByName = (name: string): Amenity | undefined => {
  return allAmenities.find(amenity => amenity.name === name);
};
