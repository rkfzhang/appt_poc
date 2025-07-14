// Amenity utilities and data
import type { AmenityWithAvgValue } from './types';
import { apartments } from './apartmentData';

// List of all possible amenities for reference and UI
export const allAmenities = {
  building: [
    'Swimming Pool',
    'BBQ / Grill',
    'Doorman',
    'Gym / Fitness Center',
    'Pets Allowed',
    'EV Parking',
    'Shared Laundry',
    'Basketball Court'
  ],
  unit: [
    'In-unit Laundry',
    'Private Balcony',
    'Quartz',
    'Granite',
    'Vinyl Flooring',
    'Stainless Steel'
  ]
};

// Get building amenities
export const getBuildingAmenities = (): string[] => {
  return allAmenities.building;
};

// Get unit amenities
export const getUnitAmenities = (): string[] => {
  return allAmenities.unit;
};

// Helper function to get apartments in the same area (matching first 3 digits of zipcode)
const getApartmentsInSameArea = (zipcode: string): typeof apartments => {
  // Get the first 3 digits of the zipcode to find similar areas
  const zipPrefix = zipcode.substring(0, 3);
  
  // Find all apartments where the first 3 digits of the zipcode match
  return apartments.filter(apt => apt.zipcode.substring(0, 3) === zipPrefix);
};

// Get additional value-add amenities not in the selected list
export const getAdditionalValueAddAmenities = (
  zipcode: string,
  selectedAmenities: string[]
): AmenityWithAvgValue[] => {
  const apartmentsInArea = getApartmentsInSameArea(zipcode);
  const result: AmenityWithAvgValue[] = [];
  
  // Get all amenities in the area that aren't in the selected list
  const allAreaAmenities = new Set<string>();
  apartmentsInArea.forEach(apt => {
    apt.amenities.forEach(am => {
      if (!selectedAmenities.includes(am.name)) {
        allAreaAmenities.add(am.name);
      }
    });
  });
  
  // Calculate average value-add for each additional amenity
  allAreaAmenities.forEach(amenityName => {
    const aptsWithAmenity = apartmentsInArea.filter(apt => 
      apt.amenities.some(am => am.name === amenityName)
    );
    
    if (aptsWithAmenity.length > 0) {
      // Calculate average value-add
      const totalValueAdd = aptsWithAmenity.reduce((sum, apt) => {
        const amenity = apt.amenities.find(am => am.name === amenityName);
        return sum + (amenity ? amenity.valueAdd : 0);
      }, 0);
      
      const avgValueAdd = totalValueAdd / aptsWithAmenity.length;
      const amenityType = aptsWithAmenity[0].amenities.find(am => am.name === amenityName)?.type || 'building';
      
      result.push({
        name: amenityName,
        type: amenityType,
        avgValueAdd: Math.round(avgValueAdd)
      });
    }
  });
  
  // Sort by average value-add (highest first)
  return result.sort((a, b) => b.avgValueAdd - a.avgValueAdd);
};

// Get all amenities in the area (including those already selected)
export const getAllAmenitiesInArea = (zipcode: string): AmenityWithAvgValue[] => {
  const apartmentsInArea = getApartmentsInSameArea(zipcode);
  const result: AmenityWithAvgValue[] = [];
  
  // Get all amenities in the area
  const allAreaAmenities = new Set<string>();
  apartmentsInArea.forEach(apt => {
    apt.amenities.forEach(am => {
      allAreaAmenities.add(am.name);
    });
  });
  
  // Calculate average value-add for each amenity
  allAreaAmenities.forEach(amenityName => {
    const aptsWithAmenity = apartmentsInArea.filter(apt => 
      apt.amenities.some(am => am.name === amenityName)
    );
    
    if (aptsWithAmenity.length > 0) {
      // Calculate average value-add
      const totalValueAdd = aptsWithAmenity.reduce((sum, apt) => {
        const amenity = apt.amenities.find(am => am.name === amenityName);
        return sum + (amenity ? amenity.valueAdd : 0);
      }, 0);
      
      const avgValueAdd = totalValueAdd / aptsWithAmenity.length;
      const amenityType = aptsWithAmenity[0].amenities.find(am => am.name === amenityName)?.type || 'building';
      
      result.push({
        name: amenityName,
        type: amenityType,
        avgValueAdd: Math.round(avgValueAdd)
      });
    }
  });
  
  // Sort by average value-add (highest first)
  return result.sort((a, b) => b.avgValueAdd - a.avgValueAdd);
};
