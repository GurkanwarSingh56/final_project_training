
# 🌍 TravelFlow - Complete Travel Booking Application

A modern, full-stack travel booking platform built with React 19, Express.js, and MongoDB. Features comprehensive booking capabilities for flights, hotels, trains, and insurance with round-trip support and contact form integration.

## ✨ Features

### 🛫 **Flight Booking System**
- **One-way & Round-trip flights** with intelligent combinations
- **Multiple airlines support** (Air India, IndiGo, SpiceJet, Vistara, GoAir)
- **Dynamic pricing** with seasonal variations and deals
- **Best deal finder** for round-trip bookings
- **Flight comparison** with detailed information

### 🏨 **Hotel Reservation System**
- **Multi-city hotel search** across major destinations
- **Room type selection** (Standard, Deluxe, Suite, Presidential)
- **Amenities filtering** (WiFi, Pool, Gym, Spa, Restaurant)
- **Star rating system** (3-5 star properties)
- **Availability checking** with real-time updates

### 🚄 **Train Booking Platform**
- **Inter-city train search** across India
- **Multiple class options** (Sleeper, AC 3-Tier, AC 2-Tier, AC 1st Class)
- **PNR status checking** and ticket management
- **Route optimization** with timing details
- **Seat availability** tracking

### 🛡️ **Travel Insurance**
- **Multiple coverage types** (Basic, Standard, Premium, Comprehensive)
- **Destination-based pricing** (Domestic/International)
- **Age-adjusted premiums** with group discounts
- **Claims management** system
- **Policy document generation**

### 👤 **User Management**
- **Secure authentication** system
- **Personal dashboard** with booking history
- **Profile management** with preferences
- **Booking tracking** and modifications

### 📧 **Contact System**
- **MongoDB integration** for message persistence
- **Express.js API** with fallback support
- **Contact form** with validation
- **Admin message retrieval** capabilities

## � Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (for contact form)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GurkanwarSingh56/final_project_training.git
   cd "my-react-app copy"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file with your MongoDB connection
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   echo "DB_NAME=travelflow" >> .env
   echo "PORT=3001" >> .env
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start React development server
   npm run dev
   
   # Terminal 2: Start Express API server
   node contactServer.js
   ```

5. **Access the application**
   - **Frontend**: http://localhost:5173 (or 5174 if 5173 is busy)
   - **API**: http://localhost:3001
   - **Health Check**: http://localhost:3001/api/health

## 🏗️ Architecture Overview

### **Frontend Architecture (React 19 + Vite)**
```
src/
├── components/               # React Components
│   ├── auth/                # Authentication components
│   │   └── LoginPage.jsx    # User login interface
│   ├── booking/             # Booking-related components
│   │   ├── BookingHistory.jsx        # User booking history
│   │   └── PassengerDetailsModal.jsx # Passenger info modal
│   ├── BookingModal.jsx     # Main booking modal
│   ├── ContactPage.jsx      # Contact form with MongoDB
│   ├── Home.jsx             # Homepage component
│   ├── ServicePage.jsx      # Services overview
│   ├── TrainSearch.jsx      # Train search interface
│   └── YourBooking.jsx      # Booking management
├── contexts/                # React Context Providers
│   └── AuthContext.jsx     # Authentication state management
├── hooks/                   # Custom React Hooks
│   └── useTrainSearch.js    # Train search logic
├── services/                # Service Layer
│   ├── api/                 # API Services (Consolidated)
│   │   ├── flightAPI.js     # Flight booking service
│   │   ├── hotelAPI.js      # Hotel reservation service
│   │   ├── trainSearchAPI.js # Train booking service
│   │   ├── insuranceAPI.js  # Insurance service
│   │   └── contactAPI.js    # Contact form API client
│   ├── storage/             # Local Storage Management
│   │   └── bookingStorage.js # Booking persistence
│   └── utils/               # Utility Services
│       └── pdfGenerator.js  # PDF generation service
└── utils/                   # Utility Functions
```

### **Backend Architecture (Express.js + MongoDB)**
```
Backend/
├── contactServer.js         # Express API server
├── services/
│   └── mongoService.js      # MongoDB connection service
└── .env                     # Environment configuration
```

## � Data Architecture

### **Mock Data System**
The application uses a sophisticated mock data system that simulates real-world scenarios:

#### **Flight Data Structure**
```javascript
{
  id: "unique_flight_id",
  airline: "Air India",
  flightNumber: "AI101",
  departure: {
    city: "New Delhi",
    airport: "DEL",
    time: "06:00",
    terminal: "Terminal 3"
  },
  arrival: {
    city: "Mumbai",
    airport: "BOM", 
    time: "08:30",
    terminal: "Terminal 2"
  },
  duration: "2h 30m",
  price: 4500,
  availability: 45,
  class: "Economy"
}
```

#### **Hotel Data Structure**
```javascript
{
  id: "unique_hotel_id",
  name: "The Taj Mahal Palace",
  location: "Mumbai",
  stars: 5,
  rating: 4.8,
  amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
  rooms: {
    standard: { price: 8000, available: 5 },
    deluxe: { price: 12000, available: 3 },
    suite: { price: 25000, available: 2 }
  },
  images: ["hotel1.jpg"],
  description: "Luxury heritage hotel..."
}
```

#### **MongoDB Contact Schema**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: Date,
  status: String // 'new', 'read', 'replied'
}
```

## 🔧 API Endpoints

