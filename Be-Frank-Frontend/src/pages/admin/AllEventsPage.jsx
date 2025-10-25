// import React, { useState, useEffect, useCallback } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { Link, useNavigate } from 'react-router-dom';
// import { MoreVertical, Edit, Trash2, Search, Calendar, X } from 'lucide-react';
// import { toast } from 'react-toastify';

// // --- Reusable Event Card Component ---
// const EventCard = ({ event, onEdit, onDelete }) => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const eventDate = new Date(event.date).toLocaleDateString('en-GB', {
//         day: '2-digit', month: 'short', year: 'numeric'
//     });

//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
//             <div className="relative">
//                 <img src={event.mainImage.url} alt={event.eventName} className="w-full h-40 object-cover" />
//                 <div className="absolute top-2 right-2">
//                     <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white">
//                         <MoreVertical size={20} />
//                     </button>
//                     {menuOpen && (
//                         <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
//                             <button onClick={() => { onEdit(event._id); setMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                 <Edit size={16} className="mr-2" /> Edit
//                             </button>
//                             <button onClick={() => { onDelete(event); setMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
//                                 <Trash2 size={16} className="mr-2" /> Delete
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800 truncate">{event.eventName}</h3>
//                 <p className="text-sm text-gray-500">{event.location}</p>
//                 <p className="text-xs text-gray-400 mt-1">{eventDate}</p>
//                 <Link to={`/events/${event._id}`} className="mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
//                     Know More
//                 </Link>
//             </div>
//         </div>
//     );
// };

// // --- Main Page Component ---
// export const AllEventsPage = () => {
//     const [events, setEvents] = useState([]);
//     const [pagination, setPagination] = useState({});
//     const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '' });
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);
//     const navigate = useNavigate();

//     const fetchEvents = useCallback(async (page = 1) => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams({
//                 page,
//                 limit: 10, // Desktop limit
//                 ...filters
//             });
//             const response = await axiosInstance.get(`/api/events/getAllEvents?${params.toString()}`);
//             setEvents(response.data.data);
//             setPagination(response.data.pagination);
//         } catch (err) {
//             setError('Failed to fetch events. Please try again.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }, [filters]);

//     // Debounced search effect
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setFilters(prev => ({ ...prev, search: searchTerm }));
//         }, 500); // 500ms delay
//         return () => clearTimeout(handler);
//     }, [searchTerm]);

