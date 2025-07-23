import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const generateBookingPDF = async (bookingData) => {
  try {
    const doc = new jsPDF()
    
    // Add company logo/header
    doc.setFontSize(20)
    doc.setTextColor(33, 150, 243) // Blue color
    doc.text('TravelBooking Pro', 20, 30)
    
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text('Your Travel Booking Confirmation', 20, 40)
    
    // Add booking info header
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(`${bookingData.type.toUpperCase()} BOOKING CONFIRMATION`, 20, 60)
    
    // Add booking details
    const bookingInfo = [
      ['Booking ID:', bookingData.id],
      ['Booking Date:', new Date(bookingData.bookingDate).toLocaleDateString()],
      ['Status:', bookingData.status.toUpperCase()],
      ['Total Amount:', bookingData.totalAmount]
    ]
    
    let yPosition = 80
    bookingInfo.forEach(([label, value]) => {
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(label, 20, yPosition)
      doc.setTextColor(0, 0, 0)
      doc.text(String(value), 80, yPosition)
      yPosition += 10
    })
    
    // Add service-specific details
    yPosition += 10
    doc.setFontSize(14)
    doc.setTextColor(33, 150, 243)
    doc.text('Service Details', 20, yPosition)
    yPosition += 15
    
    if (bookingData.type === 'flight') {
      addFlightDetails(doc, bookingData.selectedItem, yPosition)
      yPosition += 60
    } else if (bookingData.type === 'railway') {
      addTrainDetails(doc, bookingData.selectedItem, yPosition)
      yPosition += 60
    } else if (bookingData.type === 'hotel') {
      addHotelDetails(doc, bookingData.selectedItem, yPosition)
      yPosition += 60
    } else if (bookingData.type === 'insurance') {
      addInsuranceDetails(doc, bookingData.selectedItem, yPosition)
      yPosition += 60
    }
    
    // Add passenger/guest details table
    doc.setFontSize(14)
    doc.setTextColor(33, 150, 243)
    doc.text('Passenger/Guest Details', 20, yPosition)
    yPosition += 10
    
    const passengerHeaders = bookingData.type === 'flight' 
      ? ['Name', 'Age', 'Gender', 'Passport Number']
      : ['Name', 'Age', 'Gender', 'ID Number']
    
    const passengerData = bookingData.passengers.map(passenger => [
      passenger.name,
      passenger.age,
      passenger.gender,
      bookingData.type === 'flight' ? passenger.passportNumber : passenger.idNumber
    ])
    
    doc.autoTable({
      startY: yPosition,
      head: [passengerHeaders],
      body: passengerData,
      theme: 'grid',
      headStyles: { fillColor: [33, 150, 243], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 20, right: 20 }
    })
    
    // Add footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text('Thank you for choosing TravelBooking Pro!', 20, pageHeight - 30)
    doc.text('For support, contact: support@travelbookingpro.com', 20, pageHeight - 20)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, pageHeight - 10)
    
    // Save the PDF
    const fileName = `${bookingData.type}_booking_${bookingData.id.split('_')[1]}.pdf`
    doc.save(fileName)
    
    return { success: true, fileName }
  } catch (error) {
    console.error('PDF generation error:', error)
    return { success: false, error: error.message }
  }
}

const addFlightDetails = (doc, flight, yPosition) => {
  const flightDetails = [
    ['Airline:', flight.airline],
    ['Flight Number:', flight.flight_number || flight.flightNumber],
    ['Route:', `${flight.origin || flight.departure} → ${flight.destination}`],
    ['Departure:', flight.departure_time || flight.departureTime],
    ['Arrival:', flight.arrival_time || flight.arrivalTime],
    ['Duration:', flight.duration],
    ['Stops:', flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`]
  ]
  
  flightDetails.forEach(([label, value], index) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 20, yPosition + (index * 8))
    doc.setTextColor(0, 0, 0)
    doc.text(String(value || 'N/A'), 80, yPosition + (index * 8))
  })
}

const addTrainDetails = (doc, train, yPosition) => {
  const trainDetails = [
    ['Train Name:', train.trainName],
    ['Train Number:', train.trainNumber],
    ['Route:', `${train.departure} → ${train.destination}`],
    ['Departure:', train.departureTime],
    ['Arrival:', train.arrivalTime],
    ['Duration:', train.duration],
    ['Class:', train.class]
  ]
  
  trainDetails.forEach(([label, value], index) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 20, yPosition + (index * 8))
    doc.setTextColor(0, 0, 0)
    doc.text(String(value || 'N/A'), 80, yPosition + (index * 8))
  })
}

const addHotelDetails = (doc, hotel, yPosition) => {
  const hotelDetails = [
    ['Hotel Name:', hotel.name],
    ['Location:', hotel.location],
    ['Rating:', `${hotel.rating} ⭐`],
    ['Room Type:', hotel.roomType || 'Standard Room'],
    ['Check-in:', hotel.checkIn],
    ['Check-out:', hotel.checkOut],
    ['Amenities:', hotel.amenities ? hotel.amenities.slice(0, 3).join(', ') : 'N/A']
  ]
  
  hotelDetails.forEach(([label, value], index) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 20, yPosition + (index * 8))
    doc.setTextColor(0, 0, 0)
    doc.text(String(value || 'N/A'), 80, yPosition + (index * 8))
  })
}

const addInsuranceDetails = (doc, insurance, yPosition) => {
  const insuranceDetails = [
    ['Provider:', insurance.provider],
    ['Plan Name:', insurance.planName],
    ['Coverage:', insurance.coverage],
    ['Duration:', insurance.duration],
    ['Travelers:', insurance.travelers],
    ['Benefits:', insurance.benefits ? insurance.benefits.slice(0, 3).join(', ') : 'N/A']
  ]
  
  insuranceDetails.forEach(([label, value], index) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 20, yPosition + (index * 8))
    doc.setTextColor(0, 0, 0)
    doc.text(String(value || 'N/A'), 80, yPosition + (index * 8))
  })
}
