import { useState } from 'react'
import BookingModal from './BookingModal'

function TrainSearch() {
  const [searchData, setSearchData] = useState({
    railwayFrom: '',
    railwayTo: '',
    railwayDate: '',
    railwayClass: 'sleeper',
    passengers: 1
  })
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    if (!searchData.railwayFrom || !searchData.railwayTo || !searchData.railwayDate) {
      alert('Please fill in all required fields')
      return
    }
    setShowModal(true)
  }

  const popularRoutes = [
    { from: 'New Delhi', to: 'Mumbai Central' },
    { from: 'New Delhi', to: 'Howrah Junction' },
    { from: 'New Delhi', to: 'Chennai Central' },
    { from: 'Mumbai Central', to: 'New Delhi' },
    { from: 'New Delhi', to: 'Ernakulam Junction' },
    { from: 'New Delhi', to: 'Dibrugarh' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Search Trains
          </h1>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Station *
              </label>
              <input
                type="text"
                value={searchData.railwayFrom}
                onChange={(e) => handleInputChange('railwayFrom', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Departure station"
                list="fromStations"
              />
              <datalist id="fromStations">
                <option value="New Delhi" />
                <option value="Mumbai Central" />
                <option value="Howrah Junction" />
                <option value="Chennai Central" />
                <option value="Bangalore City" />
                <option value="Ernakulam Junction" />
                <option value="Dibrugarh" />
                <option value="Kalka" />
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Station *
              </label>
              <input
                type="text"
                value={searchData.railwayTo}
                onChange={(e) => handleInputChange('railwayTo', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Destination station"
                list="toStations"
              />
              <datalist id="toStations">
                <option value="New Delhi" />
                <option value="Mumbai Central" />
                <option value="Howrah Junction" />
                <option value="Chennai Central" />
                <option value="Bangalore City" />
                <option value="Ernakulam Junction" />
                <option value="Dibrugarh" />
                <option value="Kalka" />
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Journey Date *
              </label>
              <input
                type="date"
                value={searchData.railwayDate}
                onChange={(e) => handleInputChange('railwayDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                value={searchData.railwayClass}
                onChange={(e) => handleInputChange('railwayClass', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1A">1st AC</option>
                <option value="2A">2nd AC</option>
                <option value="3A">3rd AC</option>
                <option value="CC">Chair Car</option>
                <option value="EC">Executive Chair</option>
                <option value="SL">Sleeper</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passengers
              </label>
              <select
                value={searchData.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Search Trains
            </button>
          </div>

          {/* Popular Routes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Routes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange('railwayFrom', route.from)
                    handleInputChange('railwayTo', route.to)
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900">{route.from}</div>
                  <div className="text-gray-500 text-sm">↓</div>
                  <div className="font-medium text-gray-900">{route.to}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Train Classes Info */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Train Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">1st AC (1A)</h4>
                <p className="text-sm text-gray-600">Fully air-conditioned with 2 or 4 berths per compartment</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">2nd AC (2A)</h4>
                <p className="text-sm text-gray-600">Air-conditioned with 4 or 6 berths per compartment</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">3rd AC (3A)</h4>
                <p className="text-sm text-gray-600">Air-conditioned with 6 berths per compartment</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Chair Car (CC)</h4>
                <p className="text-sm text-gray-600">Air-conditioned seating for day journeys</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Executive Chair (EC)</h4>
                <p className="text-sm text-gray-600">Premium air-conditioned seating</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Sleeper (SL)</h4>
                <p className="text-sm text-gray-600">Non-AC with 6 berths per compartment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          searchType="railways"
          searchData={searchData}
        />
      )}
    </div>
  )
}

export default TrainSearch
