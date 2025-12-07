// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { PlusSquare, Mail, LogOut, LayoutDashboard } from 'lucide-react'; // Icons
// import { useAuth } from '../../context/authContext';

// export const Sidebar = () => {
//     const auth = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         if (window.confirm('Are you sure you want to log out?')) {
//             auth.logout();
//             navigate('/admin/login'); // Ensure redirection happens
//         }
//     };

//     // Style for active NavLink
//     const activeClassName = "flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg";
//     // Style for inactive NavLink
//     const inactiveClassName = "flex items-center px-4 py-3 text-blue-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors";

//     return (
//         <div className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed top-0 left-0 shadow-lg"> {/* Added fixed positioning */}
//             {/* Logo or Title */}
//             <div className="p-6 text-2xl font-semibold border-b border-blue-700">
//                 Admin Panel
//             </div>

//             {/* Navigation Links */}
//             <nav className="flex-grow p-4 space-y-2">
//                 <NavLink
//                     to="/admin/dashboard" // Link to the main dashboard overview
//                     className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
//                     end // Use 'end' for the base dashboard route
//                 >
//                     <LayoutDashboard size={20} className="mr-3" />
//                     Dashboard
//                 </NavLink>
//                 <NavLink
//                     to="/admin/events"
//                     className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
//                 >
//                     <PlusSquare size={20} className="mr-3" />
//                     Create Event
//                 </NavLink>
//                 <NavLink
//                     to="/admin/contact-submissions"
//                     className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
//                 >
//                     <Mail size={20} className="mr-3" />
//                     Submissions
//                 </NavLink>
//                 {/* Add more links here as needed */}
//             </nav>

//             {/* Logout Button */}
//             <div className="p-4 border-t border-blue-700">
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full px-4 py-3 text-red-200 hover:bg-red-700 hover:text-white rounded-lg transition-colors"
//                 >
//                     <LogOut size={20} className="mr-3" />
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusSquare, Mail, LogOut, LayoutDashboard } from 'lucide-react'; // Icons
import { useAuth } from '../../context/AuthContext';


export const Sidebar = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        // if (window.confirm('Are you sure you want to log out?')) {
            auth.logout();
            navigate('/admin/login'); // Ensure redirection happens
        // }
    };


    // Style for active NavLink - Enhanced with orange accent
    const activeClassName = "flex items-center px-4 py-3 bg-[#f48321] text-white rounded-xl font-medium shadow-lg transform transition-all duration-200";
    // Style for inactive NavLink - Improved hover states
    const inactiveClassName = "flex items-center px-4 py-3 text-gray-300 hover:bg-[#2692d1]/20 hover:text-white rounded-xl transition-all duration-200 hover:translate-x-1";


    return (
        <div className="w-64 h-screen bg-gradient-to-b from-[#1e7bb8] to-[#2692d1] text-white flex flex-col fixed top-0 left-0 shadow-2xl"> {/* Gradient background */}
            {/* Logo or Title - Enhanced */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#f48321] bg-clip-text text-transparent">
                    Admin Panel
                </h1>
                <p className="text-xs text-gray-300 mt-1">Management Dashboard</p>
            </div>


            {/* Navigation Links - Enhanced spacing and design */}
            <nav className="flex-grow p-4 space-y-3 mt-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                    end
                >
                    <div className="flex items-center w-full">
                        <div className="p-2 bg-white/10 rounded-lg mr-3">
                            <LayoutDashboard size={20} />
                        </div>
                        <span className="text-sm font-medium">Dashboard</span>
                    </div>
                </NavLink>
                
                <NavLink
                    to="/admin/events"
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                >
                    <div className="flex items-center w-full">
                        <div className="p-2 bg-white/10 rounded-lg mr-3">
                            <PlusSquare size={20} />
                        </div>
                        <span className="text-sm font-medium">Create Event</span>
                    </div>
                </NavLink>
                
                <NavLink
                    to="/admin/contact-submissions"
                    className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                >
                    <div className="flex items-center w-full">
                        <div className="p-2 bg-white/10 rounded-lg mr-3">
                            <Mail size={20} />
                        </div>
                        <span className="text-sm font-medium">Submissions</span>
                    </div>
                </NavLink>
            </nav>


            {/* User Info Section - New addition */}
            <div className="px-4 py-3 mx-4 mb-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#f48321] to-[#d66b0d] rounded-full flex items-center justify-center font-bold text-sm">
                        {auth.user?.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {auth.user?.username || "Admin User"}                        </p>
                        <p className="text-xs text-gray-400 truncate">Administrator</p>
                    </div>
                </div>
            </div>


            {/* Logout Button - Enhanced design */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-500/30"
                >
                    <div className="p-2 bg-white/5 rounded-lg mr-3 group-hover:bg-red-500/20 transition-colors">
                        <LogOut size={20} />
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};
