# Apartment Rent Planner POC - Development Notes

## Tech Stack
- React 19.1.0 with TypeScript
- React Router 7.6.3 for navigation
- Tailwind CSS 4.1.11 for styling
- Vite 7.0.4 as build tool

## Data Structure
- No backend, using placeholder data in TypeScript files
- Data files in `src/data/` directory:
  - `types.ts`: Type definitions for the application
  - `apartmentData.ts`: Apartment listings data with outlier detection and zipcode utilities (15 apartments across 8 zipcodes in 3 clusters)
  - `amenityUtils.ts`: Amenity-related data and utilities
  - `rentCalculator.ts`: Rent calculation functions
  - `AppContext.tsx`: React Context for state management

## Application Flow
1. Search page (`/`): User inputs apartment parameters and selects amenities
2. Result page (`/result`): Shows rent estimates and additional value-add amenities that can be toggled on/off
3. Outliers page (`/outliers`): Displays properties with significant rent differences

## Key Implementation Details
- Rent estimates calculated based on zipcode, size, bedrooms, bathrooms, and amenities
- Each apartment has its own specific value-add for each amenity it has
- Similar apartments in nearby zipcodes are considered when calculating rent estimates (zipcodes with the same first 3 digits are considered similar)
- Amenity value calculations also use the same zipcode prefix matching to find relevant properties in the area
- If no similar apartments are found, a "No data found" message is displayed instead of using default values
- Current rent is color-coded based on comparison to estimated range
- Outliers can be filtered by zipcode
- Estimated rent is calculated as base rent + sum of amenity value-adds
- Interactive amenity selection on the result page allows users to toggle additional amenities and see immediate rent estimate updates without affecting the original search parameters
- Amenities already selected in the search parameters are automatically filtered out from the additional amenities list to avoid duplicates
- Selected additional amenities remain visible in the table, allowing users to toggle them on and off

## Future Enhancements
- Implement actual scatter chart for outliers visualization
- Add real backend API integration
- Improve mobile responsiveness
- Add unit tests

## Known Issues
- Environment compatibility issues with Node.js versions
- Scatter chart is currently a placeholder
