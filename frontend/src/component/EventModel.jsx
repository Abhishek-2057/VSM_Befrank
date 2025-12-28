import React, { useState, useEffect } from 'react';
import { X, CircleX } from 'lucide-react'; // Changed icon back as per your code
import axiosInstance from '../utils/axiosInstance'; // Adjust path
import PlaceholderImage from '../assets/aboutImage3.jpg'; // Adjust path for fallback image
import Loader from './Loader';

const EventDetailModal = ({ eventId, onClose }) => {
    // State to hold the fetched event details
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState('');

    useEffect(() => {
        // Fetch details when eventId is provided
        const fetchEventDetails = async () => {
            if (!eventId) return; // Don't fetch if no ID

            try {
                setLoading(true);
                setError('');
                // Fetch event details using the provided eventId
                const response = await axiosInstance.get(`/api/events/getEventById/${eventId}`);
                setEventDetails(response.data.data); // Assuming backend returns { data: event }
            } catch (err) {
                console.error(`Failed to fetch event details for ID ${eventId}:`, err);
                setError(err.response?.data?.message || `Failed to load event details.`);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]); // Re-run effect if eventId changes

    // This stops the modal from closing when you click inside the content area
    const handleContentClick = (e) => e.stopPropagation();

    // Function to safely render HTML description
    const createMarkup = (htmlContent) => {
        // Basic sanitization (replace with a more robust library like DOMPurify if needed for security)
        // This simple version removes <script> tags
        const sanitizedHtml = htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        return { __html: sanitizedHtml };
    };

    return (
        // Backdrop
        <div
            onClick={onClose}
            className="fixed inset-0 bg-gray-400/70 bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" // Added transition
        >
            {/* Modal Content */}
            <div
                onClick={handleContentClick}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto relative no-scrollbar transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" // Added animation classes
                style={{ animation: 'fadeInScale 0.3s forwards' }} // Inline style for animation
            >
                {/* Close Button */}
                <div className='flex justify-end sticky top-0 bg-white z-10'> {/* Made button sticky */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 p-4"
                        aria-label="Close modal"
                    >
                        <CircleX size={35} />
                    </button>
                </div>

                <div className='pb-4 px-6 md:px-10'> {/* Adjusted padding */}

                    {/* Loading State */}
                    {loading && <Loader text='Loading details...' />}

                    {/* Error State */}
                    {error && <div className="text-center p-10 text-red-600 bg-red-50 rounded border border-red-200">Error: {error}</div>}

                    {/* Content - Render only when details are loaded and no error */}
                    {!loading && !error && eventDetails && (
                        <>
                            {/* Header */}
                            <div className="mb-6 border-b border-gray-200 pb-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                                    {/* Use fetched event name */}
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#f48321]">
                                        {eventDetails.eventName}
                                    </h2>
                                    {/* Use and format fetched date */}
                                    <p className="text-gray-500 text-sm md:text-base flex-shrink-0 pt-1">
                                        {new Date(eventDetails.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                {/* Use fetched location */}
                                <p className="text-gray-600 pb-1">Location : {eventDetails.location}</p>
                                {/* Conditionally display facilitator name */}
                                {eventDetails.facilitatorName && (
                                    <p className="text-gray-600 text-sm">Facilitator : {eventDetails.facilitatorName}</p>
                                )}
                            </div>

                            {/* Description - Render HTML safely */}
                            <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 space-y-4 mb-8">
                                <div dangerouslySetInnerHTML={createMarkup(eventDetails.description || '<p>No description available.</p>')} />
                            </div>

                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-slate-700 mb-3">Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Map over fetched gallery images */}
                                    {eventDetails.galleryImages && eventDetails.galleryImages.length > 0 ? (
                                        eventDetails.galleryImages.map((image, index) => (
                                            <img
                                                key={image._id || index} // Use unique ID if available
                                                src={image.url || PlaceholderImage} // Use fetched URL or fallback
                                                alt={`Event gallery ${index + 1}`}
                                                className="rounded-lg object-cover w-full h-40 sm:h-48 shadow" // Added shadow
                                            />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 col-span-full">No gallery images available for this event.</p>
                                    )}
                                </div>
                                {/* Optionally show the main image larger if needed */}
                                {/* <img src={eventDetails.mainImage?.url || PlaceholderImage} alt="Main event" className="rounded-lg object-cover w-full mt-6 shadow-md" /> */}
                            </div>
                        </>
                    )}
                </div> {/* End content padding div */}
            </div> {/* End Modal Content div */}

             {/* CSS for animation and basic prose styling */}
            <style jsx global>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.3s ease-out forwards;
                }
                /* Basic prose styles for Quill content (tailwind prose plugin is better if available) */
                .prose h1, .prose h2, .prose h3 { margin-bottom: 0.5em; font-weight: 600; }
                .prose p { margin-bottom: 1em; line-height: 1.6; }
                .prose ul, .prose ol { margin-left: 1.5em; margin-bottom: 1em; }
                .prose li { margin-bottom: 0.3em; }
                .prose a { color: #2563eb; text-decoration: underline; hover:text-blue-700; }
                .prose img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5em 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .prose blockquote { border-left: 4px solid #e2e8f0; padding-left: 1em; margin: 1.5em 0; font-style: italic; color: #4b5563; }
                .prose pre { background-color: #f3f4f6; padding: 1em; border-radius: 0.5rem; overflow-x: auto; font-family: monospace; }
                .prose code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.9em;}
                .prose pre code { background-color: transparent; padding: 0; font-size: inherit; }
            `}</style>
        </div> // End Backdrop div
    );
};

export default EventDetailModal;