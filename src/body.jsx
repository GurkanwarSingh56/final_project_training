import { useState } from 'react'
import './index.css'
import img1 from './assets/specialofferimg/img1.png'
import img2 from './assets/specialofferimg/img2.png'
import img3 from './assets/specialofferimg/img3.png'
import img4 from './assets/specialofferimg/img4.png'
// Temporarily comment out Dialog to test if it's causing issues
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

function Body() {
    // Add the missing state for the modal
    const [open, setOpen] = useState(false)

   return (
        <>
            {/* Features Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-lg text-gray-600">Book with confidence and enjoy these amazing benefits</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                            <p className="text-gray-600">We'll match any lower price you find elsewhere</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Round-the-clock customer support for peace of mind</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Booking</h3>
                            <p className="text-gray-600">Book flights instantly with immediate confirmation</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Special Offers */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
                        <p className="text-lg text-gray-600">Don't miss out on these amazing deals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* DOM HOTELS Offer */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-80"
                                            style={{ backgroundImage: `url(${img1})` }}>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                                <span className="text-white font-bold text-sm">OBEROI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-gray-600 text-sm font-medium">DOM HOTELS</h3>
                                            <h2 className="text-xl font-bold text-gray-900 mt-1">Recharge Yourself with a Relaxing Stay:</h2>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">T&C'S APPLY</span>
                                    </div>
                                    <div className="w-8 h-1 bg-red-500 mb-4"></div>
                                    <p className="text-gray-600 mb-6">Save Up to 25%* on Stays @ Oberoi Hotels & Resorts!</p>
                                    <button 
                                        onClick={() => setOpen(true)}
                                        className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                                    >
                                        VIEW DETAILS
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DOM FLIGHTS Offer */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                                       <div className="absolute inset-0 bg-cover bg-center opacity-80"
                                            style={{ backgroundImage: `url(${img2})` }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-gray-600 text-sm font-medium">DOM FLIGHTS</h3>
                                            <h2 className="text-xl font-bold text-gray-900 mt-1">Up to 20% OFF*</h2>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">T&C'S APPLY</span>
                                    </div>
                                    <div className="w-8 h-1 bg-red-500 mb-4"></div>
                                    <p className="text-gray-600 mb-6">on Domestic Flights</p>
                                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                                        BOOK NOW
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* INTL FLIGHTS Offer */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-80"
                                            style={{ backgroundImage: `url(${img1})` }}>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-gray-600 text-sm font-medium">INTL FLIGHTS</h3>
                                            <h2 className="text-xl font-bold text-gray-900 mt-1">DEALS THAT MIGHT CAUSE SUDDEN VACAY PLANS:</h2>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">T&C'S APPLY</span>
                                    </div>
                                    <div className="w-8 h-1 bg-red-500 mb-4"></div>
                                    <p className="text-gray-600 mb-6">Up to 40% OFF* on Flights, Hotels, Homestays Holiday Packages, Cabs, Buses & More</p>
                                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                                        BOOK NOW
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DOM HOTELS Premium Offer */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="w-48 h-48 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
                                       <div className="absolute inset-0 bg-cover bg-center opacity-80"
                                            style={{ backgroundImage: `url(${img4})` }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-gray-600 text-sm font-medium">DOM HOTELS</h3>
                                            <h2 className="text-xl font-bold text-gray-900 mt-1">Up to 40% OFF*</h2>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">T&C'S APPLY</span>
                                    </div>
                                    <div className="w-8 h-1 bg-red-500 mb-4"></div>
                                    <p className="text-gray-600 mb-6">on Hotels in India</p>
                                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                                        BOOK NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Take Off?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Join millions of travelers who trust us with their journey. Start planning your next adventure today.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
                        Start Booking Now
                    </button>
                </div>
            </div>

            {/* Hotel Details Modal - Simple div-based modal */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Oberoi Hotels & Resorts - Special Offer
                                    </h3>
                                    <div className="mt-4">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                            <h4 className="text-red-800 font-semibold mb-2">Save Up to 25%* on Luxury Stays</h4>
                                            <p className="text-red-700 text-sm">Limited time offer - Book now and save big on your next luxury getaway!</p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <h5 className="font-semibold text-gray-900 mb-2">Offer Details:</h5>
                                                <ul className="text-sm text-gray-600 space-y-2">
                                                    <li>• Up to 25% discount on room rates</li>
                                                    <li>• Valid at participating Oberoi Hotels & Resorts</li>
                                                    <li>• Complimentary breakfast for 2 guests</li>
                                                    <li>• Free Wi-Fi and spa access</li>
                                                    <li>• Flexible cancellation policy</li>
                                                </ul>
                                            </div>
                                            
                                            <div>
                                                <h5 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h5>
                                                <ul className="text-xs text-gray-500 space-y-1">
                                                    <li>• Valid for bookings made until Dec 31, 2025</li>
                                                    <li>• Check-in dates: Valid until March 31, 2026</li>
                                                    <li>• Minimum 2 nights stay required</li>
                                                    <li>• Subject to availability</li>
                                                    <li>• Cannot be combined with other offers</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            >
                                Book Now
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Body