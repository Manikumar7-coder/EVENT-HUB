# EventHub

EventHub is a modern full-stack event management platform built with the MERN stack. It showcases premium event discovery, booking, simulated Razorpay-style payments, QR ticket generation, and a polished SaaS-style experience for portfolio presentation.

## Features
- Stunning landing page with animated hero, search, and featured cards
- Event discovery with search and category filters
- Simulated Razorpay checkout flow
- Booking and payment APIs backed by MongoDB
- Responsive, premium UI with glassmorphism and gradients

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Getting Started
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables
Create a backend .env file with:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventhub
JWT_SECRET=eventhub_super_secret_key
CLIENT_URL=http://localhost:5173
```

## Folder Structure
- frontend/src for React screens and reusable UI
- backend/src for Express routes, controllers, models, and middleware

## Future Improvements
- Cloudinary image uploads
- Real payment gateway integration
- Organizer and admin dashboards
- QR ticket download and email confirmations
