import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation

// Public Page Imports
import Home from "./pages/home/Home"
import { About } from "./pages/about/about"
import { EventsPage } from "./pages/Our Initiatives/EventPage"
import { ContactPage } from "./pages/contact/contact"
import OurImpact from "./pages/Our Impact/OurImpact"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Common Components

import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
// --- ADMIN & AUTH IMPORTS ---
import { AuthProvider } from "./context/authContext" // Corrected import name
import { AdminLogin } from "./pages/admin/AdminLogin"
import { EventForm } from "./pages/admin/EventForm"
import { ProtectedRoute } from "./component/ProtectedRoute"
import { AdminDashboard } from "./pages/admin/AdminDashboard" // Keep this for the default view
import { AdminContactSubmissions } from "./pages/admin/ContactSubmissions"
import { AdminLayout } from "./pages/admin/AdminLayout"
import { GalleryPage } from "./pages/gallery/Gallery";
import { AllEventsPage } from "./pages/admin/AllEventsPage";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Identify admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <>
      {/* ✅ Show Navbar on login, hide on other admin pages */}
      {(!isAdminRoute || isLoginPage) && <Navbar />}

      {children}

      {/* ✅ Hide Footer only on admin login */}
      {!isAdminRoute && <Footer />}
    </>
  );
};



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <LayoutWrapper>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ourimpact" element={<OurImpact />} />
            <Route path="/gallery" element={<GalleryPage />} />

            {/* --- Admin Routes --- */}
            {/* Login page is outside the protected layout */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Section */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="create-event" element={<EventForm />} />
                <Route path="events" element={<AllEventsPage />} />
                <Route path="edit-event/:id" element={<EventForm />} />
                <Route path="contact-submissions" element={<AdminContactSubmissions />} />
              </Route>
            </Route>
          </Routes>
        </LayoutWrapper>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;