import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../data/AppContext';
import { AmenityCheckbox } from '../components/AmenityCheckbox';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { searchParams, rentEstimate, additionalValueAdds, toggleAdditionalAmenity, selectedAdditionalAmenities } = useAppContext();

  // Check if we have rent estimate data
  if (!rentEstimate) {
    // Instead of redirecting, we'll show a message
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No similar apartments found for the selected criteria. Please try different parameters.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Parameters</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Zipcode:</span> {searchParams.zipcode}</p>
            <p><span className="font-semibold">Bedrooms:</span> {searchParams.bedrooms}</p>
            <p><span className="font-semibold">Bathrooms:</span> {searchParams.bathrooms}</p>
            <p><span className="font-semibold">Building amenities:</span> {searchParams.buildingAmenities.join(', ') || 'None'}</p>
            <p><span className="font-semibold">Unit amenities:</span> {searchParams.unitAmenities.join(', ') || 'None'}</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Search
        </button>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Determine if current rent is below, within, or above the estimated range
  const getRentStatus = () => {
    if (searchParams.currentRent < rentEstimate.low) {
      return 'below'; // Below the estimated range
    } else if (searchParams.currentRent > rentEstimate.high) {
      return 'above'; // Above the estimated range
    } else {
      return 'within'; // Within the estimated range
    }
  };

  const rentStatus = getRentStatus();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Search Parameters */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Search Parameters</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Zipcode:</span> {searchParams.zipcode}</p>
            <p><span className="font-semibold">Bedrooms:</span> {searchParams.bedrooms}</p>
            <p><span className="font-semibold">Bathrooms:</span> {searchParams.bathrooms}</p>
            <p><span className="font-semibold">Building amenities:</span> {searchParams.buildingAmenities.join(', ') || 'None'}</p>
            <p><span className="font-semibold">Unit amenities:</span> {searchParams.unitAmenities.join(', ') || 'None'}</p>
          </div>
        </div>

        {/* Right Column - Rent Estimate */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Current Rent</h2>
            <p className={`text-xl ${
              rentStatus === 'below' ? 'text-green-600' : 
              rentStatus === 'above' ? 'text-red-600' : 
              'text-blue-600'
            }`}>
              {formatCurrency(searchParams.currentRent)}
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-2">Rent Estimate</h2>
          <p className="text-sm text-gray-500 mb-4">Output</p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-b py-4">
            <div>
              <p className="text-sm text-gray-500">Low</p>
              <p className="text-lg">{formatCurrency(rentEstimate.low)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mid</p>
              <p className="text-lg">{formatCurrency(rentEstimate.mid)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">High</p>
              <p className="text-lg">{formatCurrency(rentEstimate.high)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Value Add Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Additional Value add based off buildings in the area</h2>
        <p className="text-sm text-gray-500 mb-4">Select or unselect amenities to see how they affect the rent estimate</p>
        
        {additionalValueAdds.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenity</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value Add</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Include</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {additionalValueAdds.map((item, index) => {
                  // Check if this amenity is already selected in the additional amenities
                  const isSelected = selectedAdditionalAmenities.includes(item.name);
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.type === 'building' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type === 'building' ? 'Building' : 'Unit'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">{formatCurrency(item.avgValueAdd)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center">
                          <AmenityCheckbox
                            label=""
                            checked={isSelected}
                            onChange={(checked) => toggleAdditionalAmenity(item.name, item.type, checked)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No additional value-add amenities available for this location.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Search
        </button>
        <button
          onClick={() => navigate('/outliers')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Outliers
        </button>
      </div>
    </div>
  );
};
