import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { EventCard } from "../component/EventCard";
import EventDetailModal from "../component/EventModel";
import PlaceholderImage from "../assets/aboutImage3.jpg";
import HeroImage from "../assets/OurInitiativesimage/eventimage.jpeg";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Loader from "./Loader";
import Pagination from "./Pagination";
import SEO from "./SEO";

const CategoryEventsPage = () => {
  const { category } = useParams(); // Get category from URL (e.g., "SchoolBeFrank")
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  // Modal State
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Helper to format category name for display (e.g., "SchoolBeFrank" -> "School Be Frank")
  const formatCategoryTitle = (cat) => {
    if (cat === "SchoolBeFrank") return "School Be Frank";
    if (cat === "BeFrankForVsmers") return "Be Frank For Vsmers";
    return cat;
  };

  const fetchCategoryEvents = async (page) => {
    try {
      setLoading(true);
      setError("");

      // Call the specific category endpoint with pagination
      const response = await axiosInstance.get(
        `/api/events/category/${category}?page=${page}&limit=12`
      );

      setEvents(response.data.data || []);
      setTotalPages(response.data.pagination.totalPages || 1);
      setTotalEvents(response.data.pagination.totalEvents || 0);
      setCurrentPage(response.data.pagination.currentPage || 1);
    } catch (err) {
      console.error("Failed to fetch category events:", err);
      setError(err.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when category or page changes
  useEffect(() => {
    fetchCategoryEvents(currentPage);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [category, currentPage]);

  // Handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleKnowMore = (eventId) => {
    setSelectedEventId(eventId);
  };

  const handleCloseModal = () => {
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* --- Hero Section --- */}

      <SEO
        title={`${formatCategoryTitle(category)} Events`}
        description={`Explore all ${formatCategoryTitle(
          category
        )} events organized by Be Frank under Vidyadaan Sahayyak Mandal, Thane.`}
        keywords="Be Frank category events, VSM programs, student development activities"
        url={`https://befrank.vsmthane.org/events/category/${category}`}
      />

      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HeroImage}
            alt="Our Initiatives"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            {formatCategoryTitle(category)}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/events")}
          className="flex items-center text-gray-600 hover:text-[#f48321] transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to All Events
        </button>

        {/* --- Loading & Error --- */}
        {loading && <Loader text="Loading events..." />}
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* --- Events Grid --- */}
        {!loading && !error && (
          <>
            {events.length > 0 ? (
              <div className="flex flex-wrap justify-center sm:justify-start gap-8 mb-12">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    image={event.mainImage?.url || PlaceholderImage}
                    title={event.eventName}
                    location={event.location}
                    date={new Date(event.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                    onKnowMore={() => handleKnowMore(event._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">
                  No events found in this category.
                </p>
              </div>
            )}
            {/* --- Server-Side Pagination Controls --- */}
            {events.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPrev={handlePreviousPage}
                onNext={handleNextPage}
              />
            )}
          </>
        )}
      </div>

      {/* --- Modal --- */}
      {selectedEventId && (
        <EventDetailModal
          eventId={selectedEventId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CategoryEventsPage;
