## Key search parameters 
- Zip code - Number input (but will be restricted to a certain number of zip codes)
- Area sqft - Number input 
- Current rent - Number input
- # of bedrooms - <3 
- # of bathrooms - <3
- Building amenities (select): Swimming pool, BBQ, Doorman, Gym / Fitness center, Pets allowed, EV parking, Shared laundry, Basketball court 
- Unit amenities: In-unit laundry, Private balcony, Quartz finish, Granite Finish, Stainless Steel, Vinyl floors
- NB: the above list of amenities may be subject to change

After that there is a search bar that takes you to the next page 

## Result page
### Top 
- Left hand side is the text parameters of the inputs from the previous page: I.e 1 bedroom, 1 bathroom, 1000 sqft, doorman etc 
- On the right hand side show the low, mid, high estimates of the rent. The current rent is shown (this is the rent input in the previous page) if there is a way of color coding it to show if its below or above rent estimates

### Bottom of the page
- Flagging additional value add based off buildings in the area. This is to only include amenities that weren't selected in the previous page, and also will only show relevant amenities in the area. 
- Output to be in a table - left hand side is the amenity and the right hand side show the additional value the amenity adds 

### Notes 
- The backend will estimate the low, mid, high rent range based off the landing page inputs, as well as the value add section. 

## Outliers

- This section may or may not be shown to customers - but it is for our own reference to understand where the outliers are. 

- This will be a scatter chart - Y Axis - estimated rent: X axis estimated rent.
- Data behind this is static and is the basis of our estimation model. It has every unit that we have scrapped and it compares the rent is estimated in the model, vs the reported rent on the website 
- Filter option will allow you to select a single, or a number or all of the zip codes 

- Underneath the scatter chart there is a table of the outliers.
- This table will have the actually units from the scatter chart that are outliers
- the columns should be: Apartment building name, # of bedrooms, # of bathrooms, sq ft, Current rent, estimated rent, Delta, list of building amenities list of unit amenities, 