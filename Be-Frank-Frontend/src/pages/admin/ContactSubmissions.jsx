import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust path
import { useAuth } from '../../context/authContext';

export const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = useAuth(); // To ensure only logged-in admins see this

    useEffect(() => {
        const fetchSubmissions = async () => {
            // Only fetch if authenticated (extra check)
            if (!auth.isAuthenticated) {
                 setError("Not authorized.");
                 setLoading(false);
                 return;
            }
            try {
                setLoading(true);
                setError('');
                const response = await axiosInstance.get('/api/contact/submissions'); // Fetch from backend
                setSubmissions(response.data);
            } catch (err) {
                console.error("Failed to fetch submissions:", err);
                setError(err.response?.data?.message || 'Failed to load submissions.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [auth.isAuthenticated]); // Re-fetch if auth state changes (though unlikely needed here)

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Contact Form Submissions</h1>

                {loading && <p>Loading submissions...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submissions.length > 0 ? (
                                    submissions.map((sub) => (
                                        <tr key={sub._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.phone}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={sub.message}>{sub.message}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No submissions yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};