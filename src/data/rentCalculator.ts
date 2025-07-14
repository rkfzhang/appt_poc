// Rent calculation utilities
import type { RentEstimate } from './types';
import { getApartmentsByZipcode } from './apartmentData';

// Calculate the estimated rent for an apartment with given parameters
export const calculateEstimatedRent = (
  zipcode: string,
  sqft: number,
  bedrooms: number,
  bathrooms: number,
  selectedAmenities: string[]
): number => {
  // Get similar apartments in the area
  const similarApartments = getApartmentsByZipcode(zipcode, true).filter(apt => 
    Math.abs(apt.sqft - sqft) <= 200 && // Within 200 sqft
    apt.bedrooms === bedrooms &&
    apt.bathrooms === bathrooms
  );
  
  if (similarApartments.length === 0) {
    // Fallback calculation if no similar apartments found
    return 1500 + (sqft * 0.5) + (bedrooms * 300) + (bathrooms * 200);
  }
  
  // Calculate average base rent from similar apartments
  const avgBaseRent = similarApartments.reduce((sum, apt) => sum + apt.estimatedBaseRent, 0) / 
                      similarApartments.length;
  
  // Calculate average value-add for each selected amenity
  let totalAmenityValue = 0;
  
  for (const amenityName of selectedAmenities) {
    // Find apartments that have this amenity
    const aptsWithAmenity = similarApartments.filter(apt => 
      apt.amenities.some(am => am.name === amenityName)
    );
    
    if (aptsWithAmenity.length > 0) {
      // Calculate average value-add for this amenity
      const avgValueAdd = aptsWithAmenity.reduce((sum, apt) => {
        const amenity = apt.amenities.find(am => am.name === amenityName);
        return sum + (amenity ? amenity.valueAdd : 0);
      }, 0) / aptsWithAmenity.length;
      
      totalAmenityValue += avgValueAdd;
    }
  }
  
  return Math.round(avgBaseRent + totalAmenityValue);
};

// Calculate rent estimate range
export const calculateRentEstimateRange = (
  zipcode: string,
  sqft: number,
  bedrooms: number,
  bathrooms: number,
  selectedAmenities: string[]
): RentEstimate => {
  const estimatedRent = calculateEstimatedRent(zipcode, sqft, bedrooms, bathrooms, selectedAmenities);
  
  return {
    low: Math.round(estimatedRent * 0.9),
    mid: estimatedRent,
    high: Math.round(estimatedRent * 1.1)
  };
};

// Determine if current rent is below, within, or above the estimated range
export const getRentStatus = (currentRent: number, estimate: RentEstimate): 'below' | 'within' | 'above' => {
  if (currentRent < estimate.low) {
    return 'below'; // Below the estimated range
  } else if (currentRent > estimate.high) {
    return 'above'; // Above the estimated range
  } else {
    return 'within'; // Within the estimated range
  }
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};
