import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { zipcodes } from './apartmentData';
import { getBuildingAmenities, getUnitAmenities, getAdditionalValueAddAmenities } from './amenityUtils';
import { calculateRentEstimateRange } from './rentCalculator';
import type { RentEstimate, AmenityWithAvgValue } from './types';

// Define the search parameters interface
export interface SearchParams {
  zipcode: string;
  sqft: number;
  currentRent: number;
  bedrooms: number;
  bathrooms: number;
  buildingAmenities: string[];
  unitAmenities: string[];
}

// Define the context interface
interface AppContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  rentEstimate: RentEstimate | null;
  calculateEstimate: () => void;
  additionalValueAdds: AmenityWithAvgValue[];
  resetSearch: () => void;
  selectedZipcode: string;
  setSelectedZipcode: (zipcode: string) => void;
  toggleAmenity: (amenityName: string, type: 'building' | 'unit', isSelected: boolean) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  searchParams: {
    zipcode: '',
    sqft: 0,
    currentRent: 0,
    bedrooms: 1,
    bathrooms: 1,
    buildingAmenities: [],
    unitAmenities: [],
  },
  setSearchParams: () => {},
  rentEstimate: null,
  calculateEstimate: () => {},
  additionalValueAdds: [],
  resetSearch: () => {},
  selectedZipcode: '',
  setSelectedZipcode: () => {},
  toggleAmenity: () => {},
});

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Default search parameters
  const defaultSearchParams: SearchParams = {
    zipcode: zipcodes[0],
    sqft: 700,
    currentRent: 2000,
    bedrooms: 1,
    bathrooms: 1,
    buildingAmenities: [],
    unitAmenities: [],
  };

  // Get all available amenities
  const buildingAmenities = getBuildingAmenities();
  const unitAmenities = getUnitAmenities();

  // State for search parameters
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  
  // State for rent estimate
  const [rentEstimate, setRentEstimate] = useState<RentEstimate | null>(null);
  
  // State for additional value adds
  const [additionalValueAdds, setAdditionalValueAdds] = useState<AmenityWithAvgValue[]>([]);
  
  // State for selected zipcode in outliers view
  const [selectedZipcode, setSelectedZipcode] = useState<string>(zipcodes[0]);

  // Function to calculate rent estimate
  const calculateEstimate = () => {
    const estimate = calculateRentEstimateRange(
      searchParams.zipcode,
      searchParams.sqft,
      searchParams.bedrooms,
      searchParams.bathrooms,
      [...searchParams.buildingAmenities, ...searchParams.unitAmenities]
    );
    setRentEstimate(estimate);
    
    // Only calculate additional value adds if we have an estimate
    if (estimate !== null) {
      const valueAdds = getAdditionalValueAddAmenities(
        searchParams.zipcode,
        [...searchParams.buildingAmenities, ...searchParams.unitAmenities]
      );
      setAdditionalValueAdds(valueAdds);
    } else {
      setAdditionalValueAdds([]);
    }
  };

  // Function to reset search
  const resetSearch = () => {
    setSearchParams(defaultSearchParams);
    setRentEstimate(null);
    setAdditionalValueAdds([]);
  };

  // Function to toggle an amenity (add or remove) and recalculate the estimate
  const toggleAmenity = (amenityName: string, type: 'building' | 'unit', isSelected: boolean) => {
    const updatedParams = { ...searchParams };
    
    if (type === 'building') {
      if (isSelected) {
        // Add amenity if it's not already included
        if (!updatedParams.buildingAmenities.includes(amenityName)) {
          updatedParams.buildingAmenities = [...updatedParams.buildingAmenities, amenityName];
        }
      } else {
        // Remove amenity
        updatedParams.buildingAmenities = updatedParams.buildingAmenities.filter(
          name => name !== amenityName
        );
      }
    } else {
      if (isSelected) {
        // Add amenity if it's not already included
        if (!updatedParams.unitAmenities.includes(amenityName)) {
          updatedParams.unitAmenities = [...updatedParams.unitAmenities, amenityName];
        }
      } else {
        // Remove amenity
        updatedParams.unitAmenities = updatedParams.unitAmenities.filter(
          name => name !== amenityName
        );
      }
    }
    
    setSearchParams(updatedParams);
    
    // Recalculate the estimate with the updated amenities
    const estimate = calculateRentEstimateRange(
      updatedParams.zipcode,
      updatedParams.sqft,
      updatedParams.bedrooms,
      updatedParams.bathrooms,
      [...updatedParams.buildingAmenities, ...updatedParams.unitAmenities]
    );
    setRentEstimate(estimate);
    
    // Update additional value adds
    if (estimate !== null) {
      const valueAdds = getAdditionalValueAddAmenities(
        updatedParams.zipcode,
        [...updatedParams.buildingAmenities, ...updatedParams.unitAmenities]
      );
      setAdditionalValueAdds(valueAdds);
    }
  };

  // Context value
  const contextValue: AppContextType = {
    searchParams,
    setSearchParams,
    rentEstimate,
    calculateEstimate,
    additionalValueAdds,
    resetSearch,
    selectedZipcode,
    setSelectedZipcode,
    toggleAmenity,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
