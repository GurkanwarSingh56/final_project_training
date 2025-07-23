import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'
import './index.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  const handleMyBookingsClick = () => {
    if (!isAuthenticated) {
      alert('Please log in to access your bookings!')
      navigate('/login')
    } else {
      navigate('/bookings')
    }
  }

  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-gray-800">TravelBook</h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <button
              onClick={handleMyBookingsClick}
              className={`${isActive('/bookings')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              My Bookings
            </button>
            <Link 
              to="/services" 
              className={`${isActive('/services')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Contact
            </Link>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:block">{user?.name || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user?.name || 'User'}</div>
                      <div className="text-gray-500 text-xs">{user?.email}</div>
                    </div>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Log In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  handleMyBookingsClick()
                  setIsMenuOpen(false)
                }}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                My Bookings
              </button>
              <Link 
                to="/services" 
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 border-t">
                    <div className="font-medium">{user?.name || 'User'}</div>
                    <div className="text-gray-500 text-xs">{user?.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
