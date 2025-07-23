// Local Storage service for booking data

const BOOKING_STORAGE_KEY = 'travelBookings'

// Save booking data to localStorage
export const saveBookingData = async (bookingData) => {
  try {
    const existingBookings = getBookingHistory()
    const updatedBookings = [...existingBookings, bookingData]
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updatedBookings))
    return { success: true, data: bookingData }
  } catch (error) {
    console.error('Error saving booking data:', error)
    return { success: false, error: error.message }
  }
}

// Get all booking history
export const getBookingHistory = () => {
  try {
    const bookings = localStorage.getItem(BOOKING_STORAGE_KEY)
    return bookings ? JSON.parse(bookings) : []
  } catch (error) {
    console.error('Error retrieving booking history:', error)
    return []
  }
}

// Get bookings by type
export const getBookingsByType = (type) => {
  try {
    const allBookings = getBookingHistory()
    return allBookings.filter(booking => booking.type === type)
  } catch (error) {
    console.error('Error filtering bookings by type:', error)
    return []
  }
}

// Get booking by ID
export const getBookingById = (id) => {
  try {
    const allBookings = getBookingHistory()
    return allBookings.find(booking => booking.id === id)
  } catch (error) {
    console.error('Error finding booking by ID:', error)
    return null
  }
}

// Update booking status
export const updateBookingStatus = (id, status) => {
  try {
    const allBookings = getBookingHistory()
    const updatedBookings = allBookings.map(booking => 
      booking.id === id ? { ...booking, status, updatedAt: new Date().toISOString() } : booking
    )
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updatedBookings))
    return { success: true }
  } catch (error) {
    console.error('Error updating booking status:', error)
    return { success: false, error: error.message }
  }
}

// Delete booking
export const deleteBooking = (id) => {
  try {
    const allBookings = getBookingHistory()
    const filteredBookings = allBookings.filter(booking => booking.id !== id)
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(filteredBookings))
    return { success: true }
  } catch (error) {
    console.error('Error deleting booking:', error)
    return { success: false, error: error.message }
  }
}

// Clear all bookings
export const clearAllBookings = () => {
  try {
    localStorage.removeItem(BOOKING_STORAGE_KEY)
    return { success: true }
  } catch (error) {
    console.error('Error clearing bookings:', error)
    return { success: false, error: error.message }
  }
}

// Get booking statistics
export const getBookingStats = () => {
  try {
    const allBookings = getBookingHistory()
    
    const stats = {
      total: allBookings.length,
      flight: allBookings.filter(b => b.type === 'flight').length,
      railway: allBookings.filter(b => b.type === 'railway').length,
      hotel: allBookings.filter(b => b.type === 'hotel').length,
      insurance: allBookings.filter(b => b.type === 'insurance').length,
      confirmed: allBookings.filter(b => b.status === 'confirmed').length,
      cancelled: allBookings.filter(b => b.status === 'cancelled').length,
      pending: allBookings.filter(b => b.status === 'pending').length
    }
    
    return stats
  } catch (error) {
    console.error('Error getting booking statistics:', error)
    return {
      total: 0,
      flight: 0,
      railway: 0,
      hotel: 0,
      insurance: 0,
      confirmed: 0,
      cancelled: 0,
      pending: 0
    }
  }
}
