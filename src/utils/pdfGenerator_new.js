import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const generateBookingPDF = async (bookingData) => {
  try {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    
    // Header
    doc.setFillColor(33, 150, 243)
    doc.rect(0, 0, pageWidth, 50, 'F')
    
    // Company Logo/Name
    doc.setFontSize(24)
    doc.setTextColor(255, 255, 255)
    doc.text('TravelBooking Pro', 20, 25)
    
    doc.setFontSize(12)
    doc.text('Your Complete Travel Solution', 20, 35)
    
    // Booking Type Title
    doc.setFontSize(20)
    doc.setTextColor(0, 0, 0)
    const title = getBookingTitle(bookingData.type)
    doc.text(title, 20, 70)
    
    // Booking Information Box
    doc.setDrawColor(200, 200, 200)
    doc.setFillColor(248, 249, 250)
    doc.rect(20, 80, pageWidth - 40, 40, 'FD')
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('Booking Information', 25, 95)
    
    const bookingInfo = [
      ['Booking ID:', bookingData.id],
      ['Booking Date:', formatDate(bookingData.bookingDate)],
      ['Status:', bookingData.status.toUpperCase()],
      ['Total Amount:', `₹${bookingData.totalAmount.toLocaleString()}`]
    ]
    
    let yPos = 105
    bookingInfo.forEach(([label, value]) => {
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(label, 25, yPos)
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(String(value), 100, yPos)
      yPos += 8
    })
    
    // Service Details
    yPos = 140
    doc.setFontSize(14)
    doc.setTextColor(33, 150, 243)
    doc.text('Service Details', 20, yPos)
    yPos += 10
    
    switch (bookingData.type) {
      case 'flight':
        yPos = addFlightDetails(doc, bookingData, yPos)
        break
      case 'railways':
        yPos = addTrainDetails(doc, bookingData, yPos)
        break
      case 'hotels':
        yPos = addHotelDetails(doc, bookingData, yPos)
        break
      case 'insurance':
        yPos = addInsuranceDetails(doc, bookingData, yPos)
        break
    }
    
    // Contact Information
    yPos += 10
    doc.setFontSize(14)
    doc.setTextColor(33, 150, 243)
    doc.text('Contact Information', 20, yPos)
    yPos += 10
    
    const contactInfo = [
      ['Email:', bookingData.contactDetails.email],
      ['Phone:', bookingData.contactDetails.phone]
    ]
    
    if (bookingData.contactDetails.emergencyContact) {
      contactInfo.push(['Emergency Contact:', bookingData.contactDetails.emergencyContact])
      contactInfo.push(['Emergency Phone:', bookingData.contactDetails.emergencyPhone])
    }
    
    contactInfo.forEach(([label, value]) => {
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(label, 20, yPos)
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(String(value || 'N/A'), 80, yPos)
      yPos += 8
    })
    
    // Passenger/Guest Details Table
    yPos += 10
    doc.setFontSize(14)
    doc.setTextColor(33, 150, 243)
    doc.text('Passenger Details', 20, yPos)
    yPos += 5
    
    const tableData = bookingData.passengers.map((passenger, index) => {
      const row = [
        index + 1,
        passenger.name,
        passenger.age,
        passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)
      ]
      
      if (bookingData.type === 'flight') {
        row.push(passenger.passportNumber)
      } else {
        row.push(passenger.idNumber)
      }
      
      return row
    })
    
    const tableHeaders = ['S.No', 'Name', 'Age', 'Gender']
    if (bookingData.type === 'flight') {
      tableHeaders.push('Passport No.')
    } else {
      tableHeaders.push('ID Number')
    }
    
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: yPos + 5,
      theme: 'grid',
      headStyles: { fillColor: [33, 150, 243] },
      margin: { left: 20, right: 20 }
    })
    
    // Footer
    const finalY = doc.lastAutoTable.finalY + 20
    doc.setDrawColor(33, 150, 243)
    doc.line(20, finalY, pageWidth - 20, finalY)
    
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text('Thank you for choosing TravelBooking Pro!', 20, finalY + 10)
    doc.text('For support, contact us at support@travelbooking.com', 20, finalY + 20)
    doc.text('Terms & Conditions apply. Please check our website for details.', 20, finalY + 30)
    
    // Add QR code placeholder
    doc.setDrawColor(200, 200, 200)
    doc.rect(pageWidth - 60, finalY + 5, 40, 40)
    doc.setFontSize(8)
    doc.text('QR Code', pageWidth - 50, finalY + 27)
    
    // Save the PDF
    const fileName = `${bookingData.type}_booking_${bookingData.id}.pdf`
    doc.save(fileName)
    
    return true
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('Failed to generate PDF')
  }
}

const getBookingTitle = (type) => {
  switch (type) {
    case 'flight':
      return 'FLIGHT BOOKING CONFIRMATION'
    case 'railways':
      return 'TRAIN BOOKING CONFIRMATION'
    case 'hotels':
      return 'HOTEL BOOKING CONFIRMATION'
    case 'insurance':
      return 'TRAVEL INSURANCE POLICY'
    default:
      return 'BOOKING CONFIRMATION'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const addFlightDetails = (doc, bookingData, yPos) => {
  const flight = bookingData.selectedItem
  
  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(248, 249, 250)
  doc.rect(20, yPos, doc.internal.pageSize.width - 40, 50, 'FD')
  
  const flightDetails = [
    ['Airline:', `${flight.airline} (${flight.flightNumber || 'N/A'})`],
    ['Route:', `${flight.departure || flight.origin} → ${flight.destination}`],
    ['Date:', flight.date],
    ['Departure:', flight.departureTime],
    ['Arrival:', flight.arrivalTime],
    ['Duration:', flight.duration || 'N/A'],
    ['Class:', flight.class || 'Economy']
  ]
  
  let detailY = yPos + 10
  flightDetails.forEach(([label, value]) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 25, detailY)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(String(value), 100, detailY)
    detailY += 7
  })
  
  return yPos + 60
}

const addTrainDetails = (doc, bookingData, yPos) => {
  const train = bookingData.selectedItem
  
  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(248, 249, 250)
  doc.rect(20, yPos, doc.internal.pageSize.width - 40, 60, 'FD')
  
  const trainDetails = [
    ['Train:', `${train.trainName} (${train.trainNumber})`],
    ['Route:', `${train.from} → ${train.to}`],
    ['Date:', train.date],
    ['Departure:', train.departure],
    ['Arrival:', train.arrival],
    ['Duration:', train.duration],
    ['Distance:', train.distance || 'N/A'],
    ['Class:', train.selectedClass || 'N/A']
  ]
  
  let detailY = yPos + 10
  trainDetails.forEach(([label, value]) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 25, detailY)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(String(value), 100, detailY)
    detailY += 7
  })
  
  return yPos + 70
}

const addHotelDetails = (doc, bookingData, yPos) => {
  const hotel = bookingData.selectedItem
  
  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(248, 249, 250)
  doc.rect(20, yPos, doc.internal.pageSize.width - 40, 50, 'FD')
  
  const hotelDetails = [
    ['Hotel:', hotel.name],
    ['Location:', hotel.location],
    ['Check-in:', bookingData.searchData.checkInDate],
    ['Check-out:', bookingData.searchData.checkOutDate],
    ['Room Type:', hotel.roomType || 'Standard'],
    ['Guests:', bookingData.searchData.guests],
    ['Rooms:', bookingData.searchData.rooms || 1]
  ]
  
  let detailY = yPos + 10
  hotelDetails.forEach(([label, value]) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 25, detailY)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(String(value), 100, detailY)
    detailY += 7
  })
  
  return yPos + 60
}

const addInsuranceDetails = (doc, bookingData, yPos) => {
  const insurance = bookingData.selectedItem
  
  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(248, 249, 250)
  doc.rect(20, yPos, doc.internal.pageSize.width - 40, 60, 'FD')
  
  const insuranceDetails = [
    ['Plan:', insurance.planName],
    ['Provider:', insurance.provider],
    ['Coverage:', insurance.coverage],
    ['Premium:', insurance.premium],
    ['Duration:', insurance.duration],
    ['Destination:', insurance.travelDestination || 'Worldwide'],
    ['Travelers:', insurance.travelers || 1],
    ['Policy Number:', `POL${Date.now()}`]
  ]
  
  let detailY = yPos + 10
  insuranceDetails.forEach(([label, value]) => {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, 25, detailY)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(String(value), 100, detailY)
    detailY += 7
  })
  
  return yPos + 70
}
