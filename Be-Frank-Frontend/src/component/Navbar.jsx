import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User, CircleUser } from 'lucide-react'; // Import the User icon from lucide-react
import { useAuth } from "../context/authContext";
import vsmlogo from "../assets/vsmthane-logo.jpg"
import { Menu,X } from "lucide-react";


// Navigation items are defined in an array for easy mapping.
const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Our Initiatives', path: '/our-initiatives' }, // This was in the code but not the image
    { name: 'Events', path: '/events' },
    // { name: 'Gallery', path: '/gallery' },
    { name: 'Contact us', path: '/contact' }
];

const Navbar = () => {
    // State to track the active navigation link.
    const [active, setActive] = useState("About us"); // Set default to match image
    // State to control the mobile drawer visibility.
    const [mobileOpen, setMobileOpen] = useState(false);
    const auth = useAuth();
    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <>
            {/* Main Navigation Bar */}
            <nav className="sticky top-0 z-40 h-17 w-full bg-white shadow-sm">
                <div className="max-w-[90vw] mx-auto px-4 sm:px-8 lg:px-10 h-full flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setActive('Home')}
                        className="flex items-center"
                    >
                        <img
                            src={vsmlogo}
                            alt="Logo"
                            className="w-40 h-25 object-contain"  // adjust as per size
                        />
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Nav Links */}
                        <div className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setActive(item.name)}
                                    // Use a function in className to apply styles conditionally
                                    className={({ isActive }) =>
                                        `pb-1 font-semibold transition-colors duration-300 ${isActive
                                            ? 'text-black border-b-2 border-yellow-400'
                                            : 'text-gray-500 hover:text-black'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                        {/* User Icon */}
                        {auth.isAuthenticated ? <Link aria-label="User account" to={'/admin/dashboard'}>
                            <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                        </Link>
                            : <Link aria-label="User account" to={'/admin/login'}>
                                <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                            </Link>
                        }
                    </div>

                    {/* Mobile Menu Button (Text instead of Icon) */}
                    <div className="md:hidden">
                        <button
                            onClick={handleDrawerToggle}
                            aria-label="Open menu"
                            className="px-3 py-1 text-gray-700   rounded hover:bg-gray-100
               outline-none focus:outline-none active:outline-none ring-0 focus:ring-0"
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>

                </div>
            </nav>

            {/* Mobile Drawer (retained for responsiveness) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleDrawerToggle}
                            aria-label="Close menu"
                            className="px-3 py-1 text-sm text-gray-700   rounded hover:bg-gray-100"
                        >
                            <X className="w-6 h-6 text-gray-700"/>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        setActive(item.name);
                                        handleDrawerToggle(); // Close drawer on click
                                    }}
                                    className={({ isActive }) =>
                                        `block px-2 py-1 text-lg ${isActive
                                            ? 'text-black font-bold'
                                            : 'text-gray-600 font-normal'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}

                        <li>
                            {auth.isAuthenticated ? <Link aria-label="User account" to={'/admin/dashboard'}>
                                <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                            </Link>
                                : <Link aria-label="User account" to={'/admin/login'}>
                                    <CircleUser className="h-7 w-7 text-black" strokeWidth={2} />
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>

            {/* Overlay for when the drawer is open */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
                    onClick={handleDrawerToggle}
                ></div>
            )}
        </>
    );
};

export default Navbar