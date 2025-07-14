// Sample apartment data with specific amenity value-adds
import type { Apartment } from './types';

// Available zipcodes
export const zipcodes = ['10001', '10002', '10003'];

// Sample apartment data with specific amenity value-adds
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
    estimatedBaseRent: 1800, // Base rent without amenities
    amenities: [
      { name: 'Doorman', type: 'building', valueAdd: 100 },
      { name: 'Gym / Fitness Center', type: 'building', valueAdd: 75 },
      { name: 'Swimming Pool', type: 'building', valueAdd: 85 },
      { name: 'Quartz', type: 'unit', valueAdd: 40 },
      { name: 'Private Balcony', type: 'unit', valueAdd: 60 },
      { name: 'Stainless Steel', type: 'unit', valueAdd: 35 }
    ]
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
    estimatedBaseRent: 2400,
    amenities: [
      { name: 'Shared Laundry', type: 'building', valueAdd: 30 },
      { name: 'Pets Allowed', type: 'building', valueAdd: 35 },
      { name: 'BBQ / Grill', type: 'building', valueAdd: 45 },
      { name: 'In-unit Laundry', type: 'unit', valueAdd: 65 },
      { name: 'Vinyl Flooring', type: 'unit', valueAdd: 25 }
    ]
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
    estimatedBaseRent: 1750,
    amenities: [
      { name: 'EV Parking', type: 'building', valueAdd: 50 },
      { name: 'Basketball Court', type: 'building', valueAdd: 40 },
      { name: 'Granite', type: 'unit', valueAdd: 45 },
      { name: 'Stainless Steel', type: 'unit', valueAdd: 30 }
    ]
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
    estimatedBaseRent: 2700,
    amenities: [
      { name: 'Swimming Pool', type: 'building', valueAdd: 90 },
      { name: 'Gym / Fitness Center', type: 'building', valueAdd: 80 },
      { name: 'Doorman', type: 'building', valueAdd: 110 },
      { name: 'Pets Allowed', type: 'building', valueAdd: 40 },
      { name: 'In-unit Laundry', type: 'unit', valueAdd: 70 },
      { name: 'Private Balcony', type: 'unit', valueAdd: 65 },
      { name: 'Quartz', type: 'unit', valueAdd: 45 }
    ]
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
    estimatedBaseRent: 1650,
    amenities: [
      { name: 'Shared Laundry', type: 'building', valueAdd: 25 },
      { name: 'BBQ / Grill', type: 'building', valueAdd: 40 },
      { name: 'Vinyl Flooring', type: 'unit', valueAdd: 30 },
      { name: 'Stainless Steel', type: 'unit', valueAdd: 35 }
    ]
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
    estimatedBaseRent: 3500,
    amenities: [
      { name: 'Doorman', type: 'building', valueAdd: 120 },
      { name: 'Swimming Pool', type: 'building', valueAdd: 95 },
      { name: 'Gym / Fitness Center', type: 'building', valueAdd: 85 },
      { name: 'EV Parking', type: 'building', valueAdd: 60 },
      { name: 'BBQ / Grill', type: 'building', valueAdd: 55 },
      { name: 'Quartz', type: 'unit', valueAdd: 50 },
      { name: 'In-unit Laundry', type: 'unit', valueAdd: 75 },
      { name: 'Private Balcony', type: 'unit', valueAdd: 70 },
      { name: 'Stainless Steel', type: 'unit', valueAdd: 45 }
    ]
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
    estimatedBaseRent: 2200,
    amenities: [
      { name: 'Pets Allowed', type: 'building', valueAdd: 30 },
      { name: 'Shared Laundry', type: 'building', valueAdd: 25 },
      { name: 'BBQ / Grill', type: 'building', valueAdd: 45 },
      { name: 'Granite', type: 'unit', valueAdd: 50 },
      { name: 'Vinyl Flooring', type: 'unit', valueAdd: 30 }
    ]
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
    estimatedBaseRent: 1900,
    amenities: [
      { name: 'Gym / Fitness Center', type: 'building', valueAdd: 70 },
      { name: 'Basketball Court', type: 'building', valueAdd: 35 },
      { name: 'Stainless Steel', type: 'unit', valueAdd: 40 },
      { name: 'Private Balcony', type: 'unit', valueAdd: 55 }
    ]
  }
];

// Function to get outliers
export const getOutliers = (threshold: number = 200): Apartment[] => {
  return apartments.filter(apt => {
    const totalAmenityValue = apt.amenities.reduce((sum, am) => sum + am.valueAdd, 0);
    const estimatedRent = apt.estimatedBaseRent + totalAmenityValue;
    return Math.abs(apt.currentRent - estimatedRent) >= threshold;
  });
};

// Get all apartments in a specific zipcode or nearby zipcodes
export const getApartmentsByZipcode = (zipcode: string, includeNearby: boolean = true): Apartment[] => {
  // For now, a simple mapping of nearby zipcodes
  const nearbyZipcodes: Record<string, string[]> = {
    '10001': ['10002', '10003'],
    '10002': ['10001', '10003'],
    '10003': ['10001', '10002']
  };
  
  const relevantZipcodes = includeNearby 
    ? [zipcode, ...(nearbyZipcodes[zipcode] || [])]
    : [zipcode];
    
  return apartments.filter(apt => relevantZipcodes.includes(apt.zipcode));
};
