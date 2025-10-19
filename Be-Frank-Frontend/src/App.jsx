import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import { About } from "./pages/about/about"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import { EventsPage } from "./pages/Our Initiatives/EventPage"
import { ContactPage } from "./pages/contact/contact"
import OurImpact from "./pages/Our Impact/OurImpact"

// --- NEW IMPORTS ---
import { AdminLogin } from "./pages/admin/AdminLogin"
import { EventForm } from "./pages/admin/EventForm" // Your form from the previous step
import { ProtectedRoute } from "./component/ProtectedRoute"
import { AdminDashboard } from "./pages/admin/AdminDashboard"; // A new dashboard page
import { AuthProvider } from "./context/authContext"

function App() {
  return (
    // 1. Wrap your entire app in AuthProvider
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/initiatives" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ourimpact" element={<OurImpact />} />
          
          {/* --- Admin Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 3. Wrap your admin pages in the ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            {/* Any route inside here is protected.
              If you go to /admin/dashboard, it will check if you are logged in.
              If not, it will redirect you to /admin/login.
            */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-event" element={<EventForm />} />
            {/* You can add more admin routes here */}
          </Route>
          
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