### **Contact API (Express.js)**
```javascript
// Health Check
GET /api/health
Response: { success: true, message: "Server running", timestamp: ISO_DATE }

// Submit Contact Form
POST /api/contact/submit
Body: { name, email, subject, message }
Response: { success: true, message: "Submitted successfully", id: ObjectId }

// Get All Messages (Admin)
GET /api/contact/messages
Response: { success: true, data: [contact_objects] }
```

### **Frontend API Services**
```javascript
// Flight API
searchFlights(searchParams) // One-way & round-trip
bookFlight(flightData)
getBestRoundTripDeals(origin, destination)

// Hotel API  
searchHotels(city, checkIn, checkOut, guests)
bookHotel(hotelData)
getHotelDeals()

// Train API
searchTrains(from, to, date)
bookTrain(trainData) 
checkPNRStatus(pnr)

// Insurance API
getInsuranceQuote(destination, travelers, coverage)
purchaseInsurance(quoteData)
```

## 🎨 UI/UX Features

### **Design System**
- **Tailwind CSS** for utility-first styling
- **Responsive design** for all screen sizes
- **Consistent color scheme** with brand colors
- **Interactive elements** with hover effects
- **Loading states** and error handling

### **User Experience**
- **Intuitive navigation** with React Router
- **Form validation** with real-time feedback
- **Modal dialogs** for booking confirmations
- **PDF downloads** for booking receipts
- **Local storage** for user preferences

## � Round-Trip Flight System

### **Smart Combination Logic**
```javascript
// Combines outbound and return flights intelligently
const findRoundTripCombinations = (outboundFlights, returnFlights) => {
  return outboundFlights.flatMap(outbound => 
    returnFlights.map(returnFlight => ({
      outbound,
      return: returnFlight,
      totalPrice: outbound.price + returnFlight.price,
      totalDuration: calculateTotalDuration(outbound, returnFlight)
    }))
  ).sort((a, b) => a.totalPrice - b.totalPrice);
};
```

### **Deal Detection**
- **Price comparison** across combinations
- **Best value identification** (price vs. convenience)
- **Airline preference** matching
- **Time optimization** for connections

## 📱 Component Architecture

### **Smart Components (State Management)**
```javascript
// AuthContext.jsx - Global authentication state
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// useTrainSearch.js - Custom hook for train search logic
export const useTrainSearch = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  // Search logic...
};
```

### **Presentation Components**
```javascript
// BookingModal.jsx - Reusable booking interface
const BookingModal = ({ isOpen, onClose, bookingData }) => {
  // Modal logic with form handling
};

// ContactPage.jsx - Contact form with API integration
const ContactPage = () => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    // Form submission with API call
  };
};
```

## 🛠️ Development Tools

### **Build Configuration**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### **Linting & Code Quality**
```javascript
// eslint.config.js
export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...react.configs.flat.recommended,
  // Additional rules...
];
```

## 🚀 Deployment Guide

### **Vercel Deployment (Recommended)**
1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Environment variables** (Vercel Dashboard)
   ```
   MONGODB_URI=your_mongodb_atlas_connection
   DB_NAME=travelflow
   NODE_ENV=production
   ```

3. **Deploy frontend**
   - Connect GitHub repository to Vercel
   - Auto-deploy on push to main branch

4. **API Functions** (Vercel Serverless)
   ```javascript
   // api/contact.js
   export default async function handler(req, res) {
     // Your contact API logic
   }
   ```

### **Alternative Deployments**
- **Netlify**: Similar to Vercel with Netlify Functions
- **Railway**: Full-stack deployment with database
- **Render**: Combined frontend/backend hosting

## 📝 Environment Configuration

### **Development (.env)**
```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelflow
DB_NAME=travelflow
COLLECTION_NAME=contact_messages

# Server Configuration  
PORT=3001
NODE_ENV=development
```

### **Production Environment**
```bash
# Same variables but with production values
MONGODB_URI=production_mongodb_uri
NODE_ENV=production
PORT=3001
```

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Flight search (one-way and round-trip)
- [ ] Hotel booking with different room types
- [ ] Train search and PNR status check
- [ ] Insurance quote generation
- [ ] Contact form submission
- [ ] PDF generation for all booking types
- [ ] User authentication flow
- [ ] Responsive design on mobile/desktop

### **API Testing**
```bash
# Test contact form API
curl -X POST http://localhost:3001/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Testing"}'

# Health check
curl http://localhost:3001/api/health
```

## 🔧 Troubleshooting

### **Common Issues**

**MongoDB Connection Timeout**
```javascript
// Solution: Check network/firewall settings
MongoDB connection error: queryTxt ETIMEOUT cluster0.txkxphy.mongodb.net
// App continues in fallback mode
```

**Port Already in Use**
```bash
# Vite automatically finds next available port
Port 5173 is in use, trying another one...
# App will run on 5174
```

**ES Module Issues**
```javascript
// Ensure package.json has:
"type": "module"
// Use import/export instead of require
```

## � Learning Resources

### **Technologies Used**
- [React 19 Documentation](https://react.dev)
- [Vite Build Tool](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

### **Advanced Features**
- React Context for state management
- Custom hooks for business logic
- PDF generation with jsPDF
- Local storage for persistence
- RESTful API design

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gurkanwar Singh**
- GitHub: [@GurkanwarSingh56](https://github.com/GurkanwarSingh56)
- Location: Rayat Bahra, Hoshiarpur, India

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the powerful database solution
- Vite for the lightning-fast development experience

---

**Built with ❤️ for travelers worldwide** 🌍✈️🏨🚄
