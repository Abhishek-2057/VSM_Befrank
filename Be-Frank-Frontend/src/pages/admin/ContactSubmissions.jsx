// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance'; // Adjust path
// import { useAuth } from '../../context/authContext'; // Adjust path
// import { Eye, Trash2 } from 'lucide-react'; // Icons for buttons
// import { X } from 'lucide-react'; // Or use an inline SVG

// export const AdminContactSubmissions = () => {
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const auth = useAuth();

//     // State for modal
//     const [selectedSubmission, setSelectedSubmission] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Fetch data function
//     const fetchSubmissions = async () => {
//         if (!auth.isAuthenticated) {
//             setError("Not authorized.");
//             setLoading(false);
//             return;
//         }
//         try {
//             setLoading(true);
//             setError('');
//             const response = await axiosInstance.get('/api/contact/submissions');
//             setSubmissions(response.data);
//         } catch (err) {
//             console.error("Failed to fetch submissions:", err);
//             setError(err.response?.data?.message || 'Failed to load submissions.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch on component mount
//     useEffect(() => {
//         fetchSubmissions();
//     }, [auth.isAuthenticated]); // Dependency array is correct

//     // Function to open the modal
//     const handleViewDetails = (submission) => {
//         setSelectedSubmission(submission);
//         setIsModalOpen(true);
//     };

//     // Function to close the modal
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedSubmission(null);
//     };

//     // Function to handle deletion
//     const handleDelete = async (id) => {
//         // Simple confirmation dialog
//         if (!window.confirm('Are you sure you want to delete this submission?')) {
//             return;
//         }

//         try {
//             setError(''); // Clear previous errors
//             await axiosInstance.delete(`/api/contact/submissions/${id}`);
//             // Remove the submission from the local state to update UI instantly
//             setSubmissions(prev => prev.filter(sub => sub._id !== id));
//             alert('Submission deleted successfully.'); // Or use a toast notification
//         } catch (err) {
//             console.error("Failed to delete submission:", err);
//             setError(err.response?.data?.message || 'Failed to delete submission.');
//             alert(`Error: ${error}`); // Show error to user
//         }
//     };

//     return (
//         <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Contact Form Submissions</h1>

//                 {loading && <p className="text-center text-gray-500 py-4">Loading submissions...</p>}
//                 {error && <p className="text-red-600 bg-red-100 p-3 rounded border border-red-300">Error: {error}</p>}

//                 {!loading && !error && (
//                     <div className="overflow-x-auto relative shadow-md sm:rounded-lg border border-gray-200">
//                         <table className="w-full text-sm text-left text-gray-500">
//                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3">Date</th>
//                                     <th scope="col" className="px-6 py-3">Name</th>
//                                     <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
//                                     <th scope="col" className="px-6 py-3 hidden lg:table-cell">Phone</th>
//                                     <th scope="col" className="px-6 py-3">Message Preview</th>
//                                     <th scope="col" className="px-6 py-3">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {submissions.length > 0 ? (
//                                     submissions.map((sub, index) => (
//                                         <tr key={sub._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100`}>
//                                             <td className="px-6 py-4 whitespace-nowrap">{new Date(sub.createdAt).toLocaleDateString()}</td>
//                                             <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{sub.name}</td>
//                                             <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap">{sub.email}</td>
//                                             <td className="px-6 py-4 hidden lg:table-cell whitespace-nowrap">{sub.phone}</td>
//                                             {/* Message preview */}
//                                             <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={sub.message}>
//                                                 {sub.message.substring(0, 50)}{sub.message.length > 50 ? '...' : ''}
//                                             </td>
//                                             {/* Actions */}
//                                             <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
//                                                 <button
//                                                     onClick={() => handleViewDetails(sub)}
//                                                     className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
//                                                     title="View Details"
//                                                 >
//                                                     <Eye size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(sub._id)}
//                                                     className="p-1 text-red-600 hover:text-red-800 transition-colors"
//                                                     title="Delete Submission"
//                                                 >
//                                                     <Trash2 size={18} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No submissions yet.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {/* Render the Modal */}
//             {isModalOpen && (
//                 <SubmissionDetailModal
//                     submission={selectedSubmission}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </div>
//     );
// };




// export const SubmissionDetailModal = ({ submission, onClose }) => {
//     if (!submission) return null; // Don't render if no submission is selected

//     const handleContentClick = (e) => e.stopPropagation();

//     return (
//         // Backdrop
//         <div
//             onClick={onClose}
//             className="fixed inset-0 bg-slate-800/30 bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
//         >
//             {/* Modal Content */}
//             <div
//                 onClick={handleContentClick}
//                 className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative p-6 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
//                 // Add simple animation using keyframes if desired
//                 style={{ animation: 'fadeInScale 0.3s forwards' }}
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
//                     aria-label="Close modal"
//                 >
//                     <X size={24} />
//                 </button>

//                 {/* Header */}
//                 <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b pb-2">
//                     Submission Details
//                 </h2>

//                 {/* Details Grid */}
//                 <div className="space-y-3 text-sm sm:text-base">
//                     <div className="grid grid-cols-3 gap-2">
//                         <strong className="text-gray-600 col-span-1">Received:</strong>
//                         <span className="text-gray-800 col-span-2">{new Date(submission.createdAt).toLocaleString()}</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2">
//                         <strong className="text-gray-600 col-span-1">Name:</strong>
//                         <span className="text-gray-800 col-span-2">{submission.name}</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2">
//                         <strong className="text-gray-600 col-span-1">Email:</strong>
//                         <span className="text-gray-800 col-span-2 break-words">{submission.email}</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2">
//                         <strong className="text-gray-600 col-span-1">Phone:</strong>
//                         <span className="text-gray-800 col-span-2">{submission.phone}</span>
//                     </div>
//                     <div className="mt-4">
//                         <strong className="text-gray-600 block mb-1">Message:</strong>
//                         {/* Preserve whitespace and line breaks from the message */}
//                         <p className="text-gray-800 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap break-words">
//                             {submission.message}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Footer / Close Button */}
//                 <div className="mt-6 text-right">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//              {/* Add CSS for animation if needed */}
//             <style jsx global>{`
//                 @keyframes fadeInScale {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to { opacity: 1; transform: scale(1); }
//                 }
//                 .animate-fade-in-scale {
//                     animation: fadeInScale 0.3s ease-out forwards;
//                 }
//             `}</style>
//         </div>
//     );
// };


import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/authContext';
import { Eye, Trash2, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import { X } from 'lucide-react';


export const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = useAuth();

    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        fetchSubmissions();
    }, [auth.isAuthenticated]);

    const handleViewDetails = (submission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSubmission(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) {
            return;
        }

        try {
            setError('');
            await axiosInstance.delete(`/api/contact/submissions/${id}`);
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
            alert('Submission deleted successfully.');
        } catch (err) {
            console.error("Failed to delete submission:", err);
            setError(err.response?.data?.message || 'Failed to delete submission.');
            alert(`Error: ${error}`);
        }
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-br from-[#2692d1] to-[#1e7bb8] rounded-xl">
                            <Mail className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2692d1] to-[#f48321] bg-clip-text text-transparent">
                                Contact Submissions
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">Manage all contact form submissions</p>
                        </div>
                    </div>
                    
                    {/* Stats Card */}
                    <div className="mt-6 bg-white rounded-xl shadow-lg p-5 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Total Submissions</p>
                                <p className="text-3xl font-bold text-[#2692d1] mt-1">{submissions.length}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-[#f48321]/10 to-[#f48321]/5 rounded-xl">
                                <MessageSquare className="text-[#f48321]" size={32} />
                            </div>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block w-16 h-16 border-4 border-[#2692d1] border-t-[#f48321] rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading submissions...</p>
                    </div>
                )}
                
                {error && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 p-4 rounded-xl">
                        <p className="text-red-700 font-medium">⚠️ Error: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                Date
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <User size={14} />
                                                Name
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-semibold hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} />
                                                Email
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-semibold hidden lg:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} />
                                                Phone
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <MessageSquare size={14} />
                                                Message
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.length > 0 ? (
                                        submissions.map((sub, index) => (
                                            <tr 
                                                key={sub._id} 
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                                                    {sub.name}
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <span className="truncate max-w-[200px]">{sub.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 hidden lg:table-cell text-gray-600 whitespace-nowrap">
                                                    {sub.phone}
                                                </td>
                                                <td className="px-6 py-4 max-w-xs text-gray-600">
                                                    <div className="truncate" title={sub.message}>
                                                        {sub.message.substring(0, 50)}{sub.message.length > 50 ? '...' : ''}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleViewDetails(sub)}
                                                            className="p-2 text-[#2692d1] hover:bg-[#2692d1]/10 rounded-lg transition-all duration-200 hover:scale-110"
                                                            title="View Details"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(sub._id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                            title="Delete Submission"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="p-4 bg-gray-100 rounded-full mb-4">
                                                        <MessageSquare className="text-gray-400" size={32} />
                                                    </div>
                                                    <p className="text-gray-500 font-medium">No submissions yet.</p>
                                                    <p className="text-gray-400 text-sm mt-1">Contact form submissions will appear here</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

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
    if (!submission) return null;

    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        >
            <div
                onClick={handleContentClick}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                style={{ animation: 'fadeInScale 0.3s forwards' }}
            >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] p-6 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Mail className="text-white" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                Submission Details
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-5">
                    {/* Date Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#f48321] rounded-lg">
                                <Calendar className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-medium">Received On</p>
                                <p className="text-gray-900 font-semibold">{new Date(submission.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-[#2692d1] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#2692d1]/10 rounded-lg">
                                    <User className="text-[#2692d1]" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 font-medium mb-1">Name</p>
                                    <p className="text-gray-900 font-semibold truncate">{submission.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-[#2692d1] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#f48321]/10 rounded-lg">
                                    <Mail className="text-[#f48321]" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 font-medium mb-1">Email</p>
                                    <p className="text-gray-900 font-semibold truncate">{submission.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-[#2692d1] transition-colors md:col-span-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#2692d1]/10 rounded-lg">
                                    <Phone className="text-[#2692d1]" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 font-medium mb-1">Phone Number</p>
                                    <p className="text-gray-900 font-semibold">{submission.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-[#f48321]/10 rounded-lg">
                                <MessageSquare className="text-[#f48321]" size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-700">Message</h3>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 rounded-xl border border-gray-200">
                            <p className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                                {submission.message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                    >
                        Close
                    </button>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                    >
                        Mark as Read
                    </button>
                </div>
            </div>
            
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
