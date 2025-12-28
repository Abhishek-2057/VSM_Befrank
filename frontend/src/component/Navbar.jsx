import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // Added hooks
import { User, CircleUser, Menu, X, ChevronDown, ChevronUp } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import vsmlogo from "../assets/vsmthane-logo.jpg";

// Navigation items
const navItems = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Our Initiatives", path: "/our-initiatives" },
  { name: "Events", path: "/events" }, 
  { name: "Contact us", path: "/contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("About us");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
    if (mobileOpen) setMobileEventsOpen(false); 
  };

  const toggleMobileEvents = (e) => {
    e.preventDefault(); 
    setMobileEventsOpen((prev) => !prev);
  };

  // --- NEW: Function to handle scrolling ---
  const handleScrollToSection = (sectionId) => {
    // 1. Close mobile drawer if open
    setMobileOpen(false);
    setActive("Events");

    // 2. Check if we are already on the events page
    if (location.pathname === "/events") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // 3. If not on events page, navigate there first, then scroll
      navigate("/events");
      // Small timeout to allow the new page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
                
                // 1. Special Handling for "Events" Dropdown (Desktop)
                if (item.name === "Events") {
                  return (
                    <div
                      key={item.name}
                      className="relative group h-full flex items-center"
                    >
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
                        <ChevronDown
                          size={16}
                          className="mt-0.5 group-hover:rotate-180 transition-transform duration-200"
                        />
                      </NavLink>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                          {/* Use div/button instead of Link for scrolling behavior */}
                         
                          <div
                            onClick={() => handleScrollToSection("be-frank-for-vsmers")}
                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-yellow-50 hover:text-black transition-colors cursor-pointer"
                          >
                            Be Frank For Vsmers
                          </div>
                           <div
                            onClick={() => handleScrollToSection("school-be-frank")}
                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-yellow-50 hover:text-black transition-colors border-b border-gray-50 cursor-pointer"
                          >
                            School Be Frank
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 2. Standard Nav Items (Desktop)
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
                
              // 1. Special Handling for "Events" (Mobile Accordion)
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

                    {/* Sub-menu with transition */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileEventsOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-3 pl-6 border-l-2 border-gray-100 ml-3">
                            <div 
                                onClick={() => handleScrollToSection("school-be-frank")}
                                className="text-sm text-gray-500 hover:text-black cursor-pointer"
                            >
                                School Be Frank
                            </div>
                            <div 
                                onClick={() => handleScrollToSection("be-frank-for-vsmers")}
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

              // 2. Standard Nav Items (Mobile)
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
