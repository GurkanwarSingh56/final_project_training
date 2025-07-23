import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Header from './Header.jsx'
import Home from './components/Home.jsx'
import BookingHistory from './components/booking/BookingHistory.jsx'
import LoginPage from './components/auth/LoginPage.jsx'
import ServicePage from './components/ServicePage.jsx'
import ContactPage from './components/ContactPage.jsx'
import TestPage from './components/TestPage.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<BookingHistory />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
