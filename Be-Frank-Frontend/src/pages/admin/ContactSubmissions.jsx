import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust path
import { useAuth } from '../../context/authContext'; // Adjust path
import { Eye, Trash2 } from 'lucide-react'; // Icons for buttons
import { X } from 'lucide-react'; // Or use an inline SVG

export const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = useAuth();

    // State for modal
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data function
    const fetchSubmissions = async () => {
        if (!auth.isAuthenticated) {
            setError("Not authorized.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError('');
            const response = await axiosInstance.get('/api/contact/submissions');
            setSubmissions(response.data);
        } catch (err) {
            console.error("Failed to fetch submissions:", err);
            setError(err.response?.data?.message || 'Failed to load submissions.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch on component mount
    useEffect(() => {
        fetchSubmissions();
    }, [auth.isAuthenticated]); // Dependency array is correct

    // Function to open the modal
    const handleViewDetails = (submission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSubmission(null);
    };

    // Function to handle deletion
    const handleDelete = async (id) => {
        // Simple confirmation dialog
        if (!window.confirm('Are you sure you want to delete this submission?')) {
            return;
        }

        try {
            setError(''); // Clear previous errors
            await axiosInstance.delete(`/api/contact/submissions/${id}`);
            // Remove the submission from the local state to update UI instantly
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
            alert('Submission deleted successfully.'); // Or use a toast notification
        } catch (err) {
            console.error("Failed to delete submission:", err);
            setError(err.response?.data?.message || 'Failed to delete submission.');
            alert(`Error: ${error}`); // Show error to user
        }
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Contact Form Submissions</h1>

                {loading && <p className="text-center text-gray-500 py-4">Loading submissions...</p>}
                {error && <p className="text-red-600 bg-red-100 p-3 rounded border border-red-300">Error: {error}</p>}

                {!loading && !error && (
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
                                    <th scope="col" className="px-6 py-3 hidden lg:table-cell">Phone</th>
                                    <th scope="col" className="px-6 py-3">Message Preview</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.length > 0 ? (
                                    submissions.map((sub, index) => (
                                        <tr key={sub._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100`}>
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{sub.name}</td>
                                            <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap">{sub.email}</td>
                                            <td className="px-6 py-4 hidden lg:table-cell whitespace-nowrap">{sub.phone}</td>
                                            {/* Message preview */}
                                            <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={sub.message}>
                                                {sub.message.substring(0, 50)}{sub.message.length > 50 ? '...' : ''}
                                            </td>
                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewDetails(sub)}
                                                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub._id)}
                                                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                                    title="Delete Submission"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No submissions yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Render the Modal */}
            {isModalOpen && (
                <SubmissionDetailModal
                    submission={selectedSubmission}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};




export const SubmissionDetailModal = ({ submission, onClose }) => {
    if (!submission) return null; // Don't render if no submission is selected

    const handleContentClick = (e) => e.stopPropagation();

    return (
        // Backdrop
        <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-800/30 bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        >
            {/* Modal Content */}
            <div
                onClick={handleContentClick}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative p-6 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                // Add simple animation using keyframes if desired
                style={{ animation: 'fadeInScale 0.3s forwards' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b pb-2">
                    Submission Details
                </h2>

                {/* Details Grid */}
                <div className="space-y-3 text-sm sm:text-base">
                    <div className="grid grid-cols-3 gap-2">
                        <strong className="text-gray-600 col-span-1">Received:</strong>
                        <span className="text-gray-800 col-span-2">{new Date(submission.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <strong className="text-gray-600 col-span-1">Name:</strong>
                        <span className="text-gray-800 col-span-2">{submission.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <strong className="text-gray-600 col-span-1">Email:</strong>
                        <span className="text-gray-800 col-span-2 break-words">{submission.email}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <strong className="text-gray-600 col-span-1">Phone:</strong>
                        <span className="text-gray-800 col-span-2">{submission.phone}</span>
                    </div>
                    <div className="mt-4">
                        <strong className="text-gray-600 block mb-1">Message:</strong>
                        {/* Preserve whitespace and line breaks from the message */}
                        <p className="text-gray-800 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap break-words">
                            {submission.message}
                        </p>
                    </div>
                </div>

                {/* Footer / Close Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
             {/* Add CSS for animation if needed */}
            <style jsx global>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};