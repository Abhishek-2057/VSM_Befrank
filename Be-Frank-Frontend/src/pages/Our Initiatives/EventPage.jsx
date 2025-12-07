import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust path if needed
import { EventCard } from '../../component/EventCard'; // Adjust path
import EventDetailModal from '../../component/EventModel'; // Adjust path
import PlaceholderImage from '../../assets/aboutImage3.jpg'; // Keep for fallback
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for pagination
import HeroImage from '../../assets/OurInitiativesimage/eventimage.jpeg'; // Example Hero

export const EventsPage = () => {
    // State for the list of events fetched from backend
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- NEW: State for Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);

    // State for the modal
    const [selectedEventId, setSelectedEventId] = useState(null);

    // --- UPDATED: Fetch events function to handle pagination ---
    const fetchEvents = async (page = 1) => {
        try {
            setLoading(true);
            setError('');
            // Pass the requested page number as a query parameter
            const response = await axiosInstance.get(`/api/events/getAllEvents?page=${page}`);

            setEvents(response.data.data || []); // Access the 'data' array
            // Store pagination info from the response
            setTotalPages(response.data.pagination.totalPages || 1);
            setCurrentPage(response.data.pagination.currentPage || 1);
            setTotalEvents(response.data.pagination.totalEvents || 0);

        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError(err.response?.data?.message || 'Failed to load events.');
            setEvents([]); // Clear events on error
            setTotalPages(1); // Reset pagination on error
            setCurrentPage(1);
            setTotalEvents(0);
        } finally {
            setLoading(false);
        }
    };

    // --- UPDATED: useEffect to fetch based on currentPage ---
    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]); // Re-run effect when currentPage changes

    // --- NEW: Pagination Handlers ---
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Function to handle opening the modal
    const handleKnowMore = (eventId) => {
        setSelectedEventId(eventId);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedEventId(null);
    };

    // Helper for pagination button styles
    const paginationButtonClass = "px-4 py-2 mx-1 border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="min-h-screen relative bg-gray-50">
            <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={HeroImage}
                        alt="Our Initiatives"
                        className="w-full h-full object-cover object-bottom"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 max-w-7xl mx-auto w-full">
                    <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f48321]">
                            School Chale Hum Events
                        </h1>
                    </div>
                </div>
            </section>
            <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16">

                {/* --- Loading & Error States --- */}
                {loading && (
                    <div className="text-center py-10">
                         {/* Optional: Add a spinner SVG or component here */}
                         <p className="text-gray-600 animate-pulse">Loading events...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded border border-red-300">Error: {error}</p>}

                {/* --- Events Container & No Events Message --- */}
                {!loading && !error && events.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-8 mb-12"> {/* Added mb-12 for spacing */}
                        {events.map((event) => (
                            <EventCard
                                key={event._id}
                                image={event.mainImage?.url || PlaceholderImage}
                                title={event.eventName}
                                location={event.location}
                                date={new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                onKnowMore={() => handleKnowMore(event._id)}
                            />
                        ))}
                    </div>
                )}
                {!loading && !error && events.length === 0 && (
                     <p className="text-center text-gray-500 py-10">No events found.</p>
                )}

                {/* --- Pagination Controls --- */}
                {!loading && !error && totalEvents > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 space-x-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`${paginationButtonClass} bg-white text-gray-700 hover:bg-gray-100 disabled:hover:bg-white`}
                        >
                            <ChevronLeft size={20} className="inline mr-1" />
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`${paginationButtonClass} bg-white text-gray-700 hover:bg-gray-100 disabled:hover:bg-white`}
                        >
                            Next
                             <ChevronRight size={20} className="inline ml-1" />
                        </button>
                    </div>
                )}
            </div>

            {/* --- Render the Modal Conditionally --- */}
            {selectedEventId && (
                <EventDetailModal
                    eventId={selectedEventId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};