//     useEffect(() => {
//         fetchEvents(1); // Fetch on initial load or when filters change
//     }, [fetchEvents]);

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEdit = (id) => {
//         navigate(`/admin/edit-event/${id}`);
//     };

//     const handleDelete = (event) => {
//         setEventToDelete(event);
//         setIsDeleteModalOpen(true);
//     };

//     const confirmDelete = async () => {
//         if (!eventToDelete) return;
//         try {
//             await axiosInstance.delete(`/api/events/${eventToDelete._id}`);
//             alert('Event deleted successfully!');
//             setIsDeleteModalOpen(false);
//             setEventToDelete(null);
//             fetchEvents(pagination.currentPage); // Refresh the list
//         } catch (err) {
//             alert('Failed to delete event.');
//             console.error(err);
//         }
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Events</h1>

//                 {/* --- Filter Section --- */}
//                 <div className="bg-white p-4 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                     <div className="md:col-span-2">
//                         <label className="text-sm font-medium text-gray-700">Search Event</label>
//                         <div className="relative mt-1">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                             <input
//                                 type="text"
//                                 placeholder="Search by event name..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Start Date</label>
//                         <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">End Date</label>
//                         <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
//                     </div>
//                 </div>

//                 {/* --- Events Grid --- */}
//                 {loading ? (
//                     <div className="text-center py-10">Loading events...</div>
//                 ) : error ? (
//                     <div className="text-center py-10 text-red-500">{error}</div>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                             {events.map(event => (
//                                 <EventCard key={event._id} event={event} onEdit={handleEdit} onDelete={handleDelete} />
//                             ))}
//                         </div>

//                         {/* --- Pagination --- */}
//                         <div className="flex justify-end items-center mt-8">
//                             <span className="text-sm text-gray-700 mr-4">
//                                 Page {pagination.currentPage} of {pagination.totalPages}
//                             </span>
//                             <button
//                                 onClick={() => fetchEvents(pagination.currentPage - 1)}
//                                 disabled={pagination.currentPage <= 1}
//                                 className="px-4 py-2 bg-white border border-gray-300 rounded-l-md disabled:opacity-50"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={() => fetchEvents(pagination.currentPage + 1)}
//                                 disabled={pagination.currentPage >= pagination.totalPages}
//                                 className="px-4 py-2 bg-white border border-gray-300 rounded-r-md disabled:opacity-50"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* --- Delete Confirmation Modal --- */}
//             {isDeleteModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
//                         <h2 className="text-xl font-bold">Confirm Deletion</h2>
//                         <p className="mt-2 text-gray-600">Are you sure you want to delete the event "{eventToDelete?.eventName}"? This action cannot be undone.</p>
//                         <div className="mt-6 flex justify-end gap-4">
//                             <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
//                             <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import {
  MoreVertical,
  Edit,
  Trash2,
  Search,
  Calendar,
  X,
  MapPin,
  CalendarDays,
  PlusCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const EventCard = ({ event, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative group">
        <img
          src={event.mainImage.url}
          alt={event.eventName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Three-dot menu */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white shadow-lg hover:scale-110 transition-all duration-200"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl z-10 overflow-hidden border border-gray-100">
              <button
                onClick={() => {
                  onEdit(event._id);
                  setMenuOpen(false);
                }}
                className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#2692d1]/10 hover:text-[#2692d1] transition-colors"
              >
                <Edit size={16} className="mr-3" /> Edit Event
              </button>
              <button
                onClick={() => {
                  onDelete(event);
                  setMenuOpen(false);
                }}
                className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                <Trash2 size={16} className="mr-3" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-[#f48321] text-white px-3 py-1.5 rounded-lg shadow-lg">
          <p className="text-xs font-bold">{eventDate}</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-2 hover:text-[#2692d1] transition-colors">
          {event.eventName}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin size={14} className="mr-1.5 text-[#f48321]" />
          <span className="truncate">{event.location}</span>
        </div>

        <Link
          to={`/events/${event._id}`}
          className="block w-full text-center bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium text-sm"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: 10, // Desktop limit
          ...filters,
        });
        const response = await axiosInstance.get(
          `/api/events/getAllEvents?${params.toString()}`
        );
        setEvents(response.data.data);
        setPagination(response.data.pagination);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500); // 500ms delay
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchEvents(1); // Fetch on initial load or when filters change
  }, [fetchEvents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleDelete = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await axiosInstance.delete(`/api/events/${eventToDelete._id}`);
       toast.success("Event deleted successfully!");
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      fetchEvents(pagination.currentPage); // Refresh the list
    } catch (err) {
       toast.error("Failed to delete event.");
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        {/* <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2692d1] to-[#f48321] bg-clip-text text-transparent mb-2">
                        Our Events
                    </h1>
                    <p className="text-gray-600">Manage and explore all your events in one place</p>
                </div> */}
        <div className="flex items-center justify-between mb-8">
          {/* Left side — Title + Subtitle */}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2692d1] to-[#f48321] bg-clip-text text-transparent mb-2">
              Our Events
            </h1>
            <p className="text-gray-600">
              Manage and explore all your events in one place
            </p>
          </div>

          {/* Right side — Create Event Button */}
          <button
            onClick={() => navigate("/admin/create-event")}
            className="flex items-center gap-2 px-4 py-2 bg-[#2692d1] hover:bg-[#1e7bb8] text-white rounded-lg shadow-md transition-all duration-200"
          >
            <PlusCircle size={18} />
            Create Event
          </button>
        </div>

        {/* --- Filter Section --- */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Search Event
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2692d1]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by event name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2692d1] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                <CalendarDays size={16} className="mr-1.5 text-[#f48321]" />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#2692d1] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                <CalendarDays size={16} className="mr-1.5 text-[#f48321]" />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#2692d1] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* --- Events Grid --- */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#2692d1] border-t-[#f48321] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-red-50 rounded-full mb-4">
              <X className="text-red-500" size={32} />
            </div>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-600 font-medium">No events found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* --- Pagination --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
              <span className="text-sm font-medium text-gray-700">
                Page{" "}
                <span className="text-[#f48321] font-bold">
                  {pagination.currentPage}
                </span>{" "}
                of <span className="font-bold">{pagination.totalPages}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchEvents(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-[#2692d1] hover:text-[#2692d1] disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-all duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchEvents(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-all duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform animate-in">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="text-red-600" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">
              Confirm Deletion
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete the event{" "}
              <span className="font-semibold text-gray-800">
                "{eventToDelete?.eventName}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg font-medium transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
