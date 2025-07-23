import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Predefined user credentials
  const VALID_CREDENTIALS = {
    email: 'gurkawarsingh56@gmail.com',
    password: 'Booking@A1'
  }

  useEffect(() => {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Validate credentials
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        const userData = {
          email: email,
          name: 'Gurkawar Singh',
          id: 'user_001'
        }

        setIsAuthenticated(true)
        setUser(userData)
        
        // Store in localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(userData))
        
        return { success: true, message: 'Login successful' }
      } else {
        return { success: false, message: 'Invalid email or password' }
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const requireAuth = () => {
    if (isAuthenticated) {
      return { success: true }
    } else {
      return { 
        success: false, 
        message: 'Please login first to access this feature.'
      }
    }
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    requireAuth,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
