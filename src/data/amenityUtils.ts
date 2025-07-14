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

// Get additional value-add amenities not in the selected list
export const getAdditionalValueAddAmenities = (
  zipcode: string,
  selectedAmenities: string[]
): AmenityWithAvgValue[] => {
  // For now, a simple mapping of nearby zipcodes
  const nearbyZipcodes: Record<string, string[]> = {
    '10001': ['10002', '10003'],
    '10002': ['10001', '10003'],
    '10003': ['10001', '10002']
  };
  
  const relevantZipcodes = [zipcode, ...(nearbyZipcodes[zipcode] || [])];
  const apartmentsInArea = apartments.filter(apt => relevantZipcodes.includes(apt.zipcode));
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
  // For now, a simple mapping of nearby zipcodes
  const nearbyZipcodes: Record<string, string[]> = {
    '10001': ['10002', '10003'],
    '10002': ['10001', '10003'],
    '10003': ['10001', '10002']
  };
  
  const relevantZipcodes = [zipcode, ...(nearbyZipcodes[zipcode] || [])];
  const apartmentsInArea = apartments.filter(apt => relevantZipcodes.includes(apt.zipcode));
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
