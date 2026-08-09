# 🎟️ EventHub

<div align="center">

**A modern full-stack event management platform** — discover events, book tickets, and manage everything through a polished, SaaS-style experience.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

[Live Demo](#) · [Report Bug](https://github.com/Manikumar7-coder/EVENT-HUB/issues) · [Request Feature](https://github.com/Manikumar7-coder/EVENT-HUB/issues)

</div>

---

## 📸 Preview

<!--
  Add real screenshots here! In your repo, create a folder called
  frontend/src/assets/screenshots (or docs/screenshots) and drop your
  images there, then update the paths below, e.g.:
  ![Landing Page](./docs/screenshots/landing.png)
-->

| Landing Page | Event Discovery |
|---|---|
| ![Landing Page](./docs/screenshots/LANDINGPAGE.png) | ![Event Discovery](./docs/screenshots/EVENTS.png) |

| Register Page | Testimonials |
|---|---|
| ![Register Page](./docs/screenshots/LOGINPAGE.png) | ![Testimonials](./docs/screenshots/TESTIMONIALS.png) |

---

## ✨ Features

- 🎨 **Stunning landing page** — animated hero, live search, featured event cards
- 🔍 **Smart event discovery** — search and filter by category
- 💳 **Simulated Razorpay checkout** — realistic payment flow for demo purposes
- 🎫 **QR ticket generation** — instantly generated, scannable tickets on booking
- 📱 **Fully responsive UI** — glassmorphism + gradient design system, mobile to desktop
- 🔐 **JWT authentication** — secure signup/login with bcrypt password hashing
- 🗄️ **MongoDB-backed APIs** — persistent events, bookings, payments, and reviews

---

## 🛠️ Tech Stack

**Frontend**
`React 19` · `Vite` · `Tailwind CSS 4` · `Framer Motion` · `React Router` · `Axios` · `Chart.js` · `React Hook Form`

**Backend**
`Node.js` · `Express` · `MongoDB` · `Mongoose` · `JWT` · `bcrypt`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

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

### Environment Variables
Create a `backend/.env` file (use `.env.example` as a template):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventhub
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

> ⚠️ Never commit your real `.env` file — it's already excluded via `.gitignore`.

---

## 📁 Folder Structure

```
EVENT-HUB/
├── frontend/
│   └── src/            # React screens, components, and reusable UI
├── backend/
│   └── src/
│       ├── models/      # Mongoose schemas
│       ├── routes/      # Express route definitions
│       ├── middleware/  # Auth & error-handling middleware
│       └── server.js    # App entry point
└── README.md
```

---

## 🗺️ Roadmap

- [ ] Cloudinary image uploads
- [ ] Real payment gateway integration (Razorpay live mode)
- [ ] Organizer and admin dashboards
- [ ] QR ticket download and email confirmations

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Manikumar7-coder">Mani Kumar</a>
</div>
