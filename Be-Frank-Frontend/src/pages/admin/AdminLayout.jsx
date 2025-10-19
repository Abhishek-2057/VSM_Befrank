import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar'; // Adjust path if needed

export const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            {/* Added padding-left to account for the fixed sidebar width */}
            <main className="flex-grow ml-64"> {/* ml-64 matches sidebar width w-64 */}
                {/* Outlet renders the matched child route's component */}
                <Outlet />
            </main>
        </div>
    );
};