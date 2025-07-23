// ===== SERVICES INDEX =====
// Main entry point for all services
// This file provides organized access to all service modules

// API Services
export * from './api/index.js'

// Storage Services
export * from './storage/bookingStorage.js'

// Utility Services
export * from './utils/pdfGenerator.js'

// Default exports
import apiServices from './api/index.js'
import * as storageServices from './storage/bookingStorage.js'
import * as pdfServices from './utils/pdfGenerator.js'

export default {
  api: apiServices,
  storage: storageServices,
  pdf: pdfServices
}
