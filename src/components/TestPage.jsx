import { useState } from 'react'

function TestPage() {
  const [showModal, setShowModal] = useState(false)
  
  const mockBookingData = {
    passengers: 2,
    from: 'Delhi',
    to: 'Mumbai',
    date: '2025-07-25'
  }
  
  const mockSelectedItem = {
    airline: 'Test Airlines',
    flightNumber: 'TA123',
    price: '₹5,000',
    departure: 'Delhi',
    destination: 'Mumbai',
    departureTime: '10:00',
    arrivalTime: '12:30'
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PassengerDetailsModal Test</h1>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open Passenger Details Modal
      </button>
      
      {/* Import and use the actual modal component here for testing */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Passenger Details Modal Test</h2>
            <p className="mb-4">
              This is a simplified test version. The actual modal should open here with:
              <br />• Booking type: flight
              <br />• Passengers: 2
              <br />• Selected item: {mockSelectedItem.airline} {mockSelectedItem.flightNumber}
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestPage
