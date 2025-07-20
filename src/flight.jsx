import { useState } from 'react'
import './index.css'
import bookingbg from './assets/bookingbg.png'
import axios from 'axios' // Import axios for API calls

// Flight search functionality that can be imported by other components
export const useFlightSearch = () => {
  const [flights, setFlights] = useState([])
  const [returnFlights, setReturnFlights] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const searchFlights = async (searchParams) => {
    const { tripType, departure, destination, departureDate, returnDate, passengers, classType } = searchParams

    if (!departure || !destination || !departureDate) {
      alert('Please fill in all required fields')
      return
    }

    if (tripType === 'round-trip' && !returnDate) {
      alert('Please select return date for round trip')
      return
    }

    setIsLoading(true)
    try {
      console.log('Searching flights...', searchParams)
      
      // Replace with the actual URL of your backend API endpoint
      const YOUR_BACKEND_API_URL = 'http://localhost:3001/api/search-flights'

      const response = await axios.post(YOUR_BACKEND_API_URL, {
        origin: departure,
        destination: destination,
        earliestDepartureDate: departureDate,
        latestDepartureDate: departureDate, // Assuming exact date search for simplicity
        earliestReturnDate: tripType === 'round-trip' ? returnDate : undefined,
        latestReturnDate: tripType === 'round-trip' ? returnDate : undefined,
        numAdultPassengers: parseInt(passengers)
      })

      let outboundFlights = []
      let returnFlights = []

      // Assuming your backend sends back flight data in response.data.flights
      if (response.data && response.data.flights) {
        const apiFlights = response.data.flights
        
        // Transform API data to match our component structure
        outboundFlights = apiFlights.map((flight, index) => ({
          id: index + 1,
          airline: Array.isArray(flight.airline) ? flight.airline.join(', ') : flight.airline,
          departure: flight.origin || departure,
          destination: flight.destination || destination,
          departureTime: flight.departure_time,
          arrivalTime: flight.arrival_time,
          price: flight.price,
          duration: flight.duration,
          class: classType,
          date: departureDate,
          type: 'outbound',
          flightNumber: Array.isArray(flight.flight_number) ? flight.flight_number.join(', ') : flight.flight_number,
          flightUrl: flight.flight_url
        }))

        // For round trips, you might need to make another API call or the backend might return return flights
        // This depends on how your API is structured
        if (tripType === 'round-trip') {
          // Option 1: If your API returns both outbound and return in one call
          // You might need to filter or separate them based on your API response structure
          
          // Option 2: Make a separate API call for return flights
          try {
            const returnResponse = await axios.post(YOUR_BACKEND_API_URL, {
              origin: destination,
              destination: departure,
              earliestDepartureDate: returnDate,
              latestDepartureDate: returnDate,
              numAdultPassengers: parseInt(passengers)
            })

            if (returnResponse.data && returnResponse.data.flights) {
              returnFlights = returnResponse.data.flights.map((flight, index) => ({
                id: index + 100, // Different ID range for return flights
                airline: Array.isArray(flight.airline) ? flight.airline.join(', ') : flight.airline,
                departure: flight.origin || destination,
                destination: flight.destination || departure,
                departureTime: flight.departure_time,
                arrivalTime: flight.arrival_time,
                price: flight.price,
                duration: flight.duration,
                class: classType,
                date: returnDate,
                type: 'return',
                flightNumber: Array.isArray(flight.flight_number) ? flight.flight_number.join(', ') : flight.flight_number,
                flightUrl: flight.flight_url
              }))
            }
          } catch (returnError) {
            console.error('Error fetching return flights:', returnError)
            // Continue with outbound flights only
          }
        }
      } else {
        alert('No flights found for your search criteria.')
        return { outbound: [], return: [] }
      }
      
      setFlights(outboundFlights)
      setReturnFlights(returnFlights)
      setShowModal(true) // Open modal when results are ready
      return { outbound: outboundFlights, return: returnFlights }
    } catch (error) {
      console.error('Error searching flights:', error)
      
      let errorMessage = 'Failed to fetch flights. Please try again.'
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error: Unable to connect to flight search API. Please check if the API server is running.'
      } else if (error.response) {
        errorMessage = `API Error: ${error.response.status} - ${error.response.data?.message || 'Server error'}`
      } else if (error.request) {
        errorMessage = 'No response from flight search API. Please check your connection.'
      }
      
      alert(errorMessage)
      return { outbound: [], return: [] }
    } finally {
      setIsLoading(false)
    }
  }

  return { 
    flights, 
    returnFlights, 
    isLoading, 
    searchFlights, 
    setFlights, 
    setReturnFlights,
    showModal,
    setShowModal
  }
}

