import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export const AdminDashboard = () => {
    const auth = useAuth();

    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button 
                        onClick={auth.logout}
                        className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                
                <p className="mb-6">Welcome, admin. You are logged in.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/admin/create-event" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-blue-600">Create New Event</h2>
                        <p className="text-gray-600 mt-2">Go to the event form to add a new event to the website.</p>
                    </Link>
                    {/* Add more admin links here */}
                </div>
            </div>
        </div>
    );
};