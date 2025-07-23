// ===== TRAIN SEARCH API SERVICE =====
// Consolidated Train API with Mock Data
// This file contains all train-related functionality including search, booking, and schedule management

// Mock train data for testing without real APIs
const mockTrainData = [
  {
    id: 1,
    train_name: "Rajdhani Express",
    train_number: "12951",
    from: "New Delhi",
    to: "Mumbai Central",
    departure_time: "16:55",
    arrival_time: "08:35",
    duration: "15h 40m",
    distance: "1384 km",
    classes: {
      "1A": { available: 12, price: "₹4,565", waitingList: 0 },
      "2A": { available: 45, price: "₹2,885", waitingList: 0 },
      "3A": { available: 78, price: "₹2,045", waitingList: 0 },
      "SL": { available: 234, price: "₹755", waitingList: 0 }
    },
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    type: "Superfast",
    pantry: true,
    wifi: true
  },
  {
    id: 2,
    train_name: "Shatabdi Express",
    train_number: "12001",
    from: "New Delhi",
    to: "Bhopal Jn",
    departure_time: "06:00",
    arrival_time: "13:58",
    duration: "7h 58m",
    distance: "707 km",
    classes: {
      "CC": { available: 56, price: "₹1,340", waitingList: 0 },
      "EC": { available: 78, price: "₹2,540", waitingList: 0 }
    },
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    type: "Superfast",
    pantry: true,
    wifi: true
  },
  {
    id: 3,
    train_name: "Duronto Express",
    train_number: "12259",
    from: "New Delhi",
    to: "Sealdah",
    departure_time: "16:50",
    arrival_time: "10:05",
    duration: "17h 15m",
    distance: "1458 km",
    classes: {
      "1A": { available: 8, price: "₹4,865", waitingList: 0 },
      "2A": { available: 32, price: "₹3,085", waitingList: 0 },
      "3A": { available: 56, price: "₹2,185", waitingList: 0 },
      "SL": { available: 167, price: "₹815", waitingList: 0 }
    },
    days: ["Tue", "Fri", "Sun"],
    type: "Superfast",
    pantry: true,
    wifi: false
  }
];

const trainTypes = ["Superfast", "Express", "Passenger", "Local", "Special"];
const stationCodes = {
  "New Delhi": "NDLS",
  "Mumbai Central": "BCT",
  "Chennai Central": "MAS",
  "Kolkata": "HWH",
  "Bangalore": "SBC",
  "Hyderabad": "HYB",
  "Pune": "PUNE",
  "Ahmedabad": "ADI",
  "Jaipur": "JP",
  "Lucknow": "LKO"
};

const popularRoutes = [
  { from: "New Delhi", to: "Mumbai Central", distance: 1384, duration: "15h 40m" },
  { from: "New Delhi", to: "Chennai Central", distance: 2180, duration: "28h 15m" },
  { from: "New Delhi", to: "Kolkata", distance: 1458, duration: "17h 15m" },
  { from: "Mumbai Central", to: "Chennai Central", distance: 1279, duration: "21h 45m" },
  { from: "Bangalore", to: "New Delhi", distance: 2444, duration: "34h 20m" },
  { from: "Hyderabad", to: "Mumbai Central", distance: 711, duration: "13h 30m" }
];

