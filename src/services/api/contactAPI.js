// ===== CONTACT API SERVICE =====
// Client-side service for contact form submissions

const API_BASE_URL = 'http://localhost:3001/api'

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    console.log('Submitting contact form:', formData)
    
    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form')
    }
    
    console.log('Contact form submitted successfully:', result)
    return result
    
  } catch (error) {
    console.error('Error submitting contact form:', error)
    
    // If server is not available, return a mock success for development
    if (error.message.includes('fetch')) {
      console.warn('Server not available, using mock response')
      return {
        success: true,
        messageId: 'mock_' + Date.now(),
        message: 'Your message has been recorded (mock mode)',
        timestamp: new Date().toISOString()
      }
    }
    
    throw error
  }
}

// Get contact messages (admin function)
export const getContactMessages = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/messages?page=${page}&limit=${limit}`)
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get messages')
    }
    
    return result
    
  } catch (error) {
    console.error('Error getting contact messages:', error)
    throw error
  }
}

// Mark message as read (admin function)
export const markMessageAsRead = async (messageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/messages/${messageId}/read`, {
      method: 'PATCH'
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to mark message as read')
    }
    
    return result
    
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw error
  }
}

// Health check
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Server health check failed:', error)
    return { status: 'DOWN', error: error.message }
  }
}

export default {
  submitContactForm,
  getContactMessages,
  markMessageAsRead,
  checkServerHealth
}
