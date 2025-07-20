import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Mock flight search endpoint
app.post('/api/search-flights', (req, res) => {
  console.log('Flight search request:', req.body);
  
  const { origin, destination, earliestDepartureDate, numAdultPassengers } = req.body;
  
  // Mock flight data
  const mockFlights = [
    {
      airline: "Air India",
      flight_number: "AI-101",
      origin: origin || "Delhi",
      destination: destination || "Mumbai",
      departure_time: "06:00",
      arrival_time: "09:30",
      duration: "3h 30m",
      price: "₹4,500",
      flight_url: "https://airindia.in/booking"
    },
    {
      airline: "IndiGo",
      flight_number: "6E-202",
      origin: origin || "Delhi", 
      destination: destination || "Mumbai",
      departure_time: "10:15",
      arrival_time: "13:45",
      duration: "3h 30m",
      price: "₹3,200",
      flight_url: "https://goindigo.in/booking"
    },
    {
      airline: "SpiceJet",
      flight_number: "SG-303",
      origin: origin || "Delhi",
      destination: destination || "Mumbai", 
      departure_time: "16:30",
      arrival_time: "20:00",
      duration: "3h 30m",
      price: "₹2,800",
      flight_url: "https://spicejet.com/booking"
    }
  ];
  
  // Simulate API delay
  setTimeout(() => {
    res.json({
      flights: mockFlights,
      message: 'Flights found successfully'
    });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Flight API server running at http://localhost:${port}`);
  console.log(`Test endpoint: POST http://localhost:${port}/api/search-flights`);
});
