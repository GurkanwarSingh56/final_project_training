# Flight API Configuration

## ✅ **API Server Status: RUNNING**

The flight search functionality is now configured to use a real API with axios.

### API Endpoint
- **URL**: `http://localhost:3001/api/search-flights` ✅ **ACTIVE**
- **Method**: POST
- **Library**: axios
- **Server**: Express.js test server running on port 3001

### Request Format
```javascript
{
  origin: "departure_city",
  destination: "destination_city", 
  earliestDepartureDate: "YYYY-MM-DD",
  latestDepartureDate: "YYYY-MM-DD",
  earliestReturnDate: "YYYY-MM-DD", // for round trips
  latestReturnDate: "YYYY-MM-DD",   // for round trips
  numAdultPassengers: 1
}
```

### Expected Response Format
```javascript
{
  flights: [
    {
      airline: ["Air India"] or "Air India",
      flight_number: ["AI-101"] or "AI-101",
      origin: "Delhi",
      destination: "Mumbai",
      departure_time: "06:00",
      arrival_time: "09:30",
      duration: "3h 30m",
      price: "₹4,500",
      flight_url: "https://booking-link.com"
    }
  ]
}
```

## Features

✅ **Real API Integration**: Calls backend API with axios  
✅ **API Only**: No mock data fallback - uses real API exclusively  
✅ **Round Trip Support**: Makes separate API calls for return flights  
✅ **Modal Display**: Results shown in modal overlay  
✅ **Rich Display**: Shows flight numbers, dates, prices, and booking links  
✅ **Error Handling**: Shows error message if API fails  

## Development Notes

1. **API URL**: Update `YOUR_BACKEND_API_URL` in `flight.jsx` to your actual backend URL
2. **No Mock Data**: System will only work with a functioning API endpoint
3. **Round Trips**: For round trips, system makes 2 API calls (outbound + return)
4. **Data Transformation**: API response is transformed to match component structure
5. **Error Handling**: Shows "Failed to fetch flights" message if API is unavailable

## Next Steps

1. Replace `http://localhost:3001/api/search-flights` with your actual API endpoint
2. Start your backend server on port 3001 (or update the URL)  
3. Test with real flight data from your API
4. Customize the request/response format as needed for your API
5. **Important**: Make sure your API is running before testing - no mock data fallback!