// Generate mock trains based on search parameters
export const generateMockTrains = (from, to, date) => {
  console.log('Generating mock trains for:', { from, to, date });
  
  const trains = [];
  
  // Find route info or use defaults
  const routeInfo = popularRoutes.find(route => 
    route.from.toLowerCase().includes(from?.toLowerCase()) && 
    route.to.toLowerCase().includes(to?.toLowerCase())
  );
  
  const baseDistance = routeInfo ? routeInfo.distance : 800 + Math.floor(Math.random() * 1200);
  const baseDuration = routeInfo ? routeInfo.duration : `${Math.floor(baseDistance / 80)}h ${Math.floor(Math.random() * 60)}m`;
  
  // Generate 8-12 trains
  const trainCount = 8 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < trainCount; i++) {
    const trainNumber = `${12000 + Math.floor(Math.random() * 8000)}`;
    const trainName = `${["Rajdhani", "Shatabdi", "Duronto", "Jan Shatabdi", "Garib Rath", "Express", "Superfast"][Math.floor(Math.random() * 7)]} Express`;
    
    // Generate departure time (spread throughout the day)
    const departureHour = Math.floor(5 + (i * 18 / trainCount)); // Spread across 5 AM to 11 PM
    const departureMinute = Math.floor(Math.random() * 60);
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    
    // Calculate arrival time
    const durationHours = Math.floor(baseDistance / (60 + Math.random() * 40)); // Speed varies 60-100 km/h
    const durationMinutes = Math.floor(Math.random() * 60);
    const totalMinutes = departureHour * 60 + departureMinute + durationHours * 60 + durationMinutes;
    const arrivalHour = Math.floor(totalMinutes / 60) % 24;
    const arrivalMinute = totalMinutes % 60;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
    
    const duration = `${durationHours}h ${durationMinutes}m`;
    const type = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    
    // Generate class availability and pricing
    const classes = {};
    const availableClasses = ["SL", "3A", "2A", "1A", "CC", "EC"];
    const classCount = 2 + Math.floor(Math.random() * 4); // 2-5 classes
    
    for (let j = 0; j < classCount; j++) {
      const className = availableClasses[j];
      let basePrice = 500;
      
      switch (className) {
        case "SL": basePrice = 400 + Math.floor(baseDistance * 0.3); break;
        case "3A": basePrice = 800 + Math.floor(baseDistance * 0.6); break;
        case "2A": basePrice = 1200 + Math.floor(baseDistance * 0.9); break;
        case "1A": basePrice = 2000 + Math.floor(baseDistance * 1.5); break;
        case "CC": basePrice = 600 + Math.floor(baseDistance * 0.8); break;
        case "EC": basePrice = 1000 + Math.floor(baseDistance * 1.2); break;
      }
      
      const available = Math.floor(Math.random() * 200) + 10;
      const waitingList = Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0;
      
      classes[className] = {
        available,
        price: `₹${basePrice.toLocaleString()}`,
        waitingList
      };
    }
    
    // Generate running days
    const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const runningDays = [];
    const dayCount = 3 + Math.floor(Math.random() * 5); // 3-7 days
    
    for (let k = 0; k < dayCount; k++) {
      const day = allDays[Math.floor(Math.random() * allDays.length)];
      if (!runningDays.includes(day)) {
        runningDays.push(day);
      }
    }
    
    trains.push({
      id: `train-${i + 1}`,
      train_name: trainName,
      train_number: trainNumber,
      from: from || "New Delhi",
      to: to || "Mumbai Central",
      departure_time: departureTime,
      arrival_time: arrivalTime,
      duration: duration,
      distance: `${baseDistance} km`,
      classes: classes,
      days: runningDays.sort(),
      type: type,
      pantry: Math.random() > 0.3,
      wifi: Math.random() > 0.5,
      date: date || new Date().toISOString().split('T')[0],
      source_code: stationCodes[from] || "NDLS",
      destination_code: stationCodes[to] || "BCT",
      quota: "GN", // General quota
      travel_class: Object.keys(classes)[0] // Default class
    });
  }
  
  return trains.sort((a, b) => a.departure_time.localeCompare(b.departure_time)); // Sort by departure time
};

// ===== MAIN API FUNCTIONS =====

// Search trains with mock data
export const searchTrains = async (from, to, date) => {
  try {
    console.log('Searching trains with mock data:', { from, to, date });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate mock train data based on search parameters
    const mockTrains = generateMockTrains(from, to, date);

    return {
      success: true,
      data: mockTrains,
      message: 'Mock trains loaded successfully',
      total: mockTrains.length,
      apiStatus: 'mock',
      provider: 'Mock Railway Data Provider',
      searchParams: { from, to, date }
    };
  } catch (error) {
    console.error('Mock Railway API Error:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      message: 'Unable to load mock train data.',
      apiStatus: 'error'
    };
  }
};

