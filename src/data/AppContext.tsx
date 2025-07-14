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
  toggleAdditionalAmenity: (amenityName: string, type: 'building' | 'unit', isSelected: boolean) => void;
  selectedAdditionalAmenities: string[];
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
  toggleAdditionalAmenity: () => {},
  selectedAdditionalAmenities: [],
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
  
  // State for selected additional amenities (separate from search params)
  const [selectedAdditionalAmenities, setSelectedAdditionalAmenities] = useState<string[]>([]);
  
  // State for selected zipcode in outliers view
  const [selectedZipcode, setSelectedZipcode] = useState<string>(zipcodes[0]);

  // Function to calculate rent estimate
  const calculateEstimate = () => {
    // Combine search params amenities and selected additional amenities
    const allSelectedAmenities = [
      ...searchParams.buildingAmenities, 
      ...searchParams.unitAmenities,
      ...selectedAdditionalAmenities
    ];
    
    const estimate = calculateRentEstimateRange(
      searchParams.zipcode,
      searchParams.sqft,
      searchParams.bedrooms,
      searchParams.bathrooms,
      allSelectedAmenities
    );
    setRentEstimate(estimate);
    
    // Only calculate additional value adds if we have an estimate
    if (estimate !== null) {
      const valueAdds = getAdditionalValueAddAmenities(
        searchParams.zipcode,
        [...searchParams.buildingAmenities, ...searchParams.unitAmenities]
      );
      
      // Filter out amenities that are already in the search parameters
      const filteredValueAdds = valueAdds.filter(amenity => 
        !(searchParams.buildingAmenities.includes(amenity.name) || 
          searchParams.unitAmenities.includes(amenity.name))
      );
      
      setAdditionalValueAdds(filteredValueAdds);
    } else {
      setAdditionalValueAdds([]);
    }
  };

  // Function to reset search
  const resetSearch = () => {
    setSearchParams(defaultSearchParams);
    setRentEstimate(null);
    setAdditionalValueAdds([]);
    setSelectedAdditionalAmenities([]);
  };

  // Function to toggle an additional amenity (add or remove) and recalculate the estimate
  const toggleAdditionalAmenity = (amenityName: string, type: 'building' | 'unit', isSelected: boolean) => {
    let updatedAdditionalAmenities = [...selectedAdditionalAmenities];
    
    if (isSelected) {
      // Add amenity if it's not already included
      if (!updatedAdditionalAmenities.includes(amenityName)) {
        updatedAdditionalAmenities = [...updatedAdditionalAmenities, amenityName];
      }
    } else {
      // Remove amenity
      updatedAdditionalAmenities = updatedAdditionalAmenities.filter(name => name !== amenityName);
    }
    
    setSelectedAdditionalAmenities(updatedAdditionalAmenities);
    
    // Combine search params amenities and selected additional amenities
    const allSelectedAmenities = [
      ...searchParams.buildingAmenities, 
      ...searchParams.unitAmenities,
      ...updatedAdditionalAmenities
    ];
    
    // Recalculate the estimate with the updated amenities
    const estimate = calculateRentEstimateRange(
      searchParams.zipcode,
      searchParams.sqft,
      searchParams.bedrooms,
      searchParams.bathrooms,
      allSelectedAmenities
    );
    setRentEstimate(estimate);
    
    // If an amenity is selected, we need to update the additionalValueAdds list
    // to remove it from the list to avoid duplicates
    if (isSelected) {
      setAdditionalValueAdds(prevValueAdds => 
        prevValueAdds.filter(item => item.name !== amenityName)
      );
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
    toggleAdditionalAmenity,
    selectedAdditionalAmenities,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
