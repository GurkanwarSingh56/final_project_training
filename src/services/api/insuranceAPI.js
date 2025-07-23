// ===== INSURANCE API SERVICE =====
// Consolidated Insurance API with Mock Data
// This file contains all insurance-related functionality including quotes, policy management, and claims

// Mock insurance data for testing without real APIs
const mockInsuranceData = [
  {
    id: 1,
    provider: "TravelSafe Insurance",
    planName: "Basic Travel Protection",
    coverage: "₹2,00,000",
    premium: "₹850",
    price: "₹850",
    originalPremium: "₹1,200",
    originalPrice: "₹1,200",
    discount: "29% off",
    features: [
      "Medical Emergency Coverage",
      "Trip Cancellation",
      "Baggage Loss Protection",
      "24/7 Customer Support",
      "Emergency Evacuation"
    ],
    duration: "Up to 30 days",
    regions: ["Domestic", "Asia"],
    ageLimit: "18-70 years",
    rating: 4.2,
    claimRatio: "92%",
    popular: false
  },
  {
    id: 2,
    provider: "SecureJourney",
    planName: "Comprehensive Travel Shield",
    coverage: "₹5,00,000",
    premium: "₹1,450",
    price: "₹1,450",
    originalPremium: "₹1,850",
    originalPrice: "₹1,850",
    discount: "22% off",
    features: [
      "Medical Emergency Coverage",
      "Trip Cancellation & Interruption",
      "Baggage & Personal Effects",
      "Flight Delay Compensation",
      "Emergency Evacuation",
      "Personal Liability",
      "Adventure Sports Coverage"
    ],
    duration: "Up to 90 days",
    regions: ["Worldwide", "Including USA"],
    ageLimit: "18-75 years",
    rating: 4.5,
    claimRatio: "95%",
    popular: true
  },
  {
    id: 3,
    provider: "GlobalProtect",
    planName: "Premium Worldwide Coverage",
    coverage: "₹10,00,000",
    premium: "₹2,200",
    price: "₹2,200",
    originalPremium: "₹2,800",
    originalPrice: "₹2,800",
    discount: "21% off",
    features: [
      "Medical Emergency Coverage",
      "Trip Cancellation & Interruption",
      "Baggage & Personal Effects",
      "Flight Delay Compensation",
      "Emergency Evacuation",
      "Personal Liability",
      "Adventure Sports Coverage",
      "Business Equipment",
      "Rental Car Coverage"
    ],
    duration: "Up to 180 days",
    regions: ["Worldwide", "Including USA & Canada"],
    ageLimit: "18-80 years",
    rating: 4.7,
    claimRatio: "97%",
    popular: false
  }
];

const insuranceProviders = [
  "TravelSafe Insurance", "SecureJourney", "GlobalProtect", "SafeTravel Pro",
  "InsureMyTrip", "WorldNomads", "TravelGuard", "Allianz Travel"
];

const planTypes = [
  "Basic Travel Protection", "Comprehensive Travel Shield", "Premium Worldwide Coverage",
  "Student Travel Plan", "Family Travel Package", "Business Travel Insurance",
  "Adventure Sports Coverage", "Cruise Travel Protection", "Senior Citizen Plan"
];

const coverageFeatures = [
  "Medical Emergency Coverage", "Trip Cancellation", "Trip Interruption",
  "Baggage Loss Protection", "Flight Delay Compensation", "Emergency Evacuation",
  "Personal Liability", "Adventure Sports Coverage", "Business Equipment",
  "Rental Car Coverage", "24/7 Customer Support", "Pre-existing Medical Conditions",
  "Terrorism Coverage", "Natural Disaster Protection", "Missed Connection",
  "Emergency Cash Advance", "Legal Assistance", "Pet Coverage"
];

// Generate mock insurance based on search parameters
export const generateMockInsurance = (searchParams) => {
  const { destination, startDate, endDate, travelers, tripType, age } = searchParams;
  
  console.log('Generating mock insurance for:', { destination, startDate, endDate, travelers, tripType, age });
  
  const insurancePlans = [];
  
  // Generate 6-8 insurance plans
  const planCount = 6 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < planCount; i++) {
    const provider = insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)];
    const planName = planTypes[Math.floor(Math.random() * planTypes.length)];
    
    // Base coverage and premium calculation
    let baseCoverage = 200000; // Base ₹2,00,000
    let basePremium = 800;
    
    // Adjust based on destination
    if (destination?.toLowerCase().includes('usa') || destination?.toLowerCase().includes('europe')) {
      baseCoverage *= 5; // ₹10,00,000 for international
      basePremium *= 3;
    } else if (destination?.toLowerCase().includes('asia') || destination?.toLowerCase().includes('international')) {
      baseCoverage *= 2.5; // ₹5,00,000
      basePremium *= 2;
    }
    
    // Adjust based on age
    if (age && age > 60) {
      basePremium *= 1.5;
    } else if (age && age < 25) {
      basePremium *= 0.8;
    }
    
    // Adjust based on trip duration
    if (startDate && endDate) {
      const tripDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      basePremium *= Math.max(1, tripDays / 15); // Scale with trip length
    }
    
    // Add random variation
    const coverage = baseCoverage + Math.floor(Math.random() * baseCoverage * 0.5);
    const premium = basePremium + Math.floor(Math.random() * basePremium * 0.4);
    const discount = 15 + Math.floor(Math.random() * 25); // 15-40% discount
    const originalPremium = Math.floor(premium / (1 - discount / 100));
    
    // Select random features
    const featureCount = 5 + Math.floor(Math.random() * 8); // 5-12 features
    const selectedFeatures = [];
    const allFeatures = [...coverageFeatures];
    
    for (let j = 0; j < featureCount && allFeatures.length > 0; j++) {
      const randomIndex = Math.floor(Math.random() * allFeatures.length);
      selectedFeatures.push(allFeatures.splice(randomIndex, 1)[0]);
    }
    
    const rating = 3.8 + Math.random() * 1.2; // 3.8 to 5.0
    const claimRatio = 85 + Math.floor(Math.random() * 15); // 85-99%
    
    insurancePlans.push({
      id: `insurance-${i + 1}`,
      provider,
      planName,
      coverage: `₹${coverage.toLocaleString()}`,
      premium: `₹${premium.toLocaleString()}`,
      price: `₹${premium.toLocaleString()}`,
      originalPremium: `₹${originalPremium.toLocaleString()}`,
      originalPrice: `₹${originalPremium.toLocaleString()}`,
      discount: `${discount}% off`,
      features: selectedFeatures,
      duration: tripType === 'long-term' ? "Up to 365 days" : "Up to 90 days",
      regions: destination?.toLowerCase().includes('domestic') ? ["Domestic"] : 
               destination?.toLowerCase().includes('usa') ? ["Worldwide", "Including USA"] :
               ["Worldwide", "Excluding USA"],
      ageLimit: age ? `${Math.max(18, age - 10)}-${Math.min(80, age + 20)} years` : "18-75 years",
      rating: Math.round(rating * 10) / 10,
      claimRatio: `${claimRatio}%`,
      popular: i === 1, // Mark second plan as popular
      travelers: travelers || 1,
      destination: destination || "Worldwide"
    });
  }
  
  return insurancePlans.sort((a, b) => b.rating - a.rating); // Sort by rating
};

// ===== MAIN API FUNCTIONS =====

// Get insurance quotes with mock data
export const getInsuranceQuotes = async (searchParams) => {
  try {
    console.log('Getting insurance quotes with mock data:', searchParams);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock insurance data based on search parameters
    const mockInsurance = generateMockInsurance(searchParams);

    return {
      success: true,
      data: mockInsurance,
      message: 'Mock insurance quotes loaded successfully',
      total: mockInsurance.length,
      apiStatus: 'mock',
      provider: 'Mock Insurance Data Provider',
      searchParams
    };
  } catch (error) {
    console.error('Mock Insurance API Error:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      message: 'Unable to load mock insurance data.',
      apiStatus: 'error'
    };
  }
};

