import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000, // 3 second timeout
      connectTimeoutMS: 3000,
    });
    
    await client.connect();
    db = client.db('travelflow');
    console.log('Connected to MongoDB Atlas successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Continuing without database connection...');
    return false;
  }
};

// Routes
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // If database is available, save to MongoDB
    if (db) {
      const contactData = {
        name,
        email,
        subject,
        message,
        submittedAt: new Date(),
        status: 'new'
      };

      const result = await db.collection('contacts').insertOne(contactData);
      
      res.json({ 
        success: true, 
        message: 'Contact form submitted successfully!',
        id: result.insertedId,
        savedToDatabase: true
      });
    } else {
      // Fallback: log to console if database not available
      console.log('Contact form submission (DB not available):', {
        name, email, subject, message, submittedAt: new Date()
      });
      
      res.json({ 
        success: true, 
        message: 'Contact form submitted successfully!',
        savedToDatabase: false,
        note: 'Database not available - data logged to console'
      });
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form. Please try again.' 
    });
  }
});

app.get('/api/contact/messages', async (req, res) => {
  try {
    if (db) {
      const messages = await db.collection('contacts')
        .find({})
        .sort({ submittedAt: -1 })
        .toArray();
      
      res.json({ 
        success: true, 
        data: messages 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Database not available',
        data: []
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching messages' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Contact API server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
const startServer = async () => {
  console.log('Starting contact API server...');
  const dbConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Contact API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Database status: ${dbConnected ? 'Connected' : 'Disconnected (fallback mode)'}`);
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
