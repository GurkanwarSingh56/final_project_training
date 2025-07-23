// ===== API SERVICES INDEX =====
// Consolidated exports for all API services
// This file provides a single import point for all API functionality

// Flight API
export {
  searchFlights,
  getFlightDetails,
  bookFlight,
  bookRoundTripFlight,
  cancelFlightBooking,
  getPopularDestinations,
  getBestRoundTripDeals,
  generateMockFlights
} from './flightAPI.js'

// Hotel API
export {
  searchHotels,
  getHotelDetails,
  bookHotel,
  cancelHotelBooking,
  getHotelAmenities,
  generateMockHotels
} from './hotelAPI.js'

// Train API
export {
  searchTrains,
  getLiveStationData,
  bookTrain,
  cancelTrainBooking,
  getPNRStatus,
  getTrainRoute,
  generateMockTrains
} from './trainSearchAPI.js'

// Insurance API
export {
  getInsuranceQuotes,
  getInsurancePolicyDetails,
  purchaseInsurance,
  cancelInsurancePolicy,
  submitClaim,
  getClaimStatus,
  generateMockInsurance
} from './insuranceAPI.js'

// Default exports for backward compatibility
import flightAPI from './flightAPI.js'
import hotelAPI from './hotelAPI.js'
import trainAPI from './trainSearchAPI.js'
import insuranceAPI from './insuranceAPI.js'

export {
  flightAPI,
  hotelAPI,
  trainAPI,
  insuranceAPI
}

// Combined API object
export default {
  flight: flightAPI,
  hotel: hotelAPI,
  train: trainAPI,
  insurance: insuranceAPI
}
