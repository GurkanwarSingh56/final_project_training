// ===== HOTEL API SERVICE =====
// Consolidated Hotel API with Mock Data
// This file contains all hotel-related functionality including search, booking, and data management

// Mock hotel data for testing without real APIs
const mockHotelData = [
  {
    id: 1,
    name: "The Grand Palace Hotel",
    location: "Central Business District",
    rating: 4.5,
    price: "₹6,500",
    originalPrice: "₹8,500",
    discount: "24% off",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa", "Room Service"],
    description: "Luxury hotel in the heart of the city",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    availability: "Available",
    roomType: "Deluxe Room",
    checkIn: "",
    checkOut: ""
  },
  {
    id: 2,
    name: "Heritage Royal Inn",
    location: "Heritage Quarter",
    rating: 4.2,
    price: "₹4,200",
    originalPrice: "₹5,500",
    discount: "24% off",
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Heritage Tours"],
    description: "Charming heritage hotel with traditional architecture",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    availability: "Available",
    roomType: "Heritage Suite",
    checkIn: "",
    checkOut: ""
  },
  {
    id: 3,
    name: "Business Express Hotel",
    location: "Airport Road",
    rating: 4.0,
    price: "₹3,800",
    originalPrice: "₹4,800",
    discount: "21% off",
    amenities: ["WiFi", "Business Center", "Airport Shuttle", "Gym", "Restaurant"],
    description: "Perfect for business travelers",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    availability: "Available",
    roomType: "Business Room",
    checkIn: "",
    checkOut: ""
  },
  {
    id: 4,
    name: "Seaside Resort & Spa",
    location: "Beach Front",
    rating: 4.7,
    price: "₹8,200",
    originalPrice: "₹10,500",
    discount: "22% off",
    amenities: ["WiFi", "Beach Access", "Spa", "Pool", "Water Sports", "Restaurant"],
    description: "Luxury beachfront resort with stunning ocean views",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    availability: "Available",
    roomType: "Ocean View Suite",
    checkIn: "",
    checkOut: ""
  },
  {
    id: 5,
    name: "Mountain View Lodge",
    location: "Hill Station",
    rating: 4.3,
    price: "₹5,500",
    originalPrice: "₹7,200",
    discount: "24% off",
    amenities: ["WiFi", "Mountain View", "Fireplace", "Hiking Trails", "Restaurant"],
    description: "Cozy lodge with panoramic mountain views",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    availability: "Available",
    roomType: "Mountain Suite",
    checkIn: "",
    checkOut: ""
  }
];

const hotelChains = [
  "Taj Hotels", "ITC Hotels", "Oberoi Hotels", "Leela Palaces", "Radisson", "Hyatt", "Marriott", "Hilton"
];

const amenitiesPool = [
  "WiFi", "Pool", "Gym", "Restaurant", "Spa", "Room Service", "Parking", "Business Center",
  "Airport Shuttle", "Beach Access", "Garden", "Bar", "Conference Rooms", "Laundry",
  "Concierge", "Pet Friendly", "24/7 Front Desk", "Elevator", "AC", "Balcony"
];

const roomTypes = [
  "Standard Room", "Deluxe Room", "Suite", "Executive Room", "Presidential Suite",
  "Family Room", "Twin Room", "Single Room", "Penthouse", "Villa"
];

// Generate mock hotels based on search parameters
export const generateMockHotels = (searchParams) => {
  const { destination, checkIn, checkOut, guests, rooms } = searchParams;
  
  console.log('Generating mock hotels for:', { destination, checkIn, checkOut, guests, rooms });
  
  const hotels = [];
  
  // Generate 8-12 hotels
  const hotelCount = 8 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < hotelCount; i++) {
    const basePrice = 2000 + Math.floor(Math.random() * 8000);
    const discount = 15 + Math.floor(Math.random() * 25); // 15-40% discount
    const originalPrice = Math.floor(basePrice / (1 - discount / 100));
    
    const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
    const amenityCount = 4 + Math.floor(Math.random() * 6); // 4-10 amenities
    const selectedAmenities = [];
    
    // Select random amenities
    while (selectedAmenities.length < amenityCount) {
      const amenity = amenitiesPool[Math.floor(Math.random() * amenitiesPool.length)];
      if (!selectedAmenities.includes(amenity)) {
        selectedAmenities.push(amenity);
      }
    }
    
    const chain = hotelChains[Math.floor(Math.random() * hotelChains.length)];
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    
    hotels.push({
      id: `hotel-${i + 1}`,
      name: `${chain} ${destination || 'City'} ${roomType.includes('Suite') ? 'Suites' : 'Hotel'}`,
      location: destination || "City Center",
      rating: Math.round(rating * 10) / 10,
      price: `₹${basePrice.toLocaleString()}`,
      originalPrice: `₹${originalPrice.toLocaleString()}`,
      discount: `${discount}% off`,
      amenities: selectedAmenities,
      description: `Premium ${roomType.toLowerCase()} accommodation in ${destination || 'the city'}`,
      image: `https://images.unsplash.com/photo-${1566073771259 + i}?w=400`,
      availability: Math.random() > 0.1 ? "Available" : "Limited Availability",
      roomType,
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      guests: guests || 2,
      rooms: rooms || 1,
      cancellation: Math.random() > 0.3 ? "Free Cancellation" : "Non-Refundable",
      breakfast: Math.random() > 0.5 ? "Breakfast Included" : "Breakfast Available",
      distance: `${(Math.random() * 10).toFixed(1)} km from city center`
    });
  }
  
  return hotels.sort((a, b) => b.rating - a.rating); // Sort by rating
};