// Get Live Station Data
export const getLiveStationData = async (hours = 1) => {
  try {
    console.log('Getting live station data for hours:', hours);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const stations = Object.keys(stationCodes);
    const liveData = stations.map(station => ({
      station: station,
      code: stationCodes[station],
      arrivals: Math.floor(Math.random() * 10) + 5,
      departures: Math.floor(Math.random() * 12) + 8,
      delayed: Math.floor(Math.random() * 3),
      cancelled: Math.random() > 0.9 ? 1 : 0
    }));
    
    return {
      success: true,
      data: {
        message: 'Mock live station data',
        hours: hours,
        timestamp: new Date().toISOString(),
        stations: liveData
      },
      message: 'Live station data retrieved successfully'
    };
  } catch (error) {
    console.error('Mock Railway API Error:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      message: 'Unable to get live station data'
    };
  }
};

// Book train ticket
export const bookTrain = async (trainData, passengerDetails) => {
  try {
    console.log('Booking train:', trainData, passengerDetails);
    
    // Simulate booking delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const pnr = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const bookingId = `TRN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const booking = {
      bookingId,
      pnr,
      type: 'train',
      status: 'confirmed',
      train: trainData,
      passengers: passengerDetails,
      bookingDate: new Date().toISOString(),
      journeyDate: trainData.date,
      totalAmount: trainData.price || '₹755',
      paymentStatus: 'paid',
      seat: `${Math.floor(Math.random() * 72) + 1}`,
      coach: `S${Math.floor(Math.random() * 12) + 1}`,
      quota: 'GN'
    };
    
    return {
      success: true,
      data: booking,
      message: 'Train ticket booked successfully',
      bookingId,
      pnr
    };
  } catch (error) {
    console.error('Train booking error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Train booking failed'
    };
  }
};

// Cancel train booking
export const cancelTrainBooking = async (pnr) => {
  try {
    console.log('Canceling train booking:', pnr);
    
    // Simulate cancellation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Train booking canceled successfully',
      refundAmount: '₹600', // After cancellation charges
      cancellationCharges: '₹155'
    };
  } catch (error) {
    console.error('Train cancellation error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Train cancellation failed'
    };
  }
};

// Get PNR status
export const getPNRStatus = async (pnr) => {
  try {
    console.log('Getting PNR status for:', pnr);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const statuses = ['CNF', 'WL', 'RAC', 'CAN'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      success: true,
      data: {
        pnr,
        status,
        train: `12951 Rajdhani Express`,
        date: new Date().toISOString().split('T')[0],
        passengers: [{
          name: 'John Doe',
          age: 30,
          status: status,
          seat: status === 'CNF' ? `S1-45` : 'WL-12'
        }]
      },
      message: 'PNR status retrieved successfully'
    };
  } catch (error) {
    console.error('PNR status error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Unable to get PNR status'
    };
  }
};

// Get train route
export const getTrainRoute = async (trainNumber) => {
  try {
    console.log('Getting train route for:', trainNumber);
    
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const mockStations = ['New Delhi', 'Gwalior', 'Bhopal', 'Nagpur', 'Mumbai Central'];
    const route = mockStations.map((station, index) => ({
      station,
      code: stationCodes[station] || `ST${index}`,
      arrival: index === 0 ? null : `${(8 + index * 3).toString().padStart(2, '0')}:30`,
      departure: index === mockStations.length - 1 ? null : `${(8 + index * 3 + 1).toString().padStart(2, '0')}:00`,
      distance: index * 300,
      day: Math.floor(index / 3) + 1
    }));
    
    return {
      success: true,
      data: {
        trainNumber,
        route
      },
      message: 'Train route retrieved successfully'
    };
  } catch (error) {
    console.error('Train route error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Unable to get train route'
    };
  }
};

// Export all functions
export default {
  searchTrains,
  getLiveStationData,
  bookTrain,
  cancelTrainBooking,
  getPNRStatus,
  getTrainRoute,
  generateMockTrains
};
