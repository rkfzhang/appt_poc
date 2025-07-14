# Apartment Rent Planner POC - Development Notes

## Tech Stack
- React 19.1.0 with TypeScript
- React Router 7.6.3 for navigation
- Tailwind CSS 4.1.11 for styling
- Vite 7.0.4 as build tool

## Data Structure
- No backend, using placeholder data in TypeScript files
- Data files in `src/data/` directory:
  - `apartments.ts`: Apartment listings data with outlier detection
  - `amenities.ts`: Building and unit amenities definitions
  - `valueAdd.ts`: Value-add calculations based on location/zipcode
  - `AppContext.tsx`: React Context for state management

## Application Flow
1. Search page (`/`): User inputs apartment parameters and selects amenities
2. Result page (`/result`): Shows rent estimates and additional value-add amenities
3. Outliers page (`/outliers`): Displays properties with significant rent differences

## Key Implementation Details
- Rent estimates calculated based on zipcode, size, bedrooms, bathrooms, and amenities
- Value-add varies by location (zipcode) for each amenity
- Current rent is color-coded based on comparison to estimated range
- Outliers can be filtered by zipcode

## Future Enhancements
- Implement actual scatter chart for outliers visualization
- Add real backend API integration
- Improve mobile responsiveness
- Add unit tests

## Known Issues
- Environment compatibility issues with Node.js versions
- Scatter chart is currently a placeholder
