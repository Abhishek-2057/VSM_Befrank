import React from 'react';
// Removed Link and useAuth as logout is in sidebar now

export const AdminDashboard = () => {
    return (
        <div className="p-6 sm:p-10"> {/* Adjust padding as needed */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                Dashboard Overview
            </h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 text-lg">
                    Welcome, admin!
                </p>
                <p className="text-gray-600 mt-2">
                    Use the sidebar navigation to manage events and view contact submissions.
                </p>
                {/* You could add summary stats here later */}
            </div>
        </div>
    );
};