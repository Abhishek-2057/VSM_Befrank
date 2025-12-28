import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, CircleUser, Menu, X, ChevronDown, ChevronUp } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import vsmlogo from "../assets/vsmthane-logo.jpg";

// Navigation items
const navItems = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Our Initiatives", path: "/our-initiatives" }, // Now has dropdown logic
  { name: "Events", path: "/events" }, 
  { name: "Contact us", path: "/contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("About us");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Mobile sub-menu states
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [mobileInitiativesOpen, setMobileInitiativesOpen] = useState(false); // NEW

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
    // Reset submenus when closing drawer
    if (mobileOpen) {
        setMobileEventsOpen(false);
        setMobileInitiativesOpen(false);
    }
  };

  const toggleMobileEvents = (e) => {
    e.preventDefault(); 
    setMobileEventsOpen((prev) => !prev);
  };

  const toggleMobileInitiatives = (e) => {
    e.preventDefault(); 
    setMobileInitiativesOpen((prev) => !prev);
  };

  // --- Scroll Logic for Events Page ---
  const handleScrollToEventSection = (sectionId) => {
    setMobileOpen(false);
    setActive("Events");

    if (location.pathname === "/events") {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/events");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // --- NEW: Scroll Logic for Initiatives Page ---
  const handleScrollToInitiativeSection = (sectionId) => {
    setMobileOpen(false);
    setActive("Our Initiatives");

    if (location.pathname === "/our-initiatives") {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/our-initiatives");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 h-17 w-full bg-white shadow-sm">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-8 lg:px-10 h-full flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setActive("Home")}
            className="flex items-center"
          >
            <img
              src={vsmlogo}
              alt="Logo"
              className="w-40 h-25 object-contain"
            />
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 h-full">
              {navItems.map((item) => {
                
                // --- 1. HANDLING "OUR INITIATIVES" DROPDOWN ---
                if (item.name === "Our Initiatives") {
                    return (
                      <div key={item.name} className="relative group h-full flex items-center">
                        <NavLink
                          to={item.path}
                          onClick={() => setActive(item.name)}
                          className={({ isActive }) =>
                            `flex items-center gap-1 pb-1 font-semibold transition-colors duration-300 ${
                              isActive
                                ? "text-black border-b-2 border-yellow-400"
                                : "text-gray-500 hover:text-black"
                            }`
                          }
                        >
                          {item.name}
                          <ChevronDown size={16} className="mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
                        </NavLink>
  
                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2">
                          <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                            {[
                                { label: "Be Frank For VSMers", id: "be-frank-vsmers" },
                                { label: "Be Frank School Chale Hum", id: "school-be-frank" },
                                { label: "VSM Mehfil", id: "mehfil" },
                                { label: "Book Bite", id: "book-bite" },
                                { label: "Vawsomes Blog", id: "blog" }
                            ].map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={() => handleScrollToInitiativeSection(subItem.id)}
                                    className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-yellow-50 hover:text-black transition-colors border-b border-gray-50 last:border-b-0 cursor-pointer"
                                >
                                    {subItem.label}
                                </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                // --- 2. HANDLING "EVENTS" DROPDOWN ---
                if (item.name === "Events") {
                  return (
                    <div key={item.name} className="relative group h-full flex items-center">
                      <NavLink
                        to={item.path}
                        onClick={() => setActive(item.name)}
                        className={({ isActive }) =>
                          `flex items-center gap-1 pb-1 font-semibold transition-colors duration-300 ${
                            isActive
                              ? "text-black border-b-2 border-yellow-400"
                              : "text-gray-500 hover:text-black"
                          }`
                        }
                      >
                        {item.name}
                        <ChevronDown size={16} className="mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
                      </NavLink>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                          <button
                            onClick={() => handleScrollToEventSection("school-be-frank")}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-yellow-50 hover:text-black transition-colors border-b border-gray-50 cursor-pointer"
                          >
                            School Be Frank
                          </button>
                          <button
                            onClick={() => handleScrollToEventSection("be-frank-for-vsmers")}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-yellow-50 hover:text-black transition-colors cursor-pointer"
                          >
                            Be Frank For Vsmers
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // --- 3. STANDARD NAV ITEMS ---
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setActive(item.name)}
                    className={({ isActive }) =>
                      `pb-1 font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-black border-b-2 border-yellow-400"
                          : "text-gray-500 hover:text-black"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* User Icon */}
            {auth.isAuthenticated ? (
              <Link aria-label="User account" to={"/admin/dashboard"}>
                <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
              </Link>
            ) : (
              <Link aria-label="User account" to={"/admin/login"}>
                <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleDrawerToggle}
              aria-label="Open menu"
              className="px-3 py-1 text-gray-700 rounded hover:bg-gray-100 outline-none focus:outline-none ring-0"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDrawerToggle}
              aria-label="Close menu"
              className="px-3 py-1 text-sm text-gray-700 rounded hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
                
              // --- 1. Mobile Handling for "Our Initiatives" ---
              if (item.name === "Our Initiatives") {
                return (
                    <li key={item.name} className="flex flex-col">
                    <div 
                        className="flex justify-between items-center w-full px-2 py-1 text-lg text-gray-600 font-normal cursor-pointer"
                        onClick={toggleMobileInitiatives}
                    >
                        <span>{item.name}</span>
                        {mobileInitiativesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${mobileInitiativesOpen ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-3 pl-6 border-l-2 border-gray-100 ml-3">
                            {[
                                { label: "Be Frank For Vsmers", id: "be-frank-vsmers" },
                                { label: "School Be Frank", id: "school-be-frank" },
                                { label: "Mehfil", id: "mehfil" },
                                { label: "Book Bite", id: "book-bite" },
                                { label: "Blog", id: "blog" }
                            ].map((subItem) => (
                                <div 
                                    key={subItem.id}
                                    onClick={() => handleScrollToInitiativeSection(subItem.id)}
                                    className="text-sm text-gray-500 hover:text-black cursor-pointer"
                                >
                                    {subItem.label}
                                </div>
                            ))}
                             <Link 
                                to="/our-initiatives"
                                onClick={() => { setActive("Our Initiatives"); handleDrawerToggle(); }}
                                className="text-sm text-[#f48321] font-semibold"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                  </li>
                );
              }

              // --- 2. Mobile Handling for "Events" ---
              if (item.name === "Events") {
                return (
                  <li key={item.name} className="flex flex-col">
                    <div 
                        className="flex justify-between items-center w-full px-2 py-1 text-lg text-gray-600 font-normal cursor-pointer"
                        onClick={toggleMobileEvents}
                    >
                        <span>{item.name}</span>
                        {mobileEventsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${mobileEventsOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-3 pl-6 border-l-2 border-gray-100 ml-3">
                            <div 
                                onClick={() => handleScrollToEventSection("school-be-frank")}
                                className="text-sm text-gray-500 hover:text-black cursor-pointer"
                            >
                                School Be Frank
                            </div>
                            <div 
                                onClick={() => handleScrollToEventSection("be-frank-for-vsmers")}
                                className="text-sm text-gray-500 hover:text-black cursor-pointer"
                            >
                                Be Frank For Vsmers
                            </div>
                             <Link 
                                to="/events"
                                onClick={() => { setActive("Events"); handleDrawerToggle(); }}
                                className="text-sm text-[#f48321] font-semibold"
                            >
                                View All Events
                            </Link>
                        </div>
                    </div>
                  </li>
                );
              }

              // --- 3. Standard Mobile Items ---
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      setActive(item.name);
                      handleDrawerToggle();
                    }}
                    className={({ isActive }) =>
                      `block px-2 py-1 text-lg ${
                        isActive
                          ? "text-black font-bold"
                          : "text-gray-600 font-normal"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}

            <li>
              {auth.isAuthenticated ? (
                <Link aria-label="User account" to={"/admin/dashboard"} onClick={handleDrawerToggle}>
                  <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                </Link>
              ) : (
                <Link aria-label="User account" to={"/admin/login"} onClick={handleDrawerToggle}>
                  <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={handleDrawerToggle}
        ></div>
      )}
    </>
  );
};

export default Navbar;