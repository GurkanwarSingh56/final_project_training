// ===== FLIGHT API SERVICE =====
// Consolidated Flight API with Mock Data
// This file contains all flight-related functionality including search, booking, and data management

// Mock flight data for testing without real APIs
const mockFlightData = [
  {
    id: 1,
    airline: "Air India",
    flight_number: "AI-101",
    origin: "Delhi",
    destination: "Mumbai",
    departure_time: "06:00",
    arrival_time: "09:30",
    duration: "3h 30m",
    price: "₹4,500",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  },
  {
    id: 2,
    airline: "IndiGo",
    flight_number: "6E-202",
    origin: "Delhi",
    destination: "Mumbai",
    departure_time: "10:15",
    arrival_time: "13:45",
    duration: "3h 30m",
    price: "₹3,200",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  },
  {
    id: 3,
    airline: "SpiceJet",
    flight_number: "SG-303",
    origin: "Delhi",
    destination: "Mumbai",
    departure_time: "16:30",
    arrival_time: "20:00",
    duration: "3h 30m",
    price: "₹2,800",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  },
  {
    id: 4,
    airline: "Vistara",
    flight_number: "UK-404",
    origin: "Delhi",
    destination: "Mumbai",
    departure_time: "14:20",
    arrival_time: "17:50",
    duration: "3h 30m",
    price: "₹5,200",
    flight_url: "#",
    class: "business",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  },
  {
    id: 5,
    airline: "Air India",
    flight_number: "AI-505",
    origin: "Mumbai",
    destination: "Delhi",
    departure_time: "08:15",
    arrival_time: "11:45",
    duration: "3h 30m",
    price: "₹4,800",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "return"
  },
  {
    id: 6,
    airline: "IndiGo",
    flight_number: "6E-606",
    origin: "Mumbai",
    destination: "Delhi",
    departure_time: "12:30",
    arrival_time: "16:00",
    duration: "3h 30m",
    price: "₹3,500",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "return"
  },
  {
    id: 7,
    airline: "GoAir",
    flight_number: "G8-707",
    origin: "Bangalore",
    destination: "Chennai",
    departure_time: "09:45",
    arrival_time: "11:15",
    duration: "1h 30m",
    price: "₹2,200",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  },
  {
    id: 8,
    airline: "AirAsia",
    flight_number: "I5-808",
    origin: "Kolkata",
    destination: "Hyderabad",
    departure_time: "15:20",
    arrival_time: "17:30",
    duration: "2h 10m",
    price: "₹3,800",
    flight_url: "#",
    class: "economy",
    date: new Date().toISOString().split('T')[0],
    type: "outbound"
  }
];

// Additional mock data for various routes
const additionalRoutes = [
  { from: "Delhi", to: "Bangalore", duration: "2h 45m", basePrice: 3500 },
  { from: "Mumbai", to: "Chennai", duration: "2h 15m", basePrice: 4200 },
  { from: "Kolkata", to: "Pune", duration: "2h 30m", basePrice: 3800 },
  { from: "Hyderabad", to: "Goa", duration: "1h 45m", basePrice: 3200 },
  { from: "Ahmedabad", to: "Jaipur", duration: "1h 20m", basePrice: 2800 },
  { from: "Kochi", to: "Trivandrum", duration: "45m", basePrice: 2200 }
];

const airlines = [
  "Air India", "IndiGo", "SpiceJet", "Vistara", "GoAir", "AirAsia", "Jet Airways"
];

