import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { searchFlights } from '../services/api/flightAPI'
import { searchTrains } from '../services/api/trainSearchAPI'
import { searchHotels } from '../services/api/hotelAPI'
import { getInsuranceQuotes } from '../services/api/insuranceAPI'
import PassengerDetailsModal from './booking/PassengerDetailsModal'

function BookingModal({ isOpen, onClose, searchType, searchData }) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const { requireAuth } = useAuth()
  
  // Passenger details modal state
  const [showPassengerModal, setShowPassengerModal] = useState(false)
  const [selectedBookingItem, setSelectedBookingItem] = useState(null)

  useEffect(() => {
    if (isOpen && searchData) {
      fetchResults()
    }
  }, [isOpen, searchData, searchType])

  const fetchResults = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let apiResponse

      switch (searchType) {
        case 'flight':
          apiResponse = await searchFlights(searchData)
          break
        case 'railways':
          apiResponse = await searchTrains(
            searchData.railwayFrom,
            searchData.railwayTo,
            searchData.railwayDate
          )
          break
        case 'hotels':
          apiResponse = await searchHotels(searchData)
          break
        case 'insurance':
          apiResponse = await getInsuranceQuotes(searchData)
          break
        default:
          throw new Error(`Unknown search type: ${searchType}`)
      }

      if (apiResponse.success) {
        setResults(apiResponse.data)
      } else {
        setError(apiResponse.error)
        setResults(apiResponse.data || []) // Use fallback data if available
      }
    } catch (err) {
      console.error('API Error:', err)
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = async (item) => {
    // Check authentication before proceeding with booking
    const authResult = await requireAuth()
    if (!authResult.success) {
      alert(authResult.message)
      return
    }

    setSelectedBookingItem(item)
    setShowPassengerModal(true)
  }

  const handleClosePassengerModal = () => {
    setShowPassengerModal(false)
    setSelectedBookingItem(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchType === 'flight' && 'Flight Search Results'}
            {searchType === 'railways' && 'Train Search Results'}
            {searchType === 'hotels' && 'Hotel Search Results'}
            {searchType === 'insurance' && 'Insurance Quotes'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Searching for the best options...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold">Search Error</h3>
                <p className="text-sm text-gray-600 mt-1">{error}</p>
              </div>
              {results.length > 0 && (
                <p className="text-sm text-blue-600 mb-4">Showing backup results below:</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {searchType === 'flight' && (
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-lg">{result.airline}</h3>
                          <span className="text-sm text-gray-500">{result.flight_number || result.flightNumber}</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">{result.departure_time || result.departureTime}</span>
                            <div>{result.origin || result.departure}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs">{result.duration}</span>
                            <div className="w-16 h-px bg-gray-300"></div>
                            <span className="text-xs">{result.stops === 0 ? 'Non-stop' : `${result.stops} stop${result.stops > 1 ? 's' : ''}`}</span>
                          </div>
                          <div>
                            <span className="font-medium">{result.arrival_time || result.arrivalTime}</span>
                            <div>{result.destination}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{result.price}</div>
                        <button 
                          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                          onClick={() => handleBookNow(result)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}

                  {searchType === 'railways' && (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-lg">{result.trainName}</h3>
                            <span className="text-sm text-gray-500">({result.trainNumber})</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {result.trainType}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">{result.departure}</span>
                              <div className="text-xs">{result.from}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-xs">{result.duration}</span>
                              <div className="w-16 h-px bg-gray-300"></div>
                              <span className="text-xs">{result.distance}</span>
                            </div>
                            <div>
                              <span className="font-medium">{result.arrival}</span>
                              <div className="text-xs">{result.to}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Runs on: {result.runsOn.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Train Classes */}
                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Available Classes:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {result.classes.map((classInfo, classIndex) => (
                            <div key={classIndex} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-sm">{classInfo.type}</span>
                                <span className="text-sm font-bold text-green-600">{classInfo.price}</span>
                              </div>
                              <div className="text-xs text-gray-500 mb-2">
                                Availability: {classInfo.availability}
                              </div>
                              <div className="text-xs text-gray-500 mb-2">
                                {classInfo.seats} seats
                              </div>
                              <button 
                                className="w-full bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 transition-colors"
                                onClick={() => handleBookNow({
                                  ...result,
                                  selectedClass: classInfo.type,
                                  price: classInfo.price,
                                  availability: classInfo.availability
                                })}
                              >
                                Book {classInfo.type}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {searchType === 'hotels' && (
                    <div className="flex space-x-4">
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-32 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{result.name}</h3>
                        <p className="text-gray-600">{result.location}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm">{result.rating}</span>
                          {result.discount && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {result.discount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{result.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.amenities.map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        {result.cancellation && (
                          <p className="text-xs text-blue-600 mt-1">{result.cancellation}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{result.price}</div>
                        {result.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">{result.originalPrice}</div>
                        )}
                        <div className="text-sm text-gray-500">per night</div>
                        <div className="text-xs text-orange-600 mt-1">{result.availability}</div>
                        <button 
                          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                          onClick={() => handleBookNow(result)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}

                  {searchType === 'insurance' && (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{result.provider}</h3>
                            {result.popular && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                            {result.discount && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {result.discount}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{result.planName}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>★ {result.rating}</span>
                            <span>{result.claims}</span>
                            <span>{result.duration} • {result.travelers} traveler{result.travelers > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{result.price}</div>
                          {result.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">{result.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Benefits Included:</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.benefits.map((benefit, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {benefit}
                            </span>
                          ))}
                        </div>
                        
                        {result.exclusions && (
                          <div className="mb-3">
                            <h4 className="font-medium text-sm mb-1">Exclusions:</h4>
                            <ul className="text-xs text-gray-500 list-disc list-inside">
                              {result.exclusions.map((exclusion, index) => (
                                <li key={index}>{exclusion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <button 
                          className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                          onClick={() => handleBookNow(result)}
                        >
                          Get Quote & Compare
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Passenger Details Modal */}
      <PassengerDetailsModal
        isOpen={showPassengerModal}
        onClose={handleClosePassengerModal}
        bookingData={searchData}
        bookingType={searchType}
        selectedItem={selectedBookingItem}
      />
    </div>
  )
}

export default BookingModal
