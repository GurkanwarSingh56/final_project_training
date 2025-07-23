import { useState } from 'react'

function ServicePage() {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      title: "Flight Booking",
      description: "Book domestic and international flights with competitive prices",
      icon: "✈️",
      features: [
        "Real-time flight search",
        "Multiple airlines comparison",
        "Instant booking confirmation",
        "E-tickets generation",
        "24/7 customer support"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Train Booking",
      description: "Book train tickets across India with IRCTC integration",
      icon: "🚂",
      features: [
        "IRCTC direct booking",
        "Real-time availability",
        "Seat selection options",
        "PNR status tracking",
        "Waiting list management"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Hotel Booking",
      description: "Find and book hotels worldwide with best rates",
      icon: "🏨",
      features: [
        "Global hotel database",
        "User reviews & ratings",
        "Free cancellation options",
        "Best price guarantee",
        "Instant confirmation"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Travel Insurance",
      description: "Protect your travel with comprehensive insurance plans",
      icon: "🛡️",
      features: [
        "Trip cancellation coverage",
        "Medical emergency support",
        "Baggage protection",
        "24/7 claim assistance",
        "Quick policy issuance"
      ],
      color: "from-orange-500 to-orange-600"
    }
  ]

  const additionalServices = [
    {
      title: "Visa Assistance",
      description: "Get help with visa applications and documentation",
      icon: "📄"
    },
    {
      title: "Travel Planning",
      description: "Custom itinerary planning for your perfect trip",
      icon: "🗺️"
    },
    {
      title: "Currency Exchange",
      description: "Best exchange rates for international travel",
      icon: "💱"
    },
    {
      title: "Car Rental",
      description: "Rent cars at your destination with ease",
      icon: "🚗"
    }
  ]

  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: "👥" },
    { label: "Cities Covered", value: "500+", icon: "🌍" },
    { label: "Bookings This Month", value: "12,000+", icon: "📊" },
    { label: "Success Rate", value: "99.8%", icon: "✅" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Travel, Our Expertise
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Comprehensive travel booking services designed to make your journey seamless and memorable
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✈️ Flights</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🚂 Trains</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🏨 Hotels</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🛡️ Insurance</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive travel booking solutions with real-time data and instant confirmations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="opacity-90">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-2xl">
                      {selectedService === service.id ? '−' : '+'}
                    </div>
                  </div>
                </div>
                
                {selectedService === service.id && (
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Additional Services</h2>
            <p className="text-gray-600">Complete travel solutions for all your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600">We're committed to making your travel experience exceptional</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Quick search results and instant booking confirmations</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Your data is protected with bank-level security</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944a11.955 11.955 0 00-8.887 3.736 11.955 11.955 0 000 16.688A11.955 11.955 0 0012 21.056a11.955 11.955 0 008.887-3.688 11.955 11.955 0 000-16.688A11.955 11.955 0 0012 2.944z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer assistance for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied travelers who trust us with their bookings</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Booking
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage
