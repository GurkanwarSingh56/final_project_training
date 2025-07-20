import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import Booking from './booking.jsx'
import Body from './body.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <Booking />
            <Body />
          </>
        )
      case 'booking':
        return <div className="min-h-screen bg-gray-100 p-8"><h1 className="text-3xl font-bold text-center">Your Bookings</h1></div>
      case 'services':
        return <div className="min-h-screen bg-gray-100 p-8"><h1 className="text-3xl font-bold text-center">Our Services</h1></div>
      case 'contact':
        return <div className="min-h-screen bg-gray-100 p-8"><h1 className="text-3xl font-bold text-center">Contact Us</h1></div>
      default:
        return (
          <>
            <Booking />
            <Body />
          </>
        )
    }
  }

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