function Flight() {
  const [activeTab, setActiveTab] = useState('flight')
  const [tripType, setTripType] = useState('round-trip')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [classType, setClassType] = useState('economy')

  // Use the flight search hook
  const { flights, returnFlights, isLoading, searchFlights, showModal, setShowModal } = useFlightSearch()

  const handleSearch = async () => {
    await searchFlights({
      tripType,
      departure,
      destination,
      departureDate,
      returnDate,
      passengers,
      classType
    })
  }

  const tabsData = [
    {
      id: 'flight',
      label: 'FLIGHT',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 relative">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bookingbg})`
        }}
      ></div>

      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Flight
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Discover the best deals on flights worldwide. Book now and save big on your next adventure.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 text-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {tab.icon}
                    <span className="text-sm font-semibold">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'flight' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Flight</h2>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="round-trip"
                  checked={tripType === 'round-trip'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Round Trip</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="one-way"
                  checked={tripType === 'one-way'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">One Way</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="multi-city"
                  checked={tripType === 'multi-city'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Multi City</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input
                  type="text"
                  placeholder="Departure City"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="text"
                  placeholder="Destination City"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {tripType === 'round-trip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Searching...' : 'Search Flights'}
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Flight Results Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Flight Search Results</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  {/* Outbound Flights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Outbound Flights ({departure} → {destination})
                    </h3>
                    <div className="space-y-4">
                      {flights.map((flight) => (
                        <div key={flight.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-800">{flight.airline}</h4>
                                  {flight.flightNumber && (
                                    <div className="text-sm text-gray-500">Flight: {flight.flightNumber}</div>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">{new Date(flight.date).toLocaleDateString()}</div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="font-bold text-xl">{flight.departureTime}</div>
                                  <div className="text-gray-600 text-sm">{flight.departure}</div>
                                </div>
                                <div className="flex-1 text-center">
                                  <div className="text-gray-500 text-sm">{flight.duration}</div>
                                  <div className="h-px bg-gray-300 my-1 relative">
                                    <div className="absolute right-0 top-0 w-2 h-2 bg-gray-400 rounded-full transform translate-y-[-50%]"></div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-xl">{flight.arrivalTime}</div>
                                  <div className="text-gray-600 text-sm">{flight.destination}</div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-8 text-center">
                              <div className="text-2xl font-bold text-blue-600">{flight.price}</div>
                              <div className="text-gray-500 text-sm capitalize">{flight.class}</div>
                              <div className="mt-2 space-y-2">
                                <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                  Select
                                </button>
                                {flight.flightUrl && flight.flightUrl !== '#' && (
                                  <a 
                                    href={flight.flightUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block text-blue-600 hover:underline text-sm"
                                  >
                                    View Details
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Return Flights - Only show for round trips */}
                  {returnFlights.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Return Flights ({destination} → {departure})
                      </h3>
                      <div className="space-y-4">
                        {returnFlights.map((flight) => (
                          <div key={flight.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{flight.airline}</h4>
                                    {flight.flightNumber && (
                                      <div className="text-sm text-gray-500">Flight: {flight.flightNumber}</div>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600">{new Date(flight.date).toLocaleDateString()}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <div className="font-bold text-xl">{flight.departureTime}</div>
                                    <div className="text-gray-600 text-sm">{flight.departure}</div>
                                  </div>
                                  <div className="flex-1 text-center">
                                    <div className="text-gray-500 text-sm">{flight.duration}</div>
                                    <div className="h-px bg-gray-300 my-1 relative">
                                      <div className="absolute right-0 top-0 w-2 h-2 bg-gray-400 rounded-full transform translate-y-[-50%]"></div>
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-xl">{flight.arrivalTime}</div>
                                    <div className="text-gray-600 text-sm">{flight.destination}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-8 text-center">
                                <div className="text-2xl font-bold text-blue-600">{flight.price}</div>
                                <div className="text-gray-500 text-sm capitalize">{flight.class}</div>
                                <div className="mt-2 space-y-2">
                                  <button className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                    Select
                                  </button>
                                  {flight.flightUrl && flight.flightUrl !== '#' && (
                                    <a 
                                      href={flight.flightUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="block text-blue-600 hover:underline text-sm"
                                    >
                                      View Details
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Flight
