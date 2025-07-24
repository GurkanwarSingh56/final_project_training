# Footer Component Documentation

## Overview
A comprehensive footer component for the TravelFlow travel booking application, featuring company information, quick links, services overview, contact details, newsletter subscription, and social media links.

## Features

### 🏢 Company Information
- Brand logo and name
- Brief company description
- Social media links (Twitter, Facebook, Google, LinkedIn)

### 🔗 Quick Links
- Home page
- Services page
- Bookings page
- Contact page
- Login/Register page

### 🛠️ Services Section
- Flight Bookings (with plane icon)
- Train Reservations (with train icon)
- Hotel Bookings (with building icon)
- Travel Insurance (with shield icon)
- 24/7 Customer Support (with support icon)

### 📞 Contact Information
- Physical address with location icon
- Phone number with phone icon
- Email address with mail icon
- Business hours with clock icon

### 📧 Newsletter Subscription
- Email input field with validation
- Subscribe button with hover effects
- Success message after subscription
- Auto-reset after 3 seconds

### 💳 Payment Methods
- Visual display of accepted payment methods
- Visa, Mastercard, American Express, UPI logos

### 📄 Legal Links
- Privacy Policy
- Terms of Service
- Cookie Policy
- Refund Policy

## Technical Features

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Grid layout that adapts from 1 column (mobile) to 4 columns (desktop)
- Flexible footer sections that stack properly on smaller screens

### Interactive Elements
- Newsletter subscription with form handling
- Hover effects on all clickable elements
- Smooth transitions and animations
- Email validation and success feedback

### Accessibility
- Proper semantic HTML structure
- ARIA labels for icon buttons
- Keyboard navigation support
- Screen reader friendly content

## Usage

```jsx
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      {/* Your app content */}
      <Footer />
    </div>
  )
}
```

## Styling

The footer uses a dark theme with:
- `bg-gray-900` (dark background)
- `text-white` (white text)
- `border-gray-800` (subtle borders)
- Blue accent colors for branding
- Color-coded service icons

## Additional Components

### ScrollToTop Button
- Appears when user scrolls down 300px
- Smooth scroll animation to top
- Fixed positioning in bottom-right corner
- Blue theme matching the footer

## Customization

### Colors
All colors can be customized by modifying the Tailwind classes:
- Primary: `blue-600` / `blue-700`
- Background: `gray-900` / `gray-800`
- Text: `white` / `gray-300` / `gray-400`

### Social Media Links
Update the social media links in the company info section:
```jsx
<a href="https://twitter.com/yourhandle" className="...">
```

### Contact Information
Modify contact details in the contact info section:
```jsx
<p className="text-gray-300 text-sm">Your Address</p>
<p className="text-gray-300 text-sm">+91 Your Phone</p>
<p className="text-gray-300 text-sm">your@email.com</p>
```

### Newsletter Subscription
Connect to your email service API by modifying the `handleSubscribe` function:
```jsx
const handleSubscribe = async (e) => {
  e.preventDefault()
  // Add your API call here
  await subscribeToNewsletter(email)
}
```

## File Structure
```
src/
├── components/
│   ├── Footer.jsx          # Main footer component
│   └── ScrollToTop.jsx     # Scroll to top button
├── App.jsx                 # Footer integration
└── index.css              # Footer layout styles
```

## Dependencies
- React Router DOM (for navigation links)
- Tailwind CSS (for styling)
- React hooks (useState, useEffect for functionality)

## Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design
- Touch-friendly interface elements

## Performance
- Lightweight component with minimal JavaScript
- CSS-only animations where possible
- Optimized SVG icons for fast loading
