import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import { About } from "./pages/about/about"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import { EventsPage } from "./pages/Our Initiatives/EventPage"
import { ContactPage } from "./pages/contact/contact"
import OurImpact from "./pages/Our Impact/OurImpact"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/initiatives" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ourimpact" element={<OurImpact />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
