// ===== MONGODB SERVICE =====
// Database connection and operations for contact messages

import { MongoClient } from 'mongodb'

let client = null
let db = null

// MongoDB connection configuration
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://gurkanwarsingh56:gavisaini@cluster0.txkxphy.mongodb.net/travelflow?retryWrites=true&w=majority&appName=Cluster0'
const DB_NAME = 'travelflow'
const COLLECTION_NAME = 'contact_messages'

// Connect to MongoDB
export const connectToDatabase = async () => {
  try {
    if (!client) {
      console.log('Connecting to MongoDB...')
      client = new MongoClient(MONGODB_URI, {
        useUnifiedTopology: true,
      })
      await client.connect()
      console.log('Connected to MongoDB successfully')
    }
    
    if (!db) {
      db = client.db(DB_NAME)
    }
    
    return { client, db }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error(`Failed to connect to MongoDB: ${error.message}`)
  }
}

// Save contact message to database
export const saveContactMessage = async (messageData) => {
  try {
    console.log('Saving contact message to database:', messageData)
    
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    // Prepare message document
    const messageDocument = {
      ...messageData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'new',
      ipAddress: null, // Could be added if needed
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      read: false,
      replied: false
    }
    
    // Insert document
    const result = await collection.insertOne(messageDocument)
    
    console.log('Contact message saved successfully:', result.insertedId)
    
    return {
      success: true,
      messageId: result.insertedId,
      message: 'Contact message saved successfully'
    }
  } catch (error) {
    console.error('Error saving contact message:', error)
    throw new Error(`Failed to save contact message: ${error.message}`)
  }
}

// Get all contact messages (for admin purposes)
export const getContactMessages = async (limit = 50, skip = 0) => {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()
    
    const total = await collection.countDocuments({})
    
    return {
      success: true,
      data: messages,
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error('Error getting contact messages:', error)
    throw new Error(`Failed to get contact messages: ${error.message}`)
  }
}

// Mark message as read
export const markMessageAsRead = async (messageId) => {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    const result = await collection.updateOne(
      { _id: messageId },
      { 
        $set: { 
          read: true, 
          readAt: new Date(),
          updatedAt: new Date()
        } 
      }
    )
    
    return {
      success: true,
      modifiedCount: result.modifiedCount
    }
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw new Error(`Failed to mark message as read: ${error.message}`)
  }
}

// Update message status
export const updateMessageStatus = async (messageId, status) => {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    const result = await collection.updateOne(
      { _id: messageId },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        } 
      }
    )
    
    return {
      success: true,
      modifiedCount: result.modifiedCount
    }
  } catch (error) {
    console.error('Error updating message status:', error)
    throw new Error(`Failed to update message status: ${error.message}`)
  }
}

// Close database connection
export const closeDatabaseConnection = async () => {
  try {
    if (client) {
      await client.close()
      client = null
      db = null
      console.log('MongoDB connection closed')
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
  }
}

// Export database service
export default {
  connectToDatabase,
  saveContactMessage,
  getContactMessages,
  markMessageAsRead,
  updateMessageStatus,
  closeDatabaseConnection
}
