import { useState, useEffect } from 'react'
import { getBookingHistory, getBookingStats, deleteBooking } from '../../services/storage/bookingStorage'
import { generateBookingPDF } from '../../services/utils/pdfGenerator'

function BookingHistory() {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [stats, setStats] = useState({})
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookingData()
  }, [])

  useEffect(() => {
    filterBookings()
  }, [bookings, filter])

  const loadBookingData = () => {
    try {
      const bookingHistory = getBookingHistory()
      const bookingStats = getBookingStats()
      
      setBookings(bookingHistory.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)))
      setStats(bookingStats)
      setLoading(false)
    } catch (error) {
      console.error('Error loading booking data:', error)
      setLoading(false)
    }
  }

  const filterBookings = () => {
    if (filter === 'all') {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(bookings.filter(booking => booking.type === filter))
    }
  }

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const result = deleteBooking(bookingId)
      if (result.success) {
        loadBookingData()
        alert('Booking deleted successfully!')
      } else {
        alert('Error deleting booking. Please try again.')
      }
    }
  }

  const handleDownloadPDF = async (booking) => {
    try {
      const result = await generateBookingPDF(booking)
      if (result.success) {
        alert(`PDF downloaded: ${result.fileName}`)
      } else {
        alert('Error generating PDF. Please try again.')
      }
    } catch (error) {
      console.error('PDF download error:', error)
      alert('Error downloading PDF. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-xl text-gray-600">Manage your travel bookings and download confirmations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total || 0}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.flight || 0}</div>
            <div className="text-sm text-gray-600">Flights</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.railway || 0}</div>
            <div className="text-sm text-gray-600">Trains</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.hotel || 0}</div>
            <div className="text-sm text-gray-600">Hotels</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-red-600">{stats.insurance || 0}</div>
            <div className="text-sm text-gray-600">Insurance</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex flex-wrap justify-center border-b">
            {[
              { key: 'all', label: 'All Bookings', count: stats.total },
              { key: 'flight', label: 'Flights', count: stats.flight },
              { key: 'railway', label: 'Trains', count: stats.railway },
              { key: 'hotel', label: 'Hotels', count: stats.hotel },
              { key: 'insurance', label: 'Insurance', count: stats.insurance }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  filter === key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label} ({count || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You haven't made any bookings yet. Start planning your next trip!"
                  : `No ${filter} bookings found. Try a different filter or make a new booking.`
                }
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onDelete={handleDeleteBooking}
                onDownloadPDF={handleDownloadPDF}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Individual booking card component
function BookingCard({ booking, onDelete, onDownloadPDF }) {
  const getTypeIcon = (type) => {
    const icons = {
      flight: '✈️',
      railway: '🚂',
      hotel: '🏨',
      insurance: '🛡️'
    }
    return icons[type] || '📋'
  }

  const getTypeColor = (type) => {
    const colors = {
      flight: 'text-blue-600 bg-blue-100',
      railway: 'text-purple-600 bg-purple-100',
      hotel: 'text-orange-600 bg-orange-100',
      insurance: 'text-red-600 bg-red-100'
    }
    return colors[type] || 'text-gray-600 bg-gray-100'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${getTypeColor(booking.type)}`}>
              {getTypeIcon(booking.type)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Booking
              </h3>
              <p className="text-sm text-gray-600">ID: {booking.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{formatDate(booking.bookingDate)}</p>
          </div>
        </div>

        {/* Service Details */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          {booking.type === 'flight' && (
            <div>
              <p className="font-medium">{booking.selectedItem.airline} - {booking.selectedItem.flight_number || booking.selectedItem.flightNumber}</p>
              <p className="text-sm text-gray-600">
                {booking.selectedItem.origin || booking.selectedItem.departure} → {booking.selectedItem.destination}
              </p>
              <p className="text-sm text-gray-600">
                {booking.selectedItem.departure_time || booking.selectedItem.departureTime} - {booking.selectedItem.arrival_time || booking.selectedItem.arrivalTime}
              </p>
            </div>
          )}
          
          {booking.type === 'railway' && (
            <div>
              <p className="font-medium">{booking.selectedItem.trainName} - {booking.selectedItem.trainNumber}</p>
              <p className="text-sm text-gray-600">
                {booking.selectedItem.departure} → {booking.selectedItem.destination}
              </p>
              <p className="text-sm text-gray-600">
                {booking.selectedItem.departureTime} - {booking.selectedItem.arrivalTime}
              </p>
            </div>
          )}
          
          {booking.type === 'hotel' && (
            <div>
              <p className="font-medium">{booking.selectedItem.name}</p>
              <p className="text-sm text-gray-600">{booking.selectedItem.location}</p>
              <p className="text-sm text-gray-600">
                {booking.selectedItem.checkIn} → {booking.selectedItem.checkOut}
              </p>
            </div>
          )}
          
          {booking.type === 'insurance' && (
            <div>
              <p className="font-medium">{booking.selectedItem.provider} - {booking.selectedItem.planName}</p>
              <p className="text-sm text-gray-600">Coverage: {booking.selectedItem.coverage}</p>
              <p className="text-sm text-gray-600">Duration: {booking.selectedItem.duration}</p>
            </div>
          )}
        </div>

        {/* Passengers */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">
            {booking.type === 'hotel' ? 'Guests' : 'Passengers'} ({booking.passengers.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {booking.passengers.map((passenger, index) => (
              <div key={index} className="text-sm text-gray-600 bg-white p-2 rounded border">
                <span className="font-medium">{passenger.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  Age {passenger.age}, {passenger.gender}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-lg font-bold text-gray-900">
            Total: {booking.totalAmount}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => onDownloadPDF(booking)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <button
              onClick={() => onDelete(booking.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistory
