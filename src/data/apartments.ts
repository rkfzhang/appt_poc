export interface Apartment {
  id: string;
  name: string;
  address: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  currentRent: number;
  estimatedRent: number;
  buildingAmenities: string[];
  unitAmenities: string[];
}

export const apartments: Apartment[] = [
  {
    id: '1',
    name: 'Luxury Towers',
    address: '123 Main St',
    zipcode: '10001',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    currentRent: 2100,
    estimatedRent: 2200,
    buildingAmenities: ['Doorman', 'Gym', 'Swimming Pool'],
    unitAmenities: ['Quartz', 'Private Balcony', 'Stainless Steel']
  },
  {
    id: '2',
    name: 'Urban Lofts',
    address: '456 Park Ave',
    zipcode: '10002',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    currentRent: 2800,
    estimatedRent: 2600,
    buildingAmenities: ['Shared Laundry', 'Pets Allowed', 'BBQ / Grill'],
    unitAmenities: ['In-unit Laundry', 'Vinyl Flooring']
  },
  {
    id: '3',
    name: 'The Heights',
    address: '789 Broadway',
    zipcode: '10001',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    currentRent: 1900,
    estimatedRent: 2100,
    buildingAmenities: ['EV Parking', 'Basketball Court'],
    unitAmenities: ['Granite', 'Stainless Steel']
  },
  {
    id: '4',
    name: 'Riverside Apartments',
    address: '321 River Rd',
    zipcode: '10003',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    currentRent: 3200,
    estimatedRent: 3000,
    buildingAmenities: ['Swimming Pool', 'Gym', 'Doorman', 'Pets Allowed'],
    unitAmenities: ['In-unit Laundry', 'Private Balcony', 'Quartz']
  },
  {
    id: '5',
    name: 'Downtown Suites',
    address: '555 5th Ave',
    zipcode: '10002',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    currentRent: 1800,
    estimatedRent: 2000,
    buildingAmenities: ['Shared Laundry', 'BBQ / Grill'],
    unitAmenities: ['Vinyl Flooring', 'Stainless Steel']
  },
  {
    id: '6',
    name: 'Skyline Residences',
    address: '888 High St',
    zipcode: '10003',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    currentRent: 4200,
    estimatedRent: 4000,
    buildingAmenities: ['Doorman', 'Swimming Pool', 'Gym', 'EV Parking', 'BBQ / Grill'],
    unitAmenities: ['Quartz', 'In-unit Laundry', 'Private Balcony', 'Stainless Steel']
  },
  {
    id: '7',
    name: 'Garden View',
    address: '222 Green St',
    zipcode: '10001',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    currentRent: 2500,
    estimatedRent: 2700,
    buildingAmenities: ['Pets Allowed', 'Shared Laundry', 'BBQ / Grill'],
    unitAmenities: ['Granite', 'Vinyl Flooring']
  },
  {
    id: '8',
    name: 'Central Park Apartments',
    address: '444 Park Blvd',
    zipcode: '10002',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    currentRent: 2300,
    estimatedRent: 2100,
    buildingAmenities: ['Gym', 'Basketball Court'],
    unitAmenities: ['Stainless Steel', 'Private Balcony']
  }
];

// Function to get outliers (apartments where the difference between current and estimated rent is significant)
export const getOutliers = (threshold: number = 200): Apartment[] => {
  return apartments.filter(apt => Math.abs(apt.currentRent - apt.estimatedRent) >= threshold);
};

// Available zipcodes
export const zipcodes = ['10001', '10002', '10003'];
