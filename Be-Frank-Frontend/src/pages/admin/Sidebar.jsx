import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusSquare, Mail, LogOut, LayoutDashboard } from 'lucide-react'; // Icons
import { useAuth } from '../../context/authContext';

export const Sidebar = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            auth.logout();
            navigate('/admin/login'); // Ensure redirection happens
        }
    };

    // Style for active NavLink
    const activeClassName = "flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg";
    // Style for inactive NavLink
    const inactiveClassName = "flex items-center px-4 py-3 text-blue-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors";

    return (
        <div className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed top-0 left-0 shadow-lg"> {/* Added fixed positioning */}
            {/* Logo or Title */}
            <div className="p-6 text-2xl font-semibold border-b border-blue-700">
                Admin Panel
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4 space-y-2">
                <NavLink
                    to="/admin/dashboard" // Link to the main dashboard overview
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                    end // Use 'end' for the base dashboard route
                >
                    <LayoutDashboard size={20} className="mr-3" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/create-event"
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                >
                    <PlusSquare size={20} className="mr-3" />
                    Create Event
                </NavLink>
                <NavLink
                    to="/admin/contact-submissions"
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                >
                    <Mail size={20} className="mr-3" />
                    Submissions
                </NavLink>
                {/* Add more links here as needed */}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-blue-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-200 hover:bg-red-700 hover:text-white rounded-lg transition-colors"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};