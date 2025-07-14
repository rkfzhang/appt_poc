// Value add data for amenities based on location (zipcode)
export interface ValueAdd {
  zipcode: string;
  amenityName: string;
  valueAdd: number;
}

export const valueAddData: ValueAdd[] = [
  // Zipcode 10001
  { zipcode: '10001', amenityName: 'Swimming Pool', valueAdd: 75 },
  { zipcode: '10001', amenityName: 'BBQ / Grill', valueAdd: 50 },
  { zipcode: '10001', amenityName: 'Doorman', valueAdd: 100 },
  { zipcode: '10001', amenityName: 'Gym / Fitness Center', valueAdd: 50 },
  { zipcode: '10001', amenityName: 'Pets Allowed', valueAdd: 25 },
  { zipcode: '10001', amenityName: 'EV Parking', valueAdd: 50 },
  { zipcode: '10001', amenityName: 'Shared Laundry', valueAdd: 30 },
  { zipcode: '10001', amenityName: 'Basketball Court', valueAdd: 40 },
  { zipcode: '10001', amenityName: 'In-unit Laundry', valueAdd: 50 },
  { zipcode: '10001', amenityName: 'Private Balcony', valueAdd: 60 },
  { zipcode: '10001', amenityName: 'Quartz', valueAdd: 40 },
  { zipcode: '10001', amenityName: 'Granite', valueAdd: 50 },
  { zipcode: '10001', amenityName: 'Vinyl Flooring', valueAdd: 30 },
  { zipcode: '10001', amenityName: 'Stainless Steel', valueAdd: 35 },
  
  // Zipcode 10002
  { zipcode: '10002', amenityName: 'Swimming Pool', valueAdd: 80 },
  { zipcode: '10002', amenityName: 'BBQ / Grill', valueAdd: 45 },
  { zipcode: '10002', amenityName: 'Doorman', valueAdd: 110 },
  { zipcode: '10002', amenityName: 'Gym / Fitness Center', valueAdd: 55 },
  { zipcode: '10002', amenityName: 'Pets Allowed', valueAdd: 30 },
  { zipcode: '10002', amenityName: 'EV Parking', valueAdd: 45 },
  { zipcode: '10002', amenityName: 'Shared Laundry', valueAdd: 25 },
  { zipcode: '10002', amenityName: 'Basketball Court', valueAdd: 35 },
  { zipcode: '10002', amenityName: 'In-unit Laundry', valueAdd: 55 },
  { zipcode: '10002', amenityName: 'Private Balcony', valueAdd: 65 },
  { zipcode: '10002', amenityName: 'Quartz', valueAdd: 45 },
  { zipcode: '10002', amenityName: 'Granite', valueAdd: 55 },
  { zipcode: '10002', amenityName: 'Vinyl Flooring', valueAdd: 35 },
  { zipcode: '10002', amenityName: 'Stainless Steel', valueAdd: 40 },
  
  // Zipcode 10003
  { zipcode: '10003', amenityName: 'Swimming Pool', valueAdd: 85 },
  { zipcode: '10003', amenityName: 'BBQ / Grill', valueAdd: 55 },
  { zipcode: '10003', amenityName: 'Doorman', valueAdd: 120 },
  { zipcode: '10003', amenityName: 'Gym / Fitness Center', valueAdd: 60 },
  { zipcode: '10003', amenityName: 'Pets Allowed', valueAdd: 35 },
  { zipcode: '10003', amenityName: 'EV Parking', valueAdd: 60 },
  { zipcode: '10003', amenityName: 'Shared Laundry', valueAdd: 35 },
  { zipcode: '10003', amenityName: 'Basketball Court', valueAdd: 45 },
  { zipcode: '10003', amenityName: 'In-unit Laundry', valueAdd: 60 },
  { zipcode: '10003', amenityName: 'Private Balcony', valueAdd: 70 },
  { zipcode: '10003', amenityName: 'Quartz', valueAdd: 50 },
  { zipcode: '10003', amenityName: 'Granite', valueAdd: 60 },
  { zipcode: '10003', amenityName: 'Vinyl Flooring', valueAdd: 40 },
  { zipcode: '10003', amenityName: 'Stainless Steel', valueAdd: 45 }
];

// Function to get value add for a specific amenity in a specific zipcode
export const getValueAdd = (zipcode: string, amenityName: string): number => {
  const valueAddItem = valueAddData.find(
    item => item.zipcode === zipcode && item.amenityName === amenityName
  );
  return valueAddItem ? valueAddItem.valueAdd : 0;
};

// Function to get all value adds for a specific zipcode
export const getValueAddsForZipcode = (zipcode: string): ValueAdd[] => {
  return valueAddData.filter(item => item.zipcode === zipcode);
};

// Function to calculate rent estimate based on inputs and selected amenities
export interface RentEstimate {
  low: number;
  mid: number;
  high: number;
}

export const calculateRentEstimate = (
  zipcode: string,
  sqft: number,
  bedrooms: number,
  bathrooms: number,
  selectedAmenities: string[]
): RentEstimate => {
  // Base rent calculation (simplified for POC)
  let baseRent = 0;
  
  // Different base rent by zipcode
  switch (zipcode) {
    case '10001':
      baseRent = 2000;
      break;
    case '10002':
      baseRent = 1900;
      break;
    case '10003':
      baseRent = 2200;
      break;
    default:
      baseRent = 2000;
  }
  
  // Adjust for size
  baseRent += (sqft - 700) * 0.5; // $0.50 per sqft above 700
  
  // Adjust for bedrooms and bathrooms
  baseRent += bedrooms * 300;
  baseRent += bathrooms * 200;
  
  // Adjust for amenities
  let amenitiesValue = 0;
  for (const amenity of selectedAmenities) {
    amenitiesValue += getValueAdd(zipcode, amenity);
  }
  baseRent += amenitiesValue;
  
  // Calculate range
  return {
    low: Math.round(baseRent * 0.9),
    mid: Math.round(baseRent),
    high: Math.round(baseRent * 1.1)
  };
};

// Function to get value adds for amenities not in the selected list for a specific zipcode
export const getAdditionalValueAdds = (zipcode: string, selectedAmenities: string[]): ValueAdd[] => {
  return valueAddData.filter(
    item => item.zipcode === zipcode && !selectedAmenities.includes(item.amenityName)
  );
};