// Generate mock flights based on search parameters
export const generateMockFlights = (searchParams) => {
  const { 
    from, to, departure, destination, 
    departureDate, returnDate, 
    passengers, tripType 
  } = searchParams;
  
  // Handle both parameter formats
  const normalizedFrom = from || departure;
  const normalizedTo = to || destination;
  
  console.log('Generating mock flights for:', { 
    from: normalizedFrom, 
    to: normalizedTo, 
    departureDate, 
    returnDate, 
    passengers, 
    tripType 
  });
  
  const outboundFlights = [];
  const returnFlights = [];
  
  // Validate trip type and dates
  const isRoundTrip = tripType === 'round-trip' || tripType === 'roundtrip' || (returnDate && returnDate !== '');
  const validReturnDate = isRoundTrip && returnDate && returnDate !== departureDate;
  
  console.log('Trip analysis:', { 
    isRoundTrip, 
    validReturnDate, 
    tripType, 
    departureDate, 
    returnDate 
  });
  
  // Generate outbound flights
  const outboundCount = 6 + Math.floor(Math.random() * 4); // 6-9 flights
  for (let i = 0; i < outboundCount; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = `${airline.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const hour = Math.floor(6 + Math.random() * 16); // 6 AM to 10 PM
    const minute = Math.floor(Math.random() * 60);
    const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Calculate arrival time (add 1-5 hours)
    const flightDuration = 1 + Math.random() * 4;
    const arrivalHour = Math.floor(hour + flightDuration);
    const arrivalMinute = Math.floor(minute + (flightDuration % 1) * 60);
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
    
    const duration = `${Math.floor(flightDuration)}h ${Math.floor((flightDuration % 1) * 60)}m`;
    
    // Find route info or use defaults
    const routeInfo = additionalRoutes.find(route => 
      route.from.toLowerCase() === normalizedFrom?.toLowerCase() && 
      route.to.toLowerCase() === normalizedTo?.toLowerCase()
    );
    
    const basePrice = routeInfo ? routeInfo.basePrice : 3000 + Math.floor(Math.random() * 2000);
    const priceVariation = 0.8 + Math.random() * 0.4; // ±20% price variation
    const finalPrice = Math.floor(basePrice * priceVariation);
    
    outboundFlights.push({
      id: `outbound-${i + 1}`,
      airline,
      flight_number: flightNumber,
      origin: normalizedFrom || "Delhi",
      destination: normalizedTo || "Mumbai",
      departure_time: departureTime,
      arrival_time: arrivalTime,
      duration: routeInfo ? routeInfo.duration : duration,
      price: `₹${finalPrice.toLocaleString()}`,
      flight_url: "#",
      class: Math.random() > 0.7 ? "business" : "economy",
      date: departureDate || new Date().toISOString().split('T')[0],
      type: "outbound",
      stops: Math.random() > 0.7 ? "1 Stop" : "Non-stop",
      baggage: "15 kg included",
      refundable: Math.random() > 0.5
    });
  }
  
  // Generate return flights if round trip
  if (isRoundTrip && validReturnDate) {
    console.log('Generating return flights for round trip');
    
    const returnCount = 6 + Math.floor(Math.random() * 4); // 6-9 return flights
    for (let i = 0; i < returnCount; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = `${airline.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      
      // For return flights, prefer different times than outbound
      const hour = Math.floor(6 + Math.random() * 16);
      const minute = Math.floor(Math.random() * 60);
      const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      const flightDuration = 1 + Math.random() * 4;
      const arrivalHour = Math.floor(hour + flightDuration);
      const arrivalMinute = Math.floor(minute + (flightDuration % 1) * 60);
      const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
      
      const duration = `${Math.floor(flightDuration)}h ${Math.floor((flightDuration % 1) * 60)}m`;
      
      // Find reverse route info
      const routeInfo = additionalRoutes.find(route => 
        route.from.toLowerCase() === to?.toLowerCase() && route.to.toLowerCase() === from?.toLowerCase()
      ) || additionalRoutes.find(route => 
        route.to.toLowerCase() === normalizedTo?.toLowerCase() && 
        route.from.toLowerCase() === normalizedFrom?.toLowerCase()
      );
      
      const basePrice = routeInfo ? routeInfo.basePrice : 3000 + Math.floor(Math.random() * 2000);
      // Return flights might have different pricing (usually slightly higher)
      const returnPriceMultiplier = 0.9 + Math.random() * 0.3; // 0.9 to 1.2x
      const priceVariation = 0.8 + Math.random() * 0.4;
      const finalPrice = Math.floor(basePrice * returnPriceMultiplier * priceVariation);
      
      returnFlights.push({
        id: `return-${i + 1}`,
        airline,
        flight_number: flightNumber,
        origin: normalizedTo || "Mumbai",
        destination: normalizedFrom || "Delhi",
        departure_time: departureTime,
        arrival_time: arrivalTime,
        duration: routeInfo ? routeInfo.duration : duration,
        price: `₹${finalPrice.toLocaleString()}`,
        flight_url: "#",
        class: Math.random() > 0.7 ? "business" : "economy",
        date: returnDate,
        type: "return",
        stops: Math.random() > 0.7 ? "1 Stop" : "Non-stop",
        baggage: "15 kg included",
        refundable: Math.random() > 0.5,
        // Additional return flight info
        isReturnFlight: true,
        correspondingOutbound: `outbound-${Math.floor(Math.random() * outboundCount) + 1}`,
        layover: Math.random() > 0.8 ? `${Math.floor(1 + Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m` : null
      });
    }
    
    // Sort return flights by price for better user experience
    returnFlights.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
      const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
      return priceA - priceB;
    });
  } else if (isRoundTrip && !validReturnDate) {
    console.warn('Round trip requested but no valid return date provided');
  }
  
  // Sort outbound flights by departure time
  outboundFlights.sort((a, b) => a.departure_time.localeCompare(b.departure_time));
  
  return {
    outbound: outboundFlights,
    return: returnFlights,
    tripType: isRoundTrip ? 'round-trip' : 'one-way',
    totalFlights: outboundFlights.length + returnFlights.length
  };
};

