import { useState, useEffect } from 'react'
import { saveBookingData } from '../../services/storage/bookingStorage'
import { generateBookingPDF } from '../../services/utils/pdfGenerator'

function PassengerDetailsModal({ 
  isOpen, 
  onClose, 
  bookingData,
  bookingType, // 'flight', 'railways', 'hotels', 'insurance'
  selectedItem 
}) {
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  useEffect(() => {
    if (isOpen && bookingData) {
      console.log('PassengerDetailsModal opening with:', {
        bookingType,
        bookingData,
        selectedItem
      })
      initializePassengers()
    }
  }, [isOpen, bookingData, bookingType])

  const initializePassengers = () => {
    let passengerCount = 1
    
    switch (bookingType) {
      case 'flight':
        passengerCount = bookingData.passengers || 1
        break
      case 'railways':
        passengerCount = bookingData.passengers || 1
        break
      case 'hotels':
        passengerCount = bookingData.guests || 1
        break
      case 'insurance':
        passengerCount = bookingData.passengers || 1
        break
    }

    const initialPassengers = Array.from({ length: passengerCount }, (_, index) => ({
      id: index + 1,
      name: '',
      age: '',
      gender: '',
      passportNumber: bookingType === 'flight' ? '' : undefined,
      idNumber: bookingType !== 'flight' ? '' : undefined,
      // Train specific fields
      berth: bookingType === 'railways' ? '' : undefined,
      meal: bookingType === 'railways' ? 'veg' : undefined,
      // Hotel specific fields
      roomPreference: bookingType === 'hotels' ? 'any' : undefined,
      // Insurance specific fields
      medicalHistory: bookingType === 'insurance' ? '' : undefined,
      emergencyContact: bookingType === 'insurance' ? '' : undefined
    }))

    setPassengers(initialPassengers)
    setErrors({})
  }

  const updatePassenger = (index, field, value) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index][field] = value
    setPassengers(updatedPassengers)
    
    // Clear error for this field
    if (errors[`passenger_${index}_${field}`]) {
      const newErrors = { ...errors }
      delete newErrors[`passenger_${index}_${field}`]
      setErrors(newErrors)
    }
  }

  const updateContactDetails = (field, value) => {
    setContactDetails(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate contact details
    if (!contactDetails.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!contactDetails.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(contactDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number'
    }

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger_${index}_name`] = 'Name is required'
      }

      if (!passenger.age || passenger.age < 1 || passenger.age > 120) {
        newErrors[`passenger_${index}_age`] = 'Valid age is required'
      }

      if (!passenger.gender) {
        newErrors[`passenger_${index}_gender`] = 'Gender is required'
      }

      // Flight specific validation
      if (bookingType === 'flight') {
        if (!passenger.passportNumber) {
          newErrors[`passenger_${index}_passportNumber`] = 'Passport number is required for flights'
        }
      } else {
        if (!passenger.idNumber) {
          newErrors[`passenger_${index}_idNumber`] = 'ID number is required'
        }
      }

      // Insurance specific validation
      if (bookingType === 'insurance') {
        if (!passenger.emergencyContact) {
          newErrors[`passenger_${index}_emergencyContact`] = 'Emergency contact is required for insurance'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBooking = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000))

      const bookingId = `${bookingType.toUpperCase()}_${Date.now()}`
      
      const completeBookingData = {
        id: bookingId,
        type: bookingType,
        selectedItem,
        searchData: bookingData,
        passengers,
        contactDetails,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed',
        totalAmount: calculateTotalAmount()
      }

      console.log('Attempting to save booking data:', completeBookingData)

      // Save booking data
      const saveResult = await saveBookingData(completeBookingData)
      if (!saveResult.success) {
        throw new Error(`Failed to save booking: ${saveResult.error}`)
      }

      console.log('Booking saved successfully, generating PDF...')

      // Generate and download PDF (with fallback)
      try {
        await generateBookingPDF(completeBookingData)
        console.log('PDF generated successfully')
      } catch (pdfError) {
        console.warn('PDF generation failed, but booking is still saved:', pdfError.message)
        // Continue with booking even if PDF fails
      }

      // Show success message
      alert(`${bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} booking confirmed! 
Booking ID: ${bookingId}
Your booking has been saved successfully.`)
      
      onClose()
    } catch (error) {
      console.error('Booking error details:', error)
      console.error('Error stack:', error.stack)
      alert(`Booking failed: ${error.message}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalAmount = () => {
    if (!selectedItem) return 0
    
    // Handle different price field names (price for most, premium for insurance)
    const priceField = selectedItem.price || selectedItem.premium || '0'
    const basePrice = parseInt(priceField.replace(/[₹,]/g, '') || '0')
    const passengerCount = passengers.length
    
    return basePrice * passengerCount
  }

  const getBookingTitle = () => {
    switch (bookingType) {
      case 'flight':
        return 'Flight Booking Details'
      case 'railways':
        return 'Train Booking Details'
      case 'hotels':
        return 'Hotel Booking Details'
      case 'insurance':
        return 'Insurance Policy Details'
      default:
        return 'Booking Details'
    }
  }

  const getPassengerLabel = () => {
    switch (bookingType) {
      case 'hotels':
        return 'Guest'
      case 'insurance':
        return 'Insured Person'
      default:
        return 'Passenger'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{getBookingTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Selected Item Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {bookingType === 'flight' && (
                <>
                  <div><span className="font-medium">Flight:</span> {selectedItem?.airline} {selectedItem?.flightNumber}</div>
                  <div><span className="font-medium">Route:</span> {selectedItem?.departure} → {selectedItem?.destination}</div>
                  <div><span className="font-medium">Date:</span> {selectedItem?.date}</div>
                  <div><span className="font-medium">Time:</span> {selectedItem?.departureTime} - {selectedItem?.arrivalTime}</div>
                </>
              )}
              {bookingType === 'railways' && (
                <>
                  <div><span className="font-medium">Train:</span> {selectedItem?.trainName} ({selectedItem?.trainNumber})</div>
                  <div><span className="font-medium">Route:</span> {selectedItem?.from} → {selectedItem?.to}</div>
                  <div><span className="font-medium">Date:</span> {selectedItem?.date}</div>
                  <div><span className="font-medium">Time:</span> {selectedItem?.departure} - {selectedItem?.arrival}</div>
                </>
              )}
              {bookingType === 'hotels' && (
                <>
                  <div><span className="font-medium">Hotel:</span> {selectedItem?.name}</div>
                  <div><span className="font-medium">Location:</span> {selectedItem?.location}</div>
                  <div><span className="font-medium">Check-in:</span> {bookingData?.checkInDate}</div>
                  <div><span className="font-medium">Check-out:</span> {bookingData?.checkOutDate}</div>
                </>
              )}
              {bookingType === 'insurance' && (
                <>
                  <div><span className="font-medium">Plan:</span> {selectedItem?.planName}</div>
                  <div><span className="font-medium">Provider:</span> {selectedItem?.provider}</div>
                  <div><span className="font-medium">Coverage:</span> {selectedItem?.coverage}</div>
                  <div><span className="font-medium">Duration:</span> {selectedItem?.duration}</div>
                  <div><span className="font-medium">Travelers:</span> {selectedItem?.travelers || bookingData?.passengers || 1}</div>
                  <div><span className="font-medium">Destination:</span> {selectedItem?.travelDestination || bookingData?.travelDestination || 'Worldwide'}</div>
                </>
              )}
              <div className="md:col-span-2">
                <span className="font-medium">Total Amount:</span> 
                <span className="text-lg font-bold text-green-600 ml-2">₹{calculateTotalAmount().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={contactDetails.email}
                  onChange={(e) => updateContactDetails('email', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={contactDetails.phone}
                  onChange={(e) => updateContactDetails('phone', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              {(bookingType === 'flight' || bookingType === 'insurance') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      value={contactDetails.emergencyContact}
                      onChange={(e) => updateContactDetails('emergencyContact', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      value={contactDetails.emergencyPhone}
                      onChange={(e) => updateContactDetails('emergencyPhone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Passenger Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{getPassengerLabel()} Details</h3>
            <div className="space-y-6">
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {getPassengerLabel()} {index + 1}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                        className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_name`] ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Full Name"
                      />
                      {errors[`passenger_${index}_name`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value))}
                        className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_age`] ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Age"
                        min="1"
                        max="120"
                      />
                      {errors[`passenger_${index}_age`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_age`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                        className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_gender`] ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors[`passenger_${index}_gender`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_gender`]}</p>
                      )}
                    </div>

                    {/* Flight specific fields */}
                    {bookingType === 'flight' && (
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number *
                        </label>
                        <input
                          type="text"
                          value={passenger.passportNumber}
                          onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                          className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_passportNumber`] ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Passport Number"
                        />
                        {errors[`passenger_${index}_passportNumber`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_passportNumber`]}</p>
                        )}
                      </div>
                    )}

                    {/* Train specific fields */}
                    {bookingType === 'railways' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID Number (Aadhar/PAN) *
                          </label>
                          <input
                            type="text"
                            value={passenger.idNumber}
                            onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                            className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_idNumber`] ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="ID Number"
                          />
                          {errors[`passenger_${index}_idNumber`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_idNumber`]}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Berth Preference
                          </label>
                          <select
                            value={passenger.berth}
                            onChange={(e) => updatePassenger(index, 'berth', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">No Preference</option>
                            <option value="lower">Lower Berth</option>
                            <option value="middle">Middle Berth</option>
                            <option value="upper">Upper Berth</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meal Preference
                          </label>
                          <select
                            value={passenger.meal}
                            onChange={(e) => updatePassenger(index, 'meal', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="veg">Vegetarian</option>
                            <option value="non-veg">Non-Vegetarian</option>
                            <option value="jain">Jain Vegetarian</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Hotel specific fields */}
                    {bookingType === 'hotels' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID Number *
                          </label>
                          <input
                            type="text"
                            value={passenger.idNumber}
                            onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                            className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_idNumber`] ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="ID Number"
                          />
                          {errors[`passenger_${index}_idNumber`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_idNumber`]}</p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Preference
                          </label>
                          <select
                            value={passenger.roomPreference}
                            onChange={(e) => updatePassenger(index, 'roomPreference', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          >
                            <option value="any">No Preference</option>
                            <option value="high-floor">High Floor</option>
                            <option value="low-floor">Low Floor</option>
                            <option value="sea-view">Sea View</option>
                            <option value="city-view">City View</option>
                            <option value="quiet">Quiet Room</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Insurance specific fields */}
                    {bookingType === 'insurance' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID Number *
                          </label>
                          <input
                            type="text"
                            value={passenger.idNumber}
                            onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                            className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_idNumber`] ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="ID Number"
                          />
                          {errors[`passenger_${index}_idNumber`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_idNumber`]}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Emergency Contact *
                          </label>
                          <input
                            type="text"
                            value={passenger.emergencyContact}
                            onChange={(e) => updatePassenger(index, 'emergencyContact', e.target.value)}
                            className={`w-full p-3 border rounded-lg ${errors[`passenger_${index}_emergencyContact`] ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Emergency Contact Name"
                          />
                          {errors[`passenger_${index}_emergencyContact`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`passenger_${index}_emergencyContact`]}</p>
                          )}
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medical History (Optional)
                          </label>
                          <textarea
                            value={passenger.medicalHistory}
                            onChange={(e) => updatePassenger(index, 'medicalHistory', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Any pre-existing medical conditions or allergies"
                            rows="3"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Booking & Download Ticket'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengerDetailsModal
