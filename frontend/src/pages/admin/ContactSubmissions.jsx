import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import Pagination from "../../component/Pagination";

export const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const auth = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubmissions = async (page) => {
    if (!auth.isAuthenticated) {
      setError("Not authorized.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      // Pass page and limit to the backend
      const response = await axiosInstance.get(
        `/api/contact/submissions?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      // Handle new response structure
      setSubmissions(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setTotalSubmissions(response.data.pagination.totalSubmissions);
      setCurrentPage(response.data.pagination.currentPage);
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
      setError(err.response?.data?.message || "Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when authenticated or when page changes
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchSubmissions(currentPage);
    }
  }, [auth.isAuthenticated, currentPage]);

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const getPageNumbers = (currentPage, totalPages) => {
    const pages = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      await axiosInstance.delete(`/api/contact/submissions/${id}`);

      // Ideally, refetch to keep pagination in sync
      toast.success("Submission deleted successfully.");
      fetchSubmissions(currentPage);
    } catch (err) {
      console.error("Failed to delete submission:", err);
      toast.error(
        err.response?.data?.message || "Failed to delete submission."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-[#2692d1] to-[#1e7bb8] rounded-xl">
              <Mail className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2692d1] to-[#f48321] bg-clip-text text-transparent">
                Contact Submissions
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage all contact form submissions
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Submissions
                </p>
                <p className="text-3xl font-bold text-[#2692d1] mt-1">
                  {totalSubmissions}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-[#f48321]/10 to-[#f48321]/5 rounded-xl">
                <MessageSquare className="text-[#f48321]" size={32} />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader text="Loading Submissions..." />
        ) : error ? (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 p-4 rounded-xl">
            <p className="text-red-700 font-medium">⚠️ Error: {error}</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 font-semibold whitespace-nowrap"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar size={14} /> Date
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-semibold whitespace-nowrap"
                      >
                        <div className="flex items-center gap-2">
                          <User size={14} /> Name
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-semibold hidden md:table-cell"
                      >
                        <div className="flex items-center gap-2">
                          <Mail size={14} /> Email
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-semibold hidden lg:table-cell"
                      >
                        <div className="flex items-center gap-2">
                          <Phone size={14} /> Phone
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 font-semibold">
                        <div className="flex items-center gap-2">
                          <MessageSquare size={14} /> Message
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-semibold text-center"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length > 0 ? (
                      submissions.map((sub, index) => (
                        <tr
                          key={sub._id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          } border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                            {sub.name}
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                            <span className="truncate max-w-[200px] block">
                              {sub.email}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell text-gray-600 whitespace-nowrap">
                            {sub.phone}
                          </td>
                          <td className="px-6 py-4 max-w-xs text-gray-600">
                            <div className="truncate" title={sub.message}>
                              {sub.message.substring(0, 50)}
                              {sub.message.length > 50 ? "..." : ""}
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
                                disabled={deletingId === sub._id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
                                title="Delete Submission"
                              >
                                {deletingId === sub._id ? (
                                  <Loader2 size={18} className="animate-spin" />
                                ) : (
                                  <Trash2 size={18} />
                                )}
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
                              <MessageSquare
                                className="text-gray-400"
                                size={32}
                              />
                            </div>
                            <p className="text-gray-500 font-medium">
                              No submissions found.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {submissions.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
            )}
          </>
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
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex justify-center items-center p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative animate-fade-in-scale"
      >
        <div className="bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] p-6 sticky top-0 z-10 flex items-center justify-between">
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
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl border-2 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f48321] rounded-lg">
                <Calendar className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Received On</p>
                <p className="text-gray-900 font-semibold">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
              <div className="flex items-center gap-3">
                <User className="text-[#2692d1]" size={20} />
                <div>
                  <p className="text-xs text-gray-600 font-medium">Name</p>
                  <p className="text-gray-900 font-semibold truncate">
                    {submission.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="text-[#f48321]" size={20} />
                <div>
                  <p className="text-xs text-gray-600 font-medium">Email</p>
                  <p className="text-gray-900 font-semibold truncate">
                    {submission.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 md:col-span-2">
              <div className="flex items-center gap-3">
                <Phone className="text-[#2692d1]" size={20} />
                <div>
                  <p className="text-xs text-gray-600 font-medium">Phone</p>
                  <p className="text-gray-900 font-semibold">
                    {submission.phone}
                  </p>
                </div>
              </div>
            </div>
            {/* New Reason Field */}
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 md:col-span-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-[#f48321]" size={20} />
                <div>
                  <p className="text-xs text-gray-600 font-medium">Reason</p>
                  <p className="text-gray-900 font-semibold">
                    {submission.reason || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="text-[#f48321]" size={20} />
              <h3 className="text-sm font-bold text-gray-700">Message</h3>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 rounded-xl border border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {submission.message}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
