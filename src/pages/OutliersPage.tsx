import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../data/AppContext';
import { getOutliers, zipcodes } from '../data/apartmentData';
import type { Apartment } from '../data/types';

export const OutliersPage = () => {
  const navigate = useNavigate();
  const { selectedZipcode, setSelectedZipcode } = useAppContext();
  const [outliers, setOutliers] = useState<Apartment[]>([]);
  
  // Get outliers based on selected zipcode
  useEffect(() => {
    const allOutliers = getOutliers(200);
    const filteredOutliers = selectedZipcode === 'all' 
      ? allOutliers 
      : allOutliers.filter(apt => apt.zipcode === selectedZipcode);
    setOutliers(filteredOutliers);
  }, [selectedZipcode]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total estimated rent (base + amenities)
  const calculateTotalEstimatedRent = (apartment: Apartment): number => {
    const amenitiesValue = apartment.amenities.reduce((sum, amenity) => sum + amenity.valueAdd, 0);
    return apartment.estimatedBaseRent + amenitiesValue;
  };

  // Calculate delta between current and estimated rent
  const calculateDelta = (current: number, estimated: number) => {
    const delta = current - estimated;
    const formattedDelta = formatCurrency(Math.abs(delta));
    return delta >= 0 ? `+${formattedDelta}` : `-${formattedDelta}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Finding Outliers / Opportunities</h1>
      
      {/* Zipcode Filter */}
      <div className="mb-8">
        <p className="text-sm text-red-500 mb-1">This data is only for our use</p>
        <div className="w-64">
          <select
            value={selectedZipcode}
            onChange={(e) => setSelectedZipcode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="all">All Zipcodes</option>
            {zipcodes.map((zipcode) => (
              <option key={zipcode} value={zipcode}>
                {zipcode}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Scatter Chart Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Outliers</h2>
        <div className="bg-gray-100 border rounded-lg p-4 h-64 flex items-center justify-center">
          <p className="text-gray-500">
            Scatter chart would be displayed here showing estimated rent vs. actual rent.
            <br />
            Points above the diagonal line are overpriced, points below are underpriced.
          </p>
        </div>
      </div>
      
      {/* Outliers Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Outliers - detail</h2>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apartment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # of bedrooms / bathrooms
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current rent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated rent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delta
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {outliers.map((apartment) => (
                <tr key={apartment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>{apartment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {apartment.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {apartment.bedrooms} bed / {apartment.bathrooms} bath
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(apartment.currentRent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(calculateTotalEstimatedRent(apartment))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={apartment.currentRent > calculateTotalEstimatedRent(apartment) ? 'text-red-600' : 'text-green-600'}>
                      {calculateDelta(apartment.currentRent, calculateTotalEstimatedRent(apartment))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/result')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Results
        </button>
      </div>
    </div>
  );
};