// ===== MAIN API FUNCTIONS =====

// Search flights with mock data
export const searchFlights = async (searchParams) => {
  try {
    console.log('Searching flights with mock data:', searchParams);
    
    // Validate and normalize search parameters
    const { 
      from, to, departure, destination, 
      departureDate, returnDate, 
      passengers, tripType 
    } = searchParams;
    
    // Handle both 'from/to' and 'departure/destination' parameter formats
    const normalizedFrom = from || departure;
    const normalizedTo = to || destination;
    
    if (!normalizedFrom || !normalizedTo || !departureDate) {
      throw new Error('Missing required search parameters: origin, destination, and departure date are required');
    }
    
    // Normalize the search parameters for internal use
    const normalizedParams = {
      ...searchParams,
      from: normalizedFrom,
      to: normalizedTo,
      departure: normalizedFrom,
      destination: normalizedTo
    };
    
    const isRoundTrip = tripType === 'round-trip' || tripType === 'roundtrip' || (returnDate && returnDate !== '');
    
    if (isRoundTrip && (!returnDate || returnDate === departureDate)) {
      throw new Error('Valid return date is required for round trip flights');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock flight data based on normalized search parameters
    const mockResults = generateMockFlights(normalizedParams);
    const allFlights = [...mockResults.outbound, ...mockResults.return];

    // Calculate total price for round trip combinations
    let flightCombinations = [];
    if (isRoundTrip && mockResults.return.length > 0) {
      // Create combinations for round trips
      mockResults.outbound.forEach(outbound => {
        mockResults.return.forEach(returnFlight => {
          const outboundPrice = parseInt(outbound.price.replace(/[₹,]/g, ''));
          const returnPrice = parseInt(returnFlight.price.replace(/[₹,]/g, ''));
          const totalPrice = outboundPrice + returnPrice;
          
          flightCombinations.push({
            id: `combo-${outbound.id}-${returnFlight.id}`,
            outbound,
            return: returnFlight,
            totalPrice: `₹${totalPrice.toLocaleString()}`,
            savings: Math.random() > 0.7 ? `₹${Math.floor(totalPrice * 0.05).toLocaleString()}` : null,
            type: 'round-trip'
          });
        });
      });
      
      // Sort combinations by total price
      flightCombinations.sort((a, b) => {
        const priceA = parseInt(a.totalPrice.replace(/[₹,]/g, ''));
        const priceB = parseInt(b.totalPrice.replace(/[₹,]/g, ''));
        return priceA - priceB;
      });
    }

    return {
      success: true,
      data: allFlights,
      outbound: mockResults.outbound,
      return: mockResults.return,
      combinations: flightCombinations,
      tripType: mockResults.tripType,
      message: isRoundTrip ? 
        `Mock flights loaded successfully for round trip (${mockResults.outbound.length} outbound, ${mockResults.return.length} return)` :
        `Mock flights loaded successfully for one-way trip (${mockResults.outbound.length} flights)`,
      apiStatus: 'mock',
      provider: 'Mock Flight Data Provider',
      total: allFlights.length,
      totalCombinations: flightCombinations.length,
      searchParams: {
        ...searchParams,
        processedTripType: mockResults.tripType
      }
    };
  } catch (error) {
    console.error('Mock Flight API Error:', error);
    
    return {
      success: false,
      error: `Mock Flight API Error: ${error.message}`,
      data: [],
      message: 'Unable to load mock flight data.',
      apiStatus: 'error'
    };
  }
};

// Get flight details by ID
export const getFlightDetails = async (flightId) => {
  try {
    console.log('Getting flight details for ID:', flightId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find flight in mock data or generate details
    let flightDetails = mockFlightData.find(flight => flight.id === flightId);
    
    if (!flightDetails) {
      // Generate mock details for dynamic flights
      flightDetails = {
        id: flightId,
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        flight_number: `${flightId.toString().toUpperCase()}`,
        status: 'Available',
        aircraft: 'Boeing 737',
        terminal: Math.floor(1 + Math.random() * 3),
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(1 + Math.random() * 20)}`,
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Power Outlets'],
        baggage: {
          carry_on: '7 kg',
          checked: '15 kg',
          additional: '₹500 per kg'
        }
      };
    }
    
    return {
      success: true,
      data: flightDetails,
      message: 'Flight details retrieved successfully'
    };
  } catch (error) {
    console.error('Mock Flight Details Error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
      message: 'Unable to get flight details'
    };
  }
};

// Book flight (mock booking)
export const bookFlight = async (flightData, passengerDetails) => {
  try {
    console.log('Booking flight:', flightData, passengerDetails);
    
    // Simulate booking delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bookingId = `FL${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const pnr = `${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const booking = {
      bookingId,
      pnr,
      type: 'flight',
      status: 'confirmed',
      flight: flightData,
      passengers: passengerDetails,
      bookingDate: new Date().toISOString(),
      totalAmount: flightData.price,
      paymentStatus: 'paid'
    };
    
    return {
      success: true,
      data: booking,
      message: 'Flight booked successfully',
      bookingId,
      pnr
    };
  } catch (error) {
    console.error('Flight booking error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Flight booking failed'
    };
  }
};

// Book round trip flights (both outbound and return)
export const bookRoundTripFlight = async (flightCombination, passengerDetails) => {
  try {
    console.log('Booking round trip flights:', flightCombination, passengerDetails);
    
    // Simulate booking delay for round trip
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const bookingId = `RT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const outboundPNR = `${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const returnPNR = `${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const booking = {
      bookingId,
      type: 'round-trip-flight',
      status: 'confirmed',
      outbound: {
        flight: flightCombination.outbound,
        pnr: outboundPNR,
        status: 'confirmed'
      },
      return: {
        flight: flightCombination.return,
        pnr: returnPNR,
        status: 'confirmed'
      },
      passengers: passengerDetails,
      bookingDate: new Date().toISOString(),
      totalAmount: flightCombination.totalPrice,
      savings: flightCombination.savings,
      paymentStatus: 'paid',
      combinationId: flightCombination.id
    };
    
    return {
      success: true,
      data: booking,
      message: 'Round trip flights booked successfully',
      bookingId,
      outboundPNR,
      returnPNR
    };
  } catch (error) {
    console.error('Round trip flight booking error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Round trip flight booking failed'
    };
  }
};

// Cancel flight booking
export const cancelFlightBooking = async (bookingId) => {
  try {
    console.log('Canceling flight booking:', bookingId);
    
    // Simulate cancellation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Flight booking canceled successfully',
      refundAmount: '₹2,500', // Mock refund amount
      cancellationFee: '₹500'
    };
  } catch (error) {
    console.error('Flight cancellation error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Flight cancellation failed'
    };
  }
};

// Get popular destinations
export const getPopularDestinations = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const destinations = [
      { city: 'Mumbai', code: 'BOM', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Delhi', code: 'DEL', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Bangalore', code: 'BLR', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Chennai', code: 'MAA', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Kolkata', code: 'CCU', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Hyderabad', code: 'HYD', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Pune', code: 'PNQ', country: 'India', image: '/api/placeholder/300/200' },
      { city: 'Goa', code: 'GOI', country: 'India', image: '/api/placeholder/300/200' }
    ];
    
    return {
      success: true,
      data: destinations,
      message: 'Popular destinations loaded successfully'
    };
  } catch (error) {
    console.error('Error getting popular destinations:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Get best round trip deals
export const getBestRoundTripDeals = async (searchParams) => {
  try {
    console.log('Getting best round trip deals for:', searchParams);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate flights and find best combinations
    const mockResults = generateMockFlights({ ...searchParams, tripType: 'round-trip' });
    
    if (mockResults.return.length === 0) {
      return {
        success: false,
        message: 'No return flights available for the selected route',
        data: []
      };
    }
    
    // Find best deals (lowest total price, shortest total duration, etc.)
    const deals = [];
    
    // Best price combination
    let bestPrice = Infinity;
    let bestPriceCombination = null;
    
    // Best duration combination
    let bestDuration = Infinity;
    let bestDurationCombination = null;
    
    mockResults.outbound.forEach(outbound => {
      mockResults.return.forEach(returnFlight => {
        const outboundPrice = parseInt(outbound.price.replace(/[₹,]/g, ''));
        const returnPrice = parseInt(returnFlight.price.replace(/[₹,]/g, ''));
        const totalPrice = outboundPrice + returnPrice;
        
        // Calculate total duration in minutes
        const outboundDurationMinutes = convertDurationToMinutes(outbound.duration);
        const returnDurationMinutes = convertDurationToMinutes(returnFlight.duration);
        const totalDuration = outboundDurationMinutes + returnDurationMinutes;
        
        const combination = {
          id: `deal-${outbound.id}-${returnFlight.id}`,
          outbound,
          return: returnFlight,
          totalPrice: `₹${totalPrice.toLocaleString()}`,
          totalDuration: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
          savings: Math.floor(totalPrice * 0.03) // 3% savings for deals
        };
        
        if (totalPrice < bestPrice) {
          bestPrice = totalPrice;
          bestPriceCombination = { ...combination, dealType: 'Best Price' };
        }
        
        if (totalDuration < bestDuration) {
          bestDuration = totalDuration;
          bestDurationCombination = { ...combination, dealType: 'Shortest Duration' };
        }
      });
    });
    
    if (bestPriceCombination) deals.push(bestPriceCombination);
    if (bestDurationCombination && bestDurationCombination.id !== bestPriceCombination?.id) {
      deals.push(bestDurationCombination);
    }
    
    // Add a few more random good deals
    const randomDeals = mockResults.outbound.slice(0, 3).map((outbound, index) => {
      const returnFlight = mockResults.return[index] || mockResults.return[0];
      const outboundPrice = parseInt(outbound.price.replace(/[₹,]/g, ''));
      const returnPrice = parseInt(returnFlight.price.replace(/[₹,]/g, ''));
      const totalPrice = outboundPrice + returnPrice;
      
      return {
        id: `deal-random-${index}`,
        outbound,
        return: returnFlight,
        totalPrice: `₹${totalPrice.toLocaleString()}`,
        dealType: ['Great Value', 'Popular Choice', 'Recommended'][index],
        savings: Math.floor(totalPrice * (0.02 + Math.random() * 0.03)) // 2-5% savings
      };
    });
    
    deals.push(...randomDeals);
    
    return {
      success: true,
      data: deals,
      message: `Found ${deals.length} best round trip deals`,
      searchParams
    };
  } catch (error) {
    console.error('Error getting round trip deals:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Helper function to convert duration string to minutes
const convertDurationToMinutes = (duration) => {
  const match = duration.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0;
};

// Export all functions
export default {
  searchFlights,
  getFlightDetails,
  bookFlight,
  bookRoundTripFlight,
  cancelFlightBooking,
  getPopularDestinations,
  getBestRoundTripDeals,
  generateMockFlights
};
