

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CardCarousel from "../carousal/CardCarousal";
// import axiosInstance from "../../utils/axiosInstance";
// import EventDetailModal from "../../component/EventModel";

// const EventsSection = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const fetchLatestEvents = async () => {
//     try {
//       const res = await axiosInstance.get("/api/events/latest");
//       setEvents(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLatestEvents();
//   }, []);

//   const handleKnowMore = (eventId) => {
//     setSelectedEventId(eventId);
//   };

//   const handleCloseModal = () => {
//     setSelectedEventId(null);
//   };

//   return (
//     <div className="bg-[#f8f8f9] w-full py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
//       <div className="max-w-screen-xl mx-auto w-full">
//         {/* Header */}
//         <div className="relative flex items-center justify-center mb-8 sm:mb-10 md:mb-12 px-1 sm:px-0">
//           <div className="inline-block w-full">
//             <h2 className="text-[#f48321] font-bold text-lg sm:text-2xl md:text-3xl leading-snug">
//               Our Recent Events
//             </h2>
//             <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
//           </div>
          

//           {/* Desktop View More */}
//           <Link
//             to="/initiatives"
//             className="absolute right-3 sm:right-6 md:right-10 text-[#2692d1] font-medium text-sm sm:text-base md:text-lg hidden lg:block hover:underline"
//           >
//             View All Events
//           </Link>
//         </div>

//         {/* Loading / Carousel */}
//         {loading ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">
//             Loading events...
//           </p>
//         ) : (
//           <div className="w-full overflow-hidden">
//             <CardCarousel
//               cards={events.map((event) => ({
//                 id: event._id,
//                 image: event?.mainImage?.url,
//                 title: event.eventName,
//                 location: event.location,
//                 date: event.date
//                   ? new Date(event.date).toLocaleDateString("en-IN")
//                   : "N/A",
//                 onKnowMore: () => handleKnowMore(event._id),
//               }))}
//             />
//           </div>
//         )}

//         {/* Mobile View More */}
//         <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:hidden">
//           <Link
//             to="/initiatives"
//             className="text-[#2692d1] font-medium text-base sm:text-lg hover:underline"
//           >
//             View All Events
//           </Link>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedEventId && (
//         <EventDetailModal eventId={selectedEventId} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default EventsSection;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardCarousel from "../carousal/CardCarousal";
import axiosInstance from "../../utils/axiosInstance";
import EventDetailModal from "../../component/EventModel";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchLatestEvents = async () => {
    try {
      const res = await axiosInstance.get("/api/events/latest");
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestEvents();
  }, []);

  const handleKnowMore = (eventId) => setSelectedEventId(eventId);
  const handleCloseModal = () => setSelectedEventId(null);

  return (
    <div className="bg-[#f8f8f9] w-full py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-10 md:mb-12 px-1 sm:px-0">
          <div className="inline-block w-full">
            <h2 className="text-[#f48321] font-bold text-lg sm:text-2xl md:text-3xl leading-snug">
              Our Recent Events
            </h2>
            <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1" />
          </div>

          {/* Desktop View More */}
          <Link
            to="/events"
            className="absolute right-3 sm:right-6 md:right-10 text-[#2692d1] font-medium text-sm sm:text-base md:text-lg hidden lg:block hover:underline"
          >
            View All Events
          </Link>
        </div>

        {/* Loading / Content */}
        {loading ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Loading events...
          </p>
        ) : (
          <>
            {/* ---- Desktop/Laptop (lg+): keep carousel (with arrows inside your component) ---- */}
            {events.length != 0 && <div className="hidden lg:block w-full overflow-hidden">
                <CardCarousel
                  cards={events.map((event) => ({
                    id: event._id,
                    image: event?.mainImage?.url,
                    title: event.eventName,
                    location: event.location,
                    date: event.date
                      ? new Date(event.date).toLocaleDateString("en-IN")
                      : "N/A",
                    onKnowMore: () => handleKnowMore(event._id),
                  }))}
                />
              </div>
            }

            {/* ---- Mobile & Tablet (< lg): stacked cards, no arrows ---- */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 gap-6">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="w-full">
                      <img
                        src={event?.mainImage?.url}
                        alt={event?.eventName || "Event Image"}
                        className="w-full h-52 sm:h-64 object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/800x500/eeeeee/666666?text=Event";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        {event.eventName}
                      </h3>

                      <div className="mt-2 text-sm sm:text-base text-slate-600">
                        {event.location ? <p>{event.location}</p> : null}
                        <p className="mt-1">
                          {event.date
                            ? new Date(event.date).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>
                      </div>

                      <button
                        onClick={() => handleKnowMore(event._id)}
                        className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-medium rounded-md bg-[#2692d1] text-white hover:opacity-90"
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View More */}
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <Link
                  to="/initiatives"
                  className="text-[#2692d1] font-medium text-base sm:text-lg hover:underline"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedEventId && (
        <EventDetailModal eventId={selectedEventId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EventsSection;
