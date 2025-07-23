// ===== CONTACT API SERVER =====
// Express server to handle contact form submissions with MongoDB integration

import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
const PORT = process.env.PORT || 3001

// MongoDB configuration
const MONGODB_URI = 'mongodb+srv://gurkanwarsingh56:gavisaini@cluster0.txkxphy.mongodb.net/travelflow?retryWrites=true&w=majority&appName=Cluster0'
const DB_NAME = 'travelflow'
const COLLECTION_NAME = 'contact_messages'

let db = null

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DB_NAME)
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Contact API server is running',
    timestamp: new Date().toISOString()
  })
})

// Submit contact form
app.post('/api/contact/submit', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body)
    
    const { name, email, phone, subject, message } = req.body
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required'
      })
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }
    
    // Prepare message document
    const messageDocument = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'new',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      read: false,
      replied: false,
      source: 'contact_form'
    }
    
    // Save to database
    const collection = db.collection(COLLECTION_NAME)
    const result = await collection.insertOne(messageDocument)
    
    console.log('Contact message saved with ID:', result.insertedId)
    
    // Send success response
    res.status(201).json({
      success: true,
      messageId: result.insertedId,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      timestamp: new Date().toISOString()
    })
    
    // Log for admin notification (in real app, you might send email notification)
    console.log(`New contact message from ${name} (${email}) - Subject: ${subject}`)
    
  } catch (error) {
    console.error('Error saving contact message:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Get all contact messages (admin endpoint)
app.get('/api/contact/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    
    const collection = db.collection(COLLECTION_NAME)
    
    // Get messages with pagination
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()
    
    // Get total count
    const total = await collection.countDocuments({})
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error getting contact messages:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get messages'
    })
  }
})

// Mark message as read
app.patch('/api/contact/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params
    const collection = db.collection(COLLECTION_NAME)
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          read: true, 
          readAt: new Date(),
          updatedAt: new Date()
        } 
      }
    )
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Message marked as read'
    })
    
  } catch (error) {
    console.error('Error marking message as read:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to mark message as read'
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  })
})

// Start server
const startServer = async () => {
  try {
    await connectToDatabase()
    
    app.listen(PORT, () => {
      console.log(`Contact API server running on port ${PORT}`)
      console.log(`Health check: http://localhost:${PORT}/api/health`)
      console.log(`Contact endpoint: http://localhost:${PORT}/api/contact/submit`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Shutting down server...')
  process.exit(0)
})

startServer()
