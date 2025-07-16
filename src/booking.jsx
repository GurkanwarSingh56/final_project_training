import { useState } from 'react'
import './index.css'
import bookingbg from './assets/bookingbg.png'

function Booking() {
  const [activeTab, setActiveTab] = useState('flight')
  const [tripType, setTripType] = useState('round-trip')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [classType, setClassType] = useState('economy')
  
  // Railway specific states
  const [railwayFrom, setRailwayFrom] = useState('')
  const [railwayTo, setRailwayTo] = useState('')
  const [railwayDate, setRailwayDate] = useState('')
  const [railwayClass, setRailwayClass] = useState('sleeper')
  
  // Hotel specific states
  const [hotelCity, setHotelCity] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [rooms, setRooms] = useState(1)
  
  // Insurance specific states
  const [insuranceType, setInsuranceType] = useState('travel')
  const [travelDestination, setTravelDestination] = useState('')
  const [travelStartDate, setTravelStartDate] = useState('')
  const [travelEndDate, setTravelEndDate] = useState('')
  const [coverageAmount, setCoverageAmount] = useState('basic')

  const handleSearch = () => {
    console.log(`Searching ${activeTab}...`, {
      activeTab,
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
    },
    {
      id: 'railways',
      label: 'RAILWAYS',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2H18v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.59-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7H6V6h12v4z"/>
        </svg>
      )
    },
    {
      id: 'hotels',
      label: 'HOTELS',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
        </svg>
      )
    },
    {
      id: 'insurance',
      label: 'TRAVEL INSURANCE',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5H16.3V16H7.7V11.5H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    }
  ]

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 relative">      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bookingbg})`
        }}
      ></div>

      {/* Booking Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Journey
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Discover the best deals on flights, trains, hotels and insurance worldwide. Book now and save big on your next adventure.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4">
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

          {/* Dynamic Content Based on Active Tab */}
          {activeTab === 'flight' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Flight</h2>
            {/* Trip Type Selection */}
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

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* From */}
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

              {/* To */}
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

              {/* Departure Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Return Date */}
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

            {/* Passengers and Class */}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Search Flights
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Railways Section */}
          {activeTab === 'railways' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Train</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Station</label>
                <input
                  type="text"
                  placeholder="Departure Station"
                  value={railwayFrom}
                  onChange={(e) => setRailwayFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Station</label>
                <input
                  type="text"
                  placeholder="Destination Station"
                  value={railwayTo}
                  onChange={(e) => setRailwayTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Journey Date</label>
                <input
                  type="date"
                  value={railwayDate}
                  onChange={(e) => setRailwayDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={railwayClass}
                  onChange={(e) => setRailwayClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sleeper">Sleeper (SL)</option>
                  <option value="3ac">3rd AC (3A)</option>
                  <option value="2ac">2nd AC (2A)</option>
                  <option value="1ac">1st AC (1A)</option>
                  <option value="cc">Chair Car (CC)</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md transition-colors duration-200"
              >
                Search Trains
              </button>
            </div>
          </div>
          )}

          {/* Hotels Section */}
          {activeTab === 'hotels' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Hotel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City/Destination</label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={hotelCity}
                  onChange={(e) => setHotelCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md transition-colors duration-200"
              >
                Search Hotels
              </button>
            </div>
          </div>
          )}

          {/* Travel Insurance Section */}
          {activeTab === 'insurance' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Travel Insurance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Type</label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="travel">Travel Insurance</option>
                  <option value="medical">Medical Insurance</option>
                  <option value="adventure">Adventure Sports</option>
                  <option value="business">Business Travel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  placeholder="Travel destination"
                  value={travelDestination}
                  onChange={(e) => setTravelDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={travelStartDate}
                  onChange={(e) => setTravelStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={travelEndDate}
                  onChange={(e) => setTravelEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
                <select
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="basic">Basic - $50,000</option>
                  <option value="standard">Standard - $100,000</option>
                  <option value="premium">Premium - $250,000</option>
                  <option value="platinum">Platinum - $500,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md transition-colors duration-200"
              >
                Get Insurance Quote
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking
