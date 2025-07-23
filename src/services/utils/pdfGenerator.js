// ===== PDF GENERATOR SERVICE =====
// Consolidated PDF Generation for all booking types
// This file contains all PDF generation functionality for tickets, receipts, and booking confirmations

import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Helper function to add header to PDF
const addPDFHeader = (doc, title, bookingData) => {
  // Company header
  doc.setFontSize(24)
  doc.setTextColor(41, 128, 185) // Blue color
  doc.text('TravelBooker Pro', 20, 25)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text('Your Trusted Travel Partner', 20, 32)
  
  // Booking title
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text(title, 20, 50)
  
  // Booking ID and date
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Booking ID: ${bookingData.bookingId || bookingData.id}`, 20, 60)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 60)
  
  // Add a line separator
  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 65, 190, 65)
  
  return 75; // Return Y position for next content
}

// Helper function to add footer to PDF
const addPDFFooter = (doc) => {
  const pageHeight = doc.internal.pageSize.height
  
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text('TravelBooker Pro - Making your journey comfortable and memorable', 20, pageHeight - 20)
  doc.text('For support: support@travelbooker.com | +91-1800-XXX-XXXX', 20, pageHeight - 15)
  doc.text('Terms & Conditions apply. Please keep this document for your records.', 20, pageHeight - 10)
}

// Generate Flight Booking PDF
export const generateFlightPDF = async (bookingData) => {
  try {
    console.log('Generating flight PDF for:', bookingData)
    
    const doc = new jsPDF()
    let yPos = addPDFHeader(doc, 'Flight Booking Confirmation', bookingData)
    
    // Flight details section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Flight Details', 20, yPos)
    yPos += 15
    
    const flightInfo = bookingData.flight || bookingData.selectedFlight || {}
    
    doc.setFontSize(10)
    doc.text(`Flight: ${flightInfo.airline || 'N/A'} ${flightInfo.flight_number || ''}`, 20, yPos)
    doc.text(`Route: ${flightInfo.origin || 'N/A'} → ${flightInfo.destination || 'N/A'}`, 20, yPos + 8)
    doc.text(`Date: ${flightInfo.date || bookingData.travelDate || 'N/A'}`, 20, yPos + 16)
    doc.text(`Departure: ${flightInfo.departure_time || 'N/A'}`, 20, yPos + 24)
    doc.text(`Arrival: ${flightInfo.arrival_time || 'N/A'}`, 120, yPos + 24)
    doc.text(`Duration: ${flightInfo.duration || 'N/A'}`, 20, yPos + 32)
    doc.text(`Class: ${flightInfo.class || 'Economy'}`, 120, yPos + 32)
    
    if (bookingData.pnr) {
      doc.setFontSize(12)
      doc.setTextColor(220, 53, 69) // Red color for PNR
      doc.text(`PNR: ${bookingData.pnr}`, 20, yPos + 45)
    }
    
    yPos += 60
    
    // Passenger details
    if (bookingData.passengers && bookingData.passengers.length > 0) {
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text('Passenger Details', 20, yPos)
      yPos += 10
      
      const passengerData = bookingData.passengers.map((passenger, index) => [
        index + 1,
        passenger.name || 'N/A',
        passenger.age || 'N/A',
        passenger.gender || 'N/A',
        passenger.passport || passenger.documentNumber || 'N/A'
      ])
      
      doc.autoTable({
        startY: yPos,
        head: [['#', 'Name', 'Age', 'Gender', 'Document']],
        body: passengerData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        margin: { left: 20, right: 20 }
      })
      
      yPos = doc.lastAutoTable.finalY + 20
    }
    
    // Contact and payment details
    doc.setFontSize(14)
    doc.text('Booking Information', 20, yPos)
    yPos += 15
    
    doc.setFontSize(10)
    if (bookingData.contactDetails) {
      doc.text(`Email: ${bookingData.contactDetails.email || 'N/A'}`, 20, yPos)
      doc.text(`Phone: ${bookingData.contactDetails.phone || 'N/A'}`, 20, yPos + 8)
      yPos += 20
    }
    
    doc.text(`Total Amount: ${flightInfo.price || bookingData.totalAmount || 'N/A'}`, 20, yPos)
    doc.text(`Payment Status: ${bookingData.paymentStatus || 'Paid'}`, 20, yPos + 8)
    doc.text(`Booking Status: ${bookingData.status || 'Confirmed'}`, 20, yPos + 16)
    
    addPDFFooter(doc)
    
    const fileName = `flight_ticket_${bookingData.bookingId || Date.now()}.pdf`
    doc.save(fileName)
    
    console.log('Flight PDF generated successfully')
    return { success: true, fileName }
  } catch (error) {
    console.error('Flight PDF generation error:', error)
    throw new Error(`Failed to generate flight PDF: ${error.message}`)
  }
}

// Generate Hotel Booking PDF
export const generateHotelPDF = async (bookingData) => {
  try {
    console.log('Generating hotel PDF for:', bookingData)
    
    const doc = new jsPDF()
    let yPos = addPDFHeader(doc, 'Hotel Booking Confirmation', bookingData)
    
    // Hotel details section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Hotel Details', 20, yPos)
    yPos += 15
    
    const hotelInfo = bookingData.hotel || bookingData.selectedHotel || {}
    
    doc.setFontSize(10)
    doc.text(`Hotel: ${hotelInfo.name || 'N/A'}`, 20, yPos)
    doc.text(`Location: ${hotelInfo.location || 'N/A'}`, 20, yPos + 8)
    doc.text(`Room Type: ${hotelInfo.roomType || 'Standard Room'}`, 20, yPos + 16)
    doc.text(`Check-in: ${hotelInfo.checkIn || bookingData.checkIn || 'N/A'}`, 20, yPos + 24)
    doc.text(`Check-out: ${hotelInfo.checkOut || bookingData.checkOut || 'N/A'}`, 120, yPos + 24)
    doc.text(`Guests: ${bookingData.guests || 2}`, 20, yPos + 32)
    doc.text(`Rating: ${hotelInfo.rating ? hotelInfo.rating + ' ⭐' : 'N/A'}`, 120, yPos + 32)
    
    if (bookingData.confirmationNumber) {
      doc.setFontSize(12)
      doc.setTextColor(40, 167, 69) // Green color for confirmation
      doc.text(`Confirmation: ${bookingData.confirmationNumber}`, 20, yPos + 45)
    }
    
    yPos += 60
    
    // Amenities
    if (hotelInfo.amenities && hotelInfo.amenities.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text('Hotel Amenities', 20, yPos)
      yPos += 10
      
      hotelInfo.amenities.forEach((amenity, index) => {
        if (index % 3 === 0 && index > 0) yPos += 8
        doc.setFontSize(9)
        doc.text(`• ${amenity}`, 20 + (index % 3) * 60, yPos)
      })
      
      yPos += 20
    }
    
    // Guest details
    if (bookingData.guests && bookingData.passengers) {
      doc.setFontSize(14)
      doc.text('Guest Details', 20, yPos)
      yPos += 15
      
      bookingData.passengers.forEach((guest, index) => {
        doc.setFontSize(10)
        doc.text(`${index + 1}. ${guest.name} (Age: ${guest.age})`, 20, yPos)
        yPos += 8
      })
      
      yPos += 10
    }
    
    // Booking information
    doc.setFontSize(14)
    doc.text('Booking Information', 20, yPos)
    yPos += 15
    
    doc.setFontSize(10)
    if (bookingData.contactDetails) {
      doc.text(`Email: ${bookingData.contactDetails.email || 'N/A'}`, 20, yPos)
      doc.text(`Phone: ${bookingData.contactDetails.phone || 'N/A'}`, 20, yPos + 8)
      yPos += 20
    }
    
    doc.text(`Total Amount: ${hotelInfo.price || bookingData.totalAmount || 'N/A'}`, 20, yPos)
    doc.text(`Payment Status: ${bookingData.paymentStatus || 'Paid'}`, 20, yPos + 8)
    doc.text(`Booking Status: ${bookingData.status || 'Confirmed'}`, 20, yPos + 16)
    
    addPDFFooter(doc)
    
    const fileName = `hotel_booking_${bookingData.bookingId || Date.now()}.pdf`
    doc.save(fileName)
    
    console.log('Hotel PDF generated successfully')
    return { success: true, fileName }
  } catch (error) {
    console.error('Hotel PDF generation error:', error)
    throw new Error(`Failed to generate hotel PDF: ${error.message}`)
  }
}

// Generate Train Booking PDF
export const generateTrainPDF = async (bookingData) => {
  try {
    console.log('Generating train PDF for:', bookingData)
    
    const doc = new jsPDF()
    let yPos = addPDFHeader(doc, 'Train Ticket', bookingData)
    
    // Train details section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Train Details', 20, yPos)
    yPos += 15
    
    const trainInfo = bookingData.train || bookingData.selectedTrain || {}
    
    doc.setFontSize(10)
    doc.text(`Train: ${trainInfo.train_name || 'N/A'} (${trainInfo.train_number || 'N/A'})`, 20, yPos)
    doc.text(`Route: ${trainInfo.from || 'N/A'} → ${trainInfo.to || 'N/A'}`, 20, yPos + 8)
    doc.text(`Date: ${trainInfo.date || bookingData.journeyDate || 'N/A'}`, 20, yPos + 16)
    doc.text(`Departure: ${trainInfo.departure_time || 'N/A'}`, 20, yPos + 24)
    doc.text(`Arrival: ${trainInfo.arrival_time || 'N/A'}`, 120, yPos + 24)
    doc.text(`Duration: ${trainInfo.duration || 'N/A'}`, 20, yPos + 32)
    doc.text(`Distance: ${trainInfo.distance || 'N/A'}`, 120, yPos + 32)
    
    if (bookingData.pnr) {
      doc.setFontSize(12)
      doc.setTextColor(220, 53, 69) // Red color for PNR
      doc.text(`PNR: ${bookingData.pnr}`, 20, yPos + 45)
    }
    
    if (bookingData.seat && bookingData.coach) {
      doc.setFontSize(10)
      doc.setTextColor(40, 167, 69) // Green color for seat
      doc.text(`Seat: ${bookingData.coach}-${bookingData.seat}`, 120, yPos + 45)
    }
    
    yPos += 60
    
    // Passenger details
    if (bookingData.passengers && bookingData.passengers.length > 0) {
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text('Passenger Details', 20, yPos)
      yPos += 10
      
      const passengerData = bookingData.passengers.map((passenger, index) => [
        index + 1,
        passenger.name || 'N/A',
        passenger.age || 'N/A',
        passenger.gender || 'N/A',
        passenger.seat || 'TBD'
      ])
      
      doc.autoTable({
        startY: yPos,
        head: [['#', 'Name', 'Age', 'Gender', 'Seat']],
        body: passengerData,
        theme: 'grid',
        headStyles: { fillColor: [40, 167, 69] },
        margin: { left: 20, right: 20 }
      })
      
      yPos = doc.lastAutoTable.finalY + 20
    }
    
    // Booking information
    doc.setFontSize(14)
    doc.text('Booking Information', 20, yPos)
    yPos += 15
    
    doc.setFontSize(10)
    if (bookingData.contactDetails) {
      doc.text(`Email: ${bookingData.contactDetails.email || 'N/A'}`, 20, yPos)
      doc.text(`Phone: ${bookingData.contactDetails.phone || 'N/A'}`, 20, yPos + 8)
      yPos += 20
    }
    
    doc.text(`Total Amount: ${bookingData.totalAmount || 'N/A'}`, 20, yPos)
    doc.text(`Payment Status: ${bookingData.paymentStatus || 'Paid'}`, 20, yPos + 8)
    doc.text(`Booking Status: ${bookingData.status || 'Confirmed'}`, 20, yPos + 16)
    doc.text(`Quota: ${bookingData.quota || 'GN'}`, 120, yPos + 16)
    
    addPDFFooter(doc)
    
    const fileName = `train_ticket_${bookingData.pnr || bookingData.bookingId || Date.now()}.pdf`
    doc.save(fileName)
    
    console.log('Train PDF generated successfully')
    return { success: true, fileName }
  } catch (error) {
    console.error('Train PDF generation error:', error)
    throw new Error(`Failed to generate train PDF: ${error.message}`)
  }
}

// Generate Insurance Policy PDF
export const generateInsurancePDF = async (bookingData) => {
  try {
    console.log('Generating insurance PDF for:', bookingData)
    
    const doc = new jsPDF()
    let yPos = addPDFHeader(doc, 'Travel Insurance Policy', bookingData)
    
    // Insurance details section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Policy Details', 20, yPos)
    yPos += 15
    
    const insuranceInfo = bookingData.insurance || bookingData.selectedInsurance || {}
    
    doc.setFontSize(10)
    doc.text(`Provider: ${insuranceInfo.provider || 'N/A'}`, 20, yPos)
    doc.text(`Plan: ${insuranceInfo.planName || 'N/A'}`, 20, yPos + 8)
    doc.text(`Coverage: ${insuranceInfo.coverage || 'N/A'}`, 20, yPos + 16)
    doc.text(`Premium: ${insuranceInfo.premium || bookingData.totalAmount || 'N/A'}`, 20, yPos + 24)
    doc.text(`Duration: ${insuranceInfo.duration || 'N/A'}`, 120, yPos + 24)
    doc.text(`Rating: ${insuranceInfo.rating ? insuranceInfo.rating + ' ⭐' : 'N/A'}`, 120, yPos + 16)
    
    if (bookingData.policyNumber) {
      doc.setFontSize(12)
      doc.setTextColor(255, 193, 7) // Yellow color for policy number
      doc.text(`Policy Number: ${bookingData.policyNumber}`, 20, yPos + 37)
    }
    
    yPos += 50
    
    // Coverage features
    if (insuranceInfo.features && insuranceInfo.features.length > 0) {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text('Coverage Features', 20, yPos)
      yPos += 10
      
      insuranceInfo.features.forEach((feature, index) => {
        if (index % 2 === 0 && index > 0) yPos += 8
        doc.setFontSize(9)
        doc.text(`✓ ${feature}`, 20 + (index % 2) * 90, yPos)
      })
      
      yPos += 20
    }
    
    // Policyholder details
    if (bookingData.customer || bookingData.passengers) {
      doc.setFontSize(14)
      doc.text('Policyholder Details', 20, yPos)
      yPos += 15
      
      const customer = bookingData.customer || bookingData.passengers?.[0] || {}
      doc.setFontSize(10)
      doc.text(`Name: ${customer.name || 'N/A'}`, 20, yPos)
      doc.text(`Age: ${customer.age || 'N/A'}`, 20, yPos + 8)
      doc.text(`Email: ${customer.email || bookingData.contactDetails?.email || 'N/A'}`, 20, yPos + 16)
      doc.text(`Phone: ${customer.phone || bookingData.contactDetails?.phone || 'N/A'}`, 20, yPos + 24)
      
      yPos += 35
    }
    
    // Policy information
    doc.setFontSize(14)
    doc.text('Policy Information', 20, yPos)
    yPos += 15
    
    doc.setFontSize(10)
    doc.text(`Valid From: ${bookingData.validFrom || bookingData.startDate || 'N/A'}`, 20, yPos)
    doc.text(`Valid To: ${bookingData.validTo || bookingData.endDate || 'N/A'}`, 120, yPos)
    doc.text(`Policy Status: ${bookingData.status || 'Active'}`, 20, yPos + 8)
    doc.text(`Payment Status: ${bookingData.paymentStatus || 'Paid'}`, 120, yPos + 8)
    
    addPDFFooter(doc)
    
    const fileName = `insurance_policy_${bookingData.policyNumber || bookingData.bookingId || Date.now()}.pdf`
    doc.save(fileName)
    
    console.log('Insurance PDF generated successfully')
    return { success: true, fileName }
  } catch (error) {
    console.error('Insurance PDF generation error:', error)
    throw new Error(`Failed to generate insurance PDF: ${error.message}`)
  }
}

// Main PDF generation function (backward compatibility)
export const generateBookingPDF = async (bookingData) => {
  try {
    console.log('Generating PDF for booking type:', bookingData.type)
    
    switch (bookingData.type?.toLowerCase()) {
      case 'flight':
        return await generateFlightPDF(bookingData)
      case 'hotel':
        return await generateHotelPDF(bookingData)
      case 'train':
      case 'railway':
        return await generateTrainPDF(bookingData)
      case 'insurance':
      case 'travel-insurance':
        return await generateInsurancePDF(bookingData)
      default:
        // Generic PDF for unknown types
        const doc = new jsPDF()
        let yPos = addPDFHeader(doc, 'Booking Confirmation', bookingData)
        
        doc.setFontSize(12)
        doc.text(`Booking Type: ${bookingData.type || 'Generic'}`, 20, yPos)
        doc.text(`Booking ID: ${bookingData.bookingId || bookingData.id}`, 20, yPos + 10)
        doc.text(`Total Amount: ${bookingData.totalAmount || 'N/A'}`, 20, yPos + 20)
        doc.text(`Status: ${bookingData.status || 'Confirmed'}`, 20, yPos + 30)
        
        addPDFFooter(doc)
        
        const fileName = `booking_${bookingData.bookingId || Date.now()}.pdf`
        doc.save(fileName)
        
        return { success: true, fileName }
    }
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error(`Failed to generate PDF: ${error.message}`)
  }
}

// Export all functions
export default {
  generateBookingPDF,
  generateFlightPDF,
  generateHotelPDF,
  generateTrainPDF,
  generateInsurancePDF
}