// ===== MAIN API FUNCTIONS =====

// Search hotels with mock data
export const searchHotels = async (searchParams) => {
  try {
    console.log('Searching hotels with mock data:', searchParams);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock hotel data based on search parameters
    const mockHotels = generateMockHotels(searchParams);

    return {
      success: true,
      data: mockHotels,
      message: 'Mock hotels loaded successfully',
      total: mockHotels.length,
      apiStatus: 'mock',
      provider: 'Mock Hotel Data Provider',
      searchParams
    };
  } catch (error) {
    console.error('Mock Hotel API Error:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      message: 'Unable to load mock hotel data.',
      apiStatus: 'error'
    };
  }
};

// Get hotel details by ID
export const getHotelDetails = async (hotelId) => {
  try {
    console.log('Getting hotel details for ID:', hotelId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find hotel in mock data or generate details
    let hotelDetails = mockHotelData.find(hotel => hotel.id === hotelId);
    
    if (!hotelDetails) {
      // Generate mock details for dynamic hotels
      hotelDetails = {
        id: hotelId,
        name: `Hotel ${hotelId}`,
        location: 'City Center',
        rating: 4.0 + Math.random(),
        price: `₹${(3000 + Math.floor(Math.random() * 5000)).toLocaleString()}`,
        availability: 'Available',
        roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
        amenities: amenitiesPool.slice(0, 6),
        policies: {
          checkIn: '2:00 PM',
          checkOut: '11:00 AM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          pets: 'Pets allowed with additional fee',
          smoking: 'Non-smoking property'
        }
      };
    }
    
    return {
      success: true,
      data: hotelDetails,
      message: 'Hotel details retrieved successfully'
    };
  } catch (error) {
    console.error('Mock Hotel Details Error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
      message: 'Unable to get hotel details'
    };
  }
};

// Book hotel (mock booking)
export const bookHotel = async (hotelData, guestDetails) => {
  try {
    console.log('Booking hotel:', hotelData, guestDetails);
    
    // Simulate booking delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bookingId = `HT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const confirmationNumber = `${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const booking = {
      bookingId,
      confirmationNumber,
      type: 'hotel',
      status: 'confirmed',
      hotel: hotelData,
      guests: guestDetails,
      bookingDate: new Date().toISOString(),
      totalAmount: hotelData.price,
      paymentStatus: 'paid',
      checkIn: hotelData.checkIn,
      checkOut: hotelData.checkOut
    };
    
    return {
      success: true,
      data: booking,
      message: 'Hotel booked successfully',
      bookingId,
      confirmationNumber
    };
  } catch (error) {
    console.error('Hotel booking error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Hotel booking failed'
    };
  }
};

// Cancel hotel booking
export const cancelHotelBooking = async (bookingId) => {
  try {
    console.log('Canceling hotel booking:', bookingId);
    
    // Simulate cancellation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Hotel booking canceled successfully',
      refundAmount: '₹4,200',
      cancellationFee: '₹0' // Free cancellation
    };
  } catch (error) {
    console.error('Hotel cancellation error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Hotel cancellation failed'
    };
  }
};

// Get hotel amenities
export const getHotelAmenities = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      data: amenitiesPool,
      message: 'Hotel amenities loaded successfully'
    };
  } catch (error) {
    console.error('Error getting hotel amenities:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Export all functions
export default {
  searchHotels,
  getHotelDetails,
  bookHotel,
  cancelHotelBooking,
  getHotelAmenities,
  generateMockHotels
};
