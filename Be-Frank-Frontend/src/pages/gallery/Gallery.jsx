import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust path
import PlaceholderImage from '../../assets/aboutImage4.jpg'; // Adjust path
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryPage = () => {
    // State for gallery images
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalImages, setTotalImages] = useState(0);

    // Fetch images function
    const fetchImages = async (page = 1) => {
        try {
            setLoading(true);
            setError('');
            // Fetch from the new gallery endpoint
            const response = await axiosInstance.get(`/api/events/gallery?page=${page}&limit=12`); // Request 12 images per page

            setImages(response.data.data || []);
            setTotalPages(response.data.pagination.totalPages || 1);
            setCurrentPage(response.data.pagination.currentPage || 1);
            setTotalImages(response.data.pagination.totalImages || 0);

        } catch (err) {
            console.error("Failed to fetch gallery images:", err);
            setError(err.response?.data?.message || 'Failed to load gallery.');
            setImages([]);
            setTotalPages(1);
            setCurrentPage(1);
            setTotalImages(0);
        } finally {
            setLoading(false);
        }
    };

    // Fetch images when currentPage changes
    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage]);

    // Pagination Handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    // Style for pagination buttons
    const paginationButtonClass = "px-4 py-2 mx-1 border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* --- Page Title --- */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center sm:text-left">
                    <span className="text-[#f48321]">Gallery</span><br/>
                    <span className="text-[#2692d1]">Moments Captured</span>
                </h1>

                {/* --- Loading & Error States --- */}
                {loading && (
                    <div className="text-center py-10">
                        <p className="text-gray-600 animate-pulse">Loading gallery...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded border border-red-300">Error: {error}</p>}

                {/* --- Image Grid --- */}
                {!loading && !error && images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {images.map((image, index) => (
                            <div key={image._id || index} className="aspect-square overflow-hidden rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={image.url || PlaceholderImage}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                    loading="lazy" // Add lazy loading for performance
                                />
                            </div>
                        ))}
                    </div>
                )}
                 {!loading && !error && images.length === 0 && (
                     <p className="text-center text-gray-500 py-10">No images found in the gallery.</p>
                )}

                {/* --- Pagination Controls --- */}
                {!loading && !error && totalImages > 0 && totalPages > 1 && (
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
        </div>
    );
};