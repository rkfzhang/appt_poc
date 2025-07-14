import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';
import { FormDropdown } from '../components/FormDropdown';
import { AmenityCheckbox } from '../components/AmenityCheckbox';
import { useAppContext } from '../data/AppContext';
import { zipcodes } from '../data/apartmentData';
import { getBuildingAmenities, getUnitAmenities } from '../data/amenityUtils';

export const SearchPage = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, calculateEstimate } = useAppContext();
  
  // Get amenities
  const buildingAmenities = getBuildingAmenities().map((name, index) => ({ id: `b${index}`, name }));
  const unitAmenities = getUnitAmenities().map((name, index) => ({ id: `u${index}`, name }));
  
  // Local state for form values
  const [formValues, setFormValues] = useState({
    zipcode: searchParams.zipcode || zipcodes[0],
    sqft: searchParams.sqft || 700,
    currentRent: searchParams.currentRent || 2000,
    bedrooms: searchParams.bedrooms || 1,
    bathrooms: searchParams.bathrooms || 1,
    buildingAmenities: searchParams.buildingAmenities || [],
    unitAmenities: searchParams.unitAmenities || [],
  });

  // Handle input changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  // Handle amenity checkbox changes
  const handleBuildingAmenityChange = (amenityName: string, checked: boolean) => {
    const updatedAmenities = checked
      ? [...formValues.buildingAmenities, amenityName]
      : formValues.buildingAmenities.filter(name => name !== amenityName);
    
    setFormValues({
      ...formValues,
      buildingAmenities: updatedAmenities,
    });
  };

  const handleUnitAmenityChange = (amenityName: string, checked: boolean) => {
    const updatedAmenities = checked
      ? [...formValues.unitAmenities, amenityName]
      : formValues.unitAmenities.filter(name => name !== amenityName);
    
    setFormValues({
      ...formValues,
      unitAmenities: updatedAmenities,
    });
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchParams(formValues);
    calculateEstimate();
    navigate('/result');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <FormInput
            label="Zip code"
            type="text"
            value={formValues.zipcode}
            onChange={(value) => handleInputChange('zipcode', value)}
            placeholder="Enter zip code"
          />
          
          <FormInput
            label="Sq Ft"
            type="number"
            value={formValues.sqft}
            onChange={(value) => handleInputChange('sqft', value)}
            placeholder="Enter square footage"
            min={0}
          />
          
          <FormInput
            label="Current Rent"
            type="number"
            value={formValues.currentRent}
            onChange={(value) => handleInputChange('currentRent', value)}
            placeholder="Enter current rent"
            min={0}
          />
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Building amenities</h2>
          <div>
            {buildingAmenities.map((amenity) => (
              <AmenityCheckbox
                key={amenity.id}
                label={amenity.name}
                checked={formValues.buildingAmenities.includes(amenity.name)}
                onChange={(checked) => handleBuildingAmenityChange(amenity.name, checked)}
              />
            ))}
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <FormDropdown
            label="# of bedrooms"
            options={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
            ]}
            value={formValues.bedrooms}
            onChange={(value) => handleInputChange('bedrooms', value)}
          />
          
          <FormDropdown
            label="# of bathrooms"
            options={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
            ]}
            value={formValues.bathrooms}
            onChange={(value) => handleInputChange('bathrooms', value)}
          />
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Unit Amenities</h2>
          <div>
            {unitAmenities.map((amenity) => (
              <AmenityCheckbox
                key={amenity.id}
                label={amenity.name}
                checked={formValues.unitAmenities.includes(amenity.name)}
                onChange={(checked) => handleUnitAmenityChange(amenity.name, checked)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Search Button */}
      <div className="mt-8">
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};
