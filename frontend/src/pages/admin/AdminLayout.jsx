

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar'; 
import { Menu } from 'lucide-react'; // Added Menu icon

export const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#1e7bb8] to-[#2692d1] z-30 p-4 shadow-md flex items-center justify-between">
                <h1 className="text-white font-bold text-lg">Admin Panel</h1>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="text-white p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar with Mobile Drawer Logic */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            {/* Added pt-20 for mobile header space, ml-0 for mobile, ml-64 for desktop */}
            <main className="flex-grow w-full md:ml-64 pt-20 md:pt-0 transition-all duration-300"> 
                <Outlet />
            </main>
        </div>
    );
};