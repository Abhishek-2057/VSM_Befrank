import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EventCard } from "../../component/EventCard";
import EventDetailModal from "../../component/EventModel";
import PlaceholderImage from "../../assets/aboutImage3.jpg";
import HeroImage from "../../assets/OurInitiativesimage/eventimage.jpeg";
import { useNavigate } from "react-router-dom"; // Added for View More navigation

export const EventsPage = () => {
  const navigate = useNavigate();

  // Separate state for the two categories
  const [vsmEvents, setVsmEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for the modal
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Fetch Top 4 events for both categories
  const fetchCategoryPreviews = async () => {
    try {
      setLoading(true);
      setError("");

      // API Call 1: Be Frank For Vsmers (Limit 4)
      const vsmResponse = await axiosInstance.get(
        `/api/events/category/BeFrankForVsmers?page=1&limit=3`
      );

      // API Call 2: School Be Frank (Limit 4)
      const schoolResponse = await axiosInstance.get(
        `/api/events/category/SchoolBeFrank?page=1&limit=3`
      );

      setVsmEvents(vsmResponse.data.data || []);
      setSchoolEvents(schoolResponse.data.data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError(err.response?.data?.message || "Failed to load event sections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryPreviews();
  }, []);

  // Function to handle opening the modal
  const handleKnowMore = (eventId) => {
    setSelectedEventId(eventId);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedEventId(null);
  };

  // --- Navigate to Full List Page ---
  // Assuming you have a route like: /events/category/:categoryName
  const handleViewMore = (category) => {
    navigate(`/events/category/${category}`);
    // OR if you use query params: navigate(`/events/all?category=${category}`);
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HeroImage}
            alt="Our Initiatives"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 max-w-7xl mx-auto w-full px-4">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f48321]">
              Events
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4">
        {/* --- Loading & Error States --- */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600 animate-pulse">
              Loading event sections...
            </p>
          </div>
        )}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-3 rounded border border-red-300">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* ================= SECTION 1: Be Frank For Vsmers ================= */}
            <div id="be-frank-for-vsmers" className="mb-16 scroll-mt-24">
              <div className="flex justify-between items-center mb-8 ">
                <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl capitalize">
                  Be Frank For VSMers
                  <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-2 mb-6"></div>
                </h2>

                <button
                  onClick={() => handleViewMore("BeFrankForVsmers")}
                  className="text-md md:text-base font-semibold text-[#f48321] hover:text-[#f78a2b] transition-colors flex items-center"
                >
                  View More
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </div>

              {vsmEvents.length > 0 ? (
                <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                  {vsmEvents.map((event) => (
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
                <p className="text-gray-500 italic">
                  No events found in this category.
                </p>
              )}
            </div>

            {/* ================= SECTION 2: School Be Frank ================= */}
            <div id="school-be-frank" className="mb-8 scroll-mt-24">
              <div className="flex justify-between items-center mb-8 ">
                <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl capitalize">
                  School Be Frank
                  <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-2 mb-6"></div>
                </h2>
                <button
                  onClick={() => handleViewMore("SchoolBeFrank")}
                  className="text-md md:text-base font-semibold text-[#f48321] hover:text-[#f78a2b] transition-colors flex items-center"
                >
                  View More
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </div>

              {schoolEvents.length > 0 ? (
                <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                  {schoolEvents.map((event) => (
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
                <p className="text-gray-500 italic">
                  No events found in this category.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* --- Modal Component --- */}
      {selectedEventId && (
        <EventDetailModal
          eventId={selectedEventId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