// Get insurance policy details by ID
export const getInsurancePolicyDetails = async (policyId) => {
  try {
    console.log('Getting insurance policy details for ID:', policyId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find policy in mock data or generate details
    let policyDetails = mockInsuranceData.find(policy => policy.id === policyId);
    
    if (!policyDetails) {
      // Generate mock details for dynamic policies
      policyDetails = {
        id: policyId,
        provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
        planName: planTypes[Math.floor(Math.random() * planTypes.length)],
        status: 'Active',
        policyNumber: `POL${Date.now().toString().slice(-8)}`,
        coverage: `₹${(500000 + Math.floor(Math.random() * 500000)).toLocaleString()}`,
        premium: `₹${(1000 + Math.floor(Math.random() * 2000)).toLocaleString()}`,
        validFrom: new Date().toISOString().split('T')[0],
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        features: coverageFeatures.slice(0, 8),
        emergencyContact: "+91-1800-XXX-XXXX",
        claimProcess: "Online claim submission available 24/7"
      };
    }
    
    return {
      success: true,
      data: policyDetails,
      message: 'Insurance policy details retrieved successfully'
    };
  } catch (error) {
    console.error('Mock Insurance Details Error:', error);
    return {
      success: false,
      error: error.message,
      data: null,
      message: 'Unable to get insurance policy details'
    };
  }
};

// Purchase insurance policy
export const purchaseInsurance = async (insuranceData, customerDetails) => {
  try {
    console.log('Purchasing insurance:', insuranceData, customerDetails);
    
    // Simulate purchase delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const policyId = `INS${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const policyNumber = `POL${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const policy = {
      policyId,
      policyNumber,
      type: 'travel-insurance',
      status: 'active',
      insurance: insuranceData,
      customer: customerDetails,
      purchaseDate: new Date().toISOString(),
      validFrom: customerDetails.startDate || new Date().toISOString().split('T')[0],
      validTo: customerDetails.endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalAmount: insuranceData.premium,
      paymentStatus: 'paid'
    };
    
    return {
      success: true,
      data: policy,
      message: 'Insurance policy purchased successfully',
      policyId,
      policyNumber
    };
  } catch (error) {
    console.error('Insurance purchase error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Insurance purchase failed'
    };
  }
};

// Cancel insurance policy
export const cancelInsurancePolicy = async (policyId) => {
  try {
    console.log('Canceling insurance policy:', policyId);
    
    // Simulate cancellation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Insurance policy canceled successfully',
      refundAmount: '₹800', // Partial refund
      cancellationFee: '₹200'
    };
  } catch (error) {
    console.error('Insurance cancellation error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Insurance cancellation failed'
    };
  }
};

// Submit insurance claim
export const submitClaim = async (claimData) => {
  try {
    console.log('Submitting insurance claim:', claimData);
    
    // Simulate claim submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const claimId = `CLM${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const claim = {
      claimId,
      policyId: claimData.policyId,
      type: claimData.type || 'medical',
      amount: claimData.amount,
      status: 'under-review',
      submissionDate: new Date().toISOString(),
      expectedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      documents: claimData.documents || []
    };
    
    return {
      success: true,
      data: claim,
      message: 'Insurance claim submitted successfully',
      claimId,
      trackingNumber: claimId
    };
  } catch (error) {
    console.error('Claim submission error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Claim submission failed'
    };
  }
};

// Get claim status
export const getClaimStatus = async (claimId) => {
  try {
    console.log('Getting claim status for:', claimId);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const statuses = ['under-review', 'approved', 'requires-documents', 'processed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      success: true,
      data: {
        claimId,
        status,
        lastUpdated: new Date().toISOString(),
        notes: 'Claim is being processed as per standard procedure'
      },
      message: 'Claim status retrieved successfully'
    };
  } catch (error) {
    console.error('Error getting claim status:', error);
    return {
      success: false,
      error: error.message,
      message: 'Unable to get claim status'
    };
  }
};

// Export all functions
export default {
  getInsuranceQuotes,
  getInsurancePolicyDetails,
  purchaseInsurance,
  cancelInsurancePolicy,
  submitClaim,
  getClaimStatus,
  generateMockInsurance
};
