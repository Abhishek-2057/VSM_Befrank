import React from "react";
import EventCard from "../EventCard";

import CardCarousel from "../carousal/CardCarousal";

// The main section component with the corrected layout
// const EventsSection = () => {
//   const events = [
//     {
//       id: 1,
//       image:
//         "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-1.jpg",
//       title: "Event name",
//       location: "Event location",
//       date: "29/11/2024",
//     },
//     {
//       id: 2,
//       image:
//         "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-2.jpg",
//       title: "Event name",
//       location: "Event location",
//       date: "29/11/2024",
//     },
//     {
//       id: 3,
//       image:
//         "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-3.jpg",
//       title: "Event name",
//       location: "Event location",
//       date: "29/11/2024",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-6">
//         {/* Heading */}
//         <div className="relative flex items-center justify-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
//             Our recent events
//           </h2>

//           <div className="absolute right-60">
//             <button className="text-blue-600 font-medium hover:underline">
//               View all events
//             </button>
//           </div>
//         </div>

//         {/* Main container for arrows and cards */}
//         <div className="flex items-center justify-center gap-4">
//           {/* Left Arrow */}
//           <button className="bg-white hover:bg-gray-100 rounded-full p-2 shadow-md">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-gray-600"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 19.5L8.25 12l7.5-7.5"
//               />
//             </svg>
//           </button>

//           {/* Cards Container */}
//           <div className="flex gap-8 justify-center overflow-x-auto py-2">
//             {events.map((event) => (
//               <EventCard
//                 key={event.id}
//                 image={event.image}
//                 title={event.title}
//                 location={event.location}
//                 date={event.date}
//               />
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button className="bg-white hover:bg-gray-100 rounded-full p-2 shadow-md">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-gray-600"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M8.25 4.5l7.5 7.5-7.5 7.5"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventsSection;

const EventsSection = () => {
  // Dummy data for the event cards
  const cardData = [
    {
      id: 3,
      image:
        "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-3.jpg",
      title: "Community Cleanup",
      location: "City Park",
      date: "15/10/2024",
    },
    {
      id: 2,
      image:
        "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-2.jpg",
      title: "Tech Conference",
      location: "Convention Center",
      date: "22/10/2024",
    },
    {
      id: 1,
      image:
        "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-1.jpg",
      title: "Music Festival",
      location: "Main Stage",
      date: "05/11/2024",
    },
    {
      id: 1,
      image:
        "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-1.jpg",
      title: "Art Exhibition",
      location: "Downtown Gallery",
      date: "12/11/2024",
    },
    {
      id: 1,
      image:
        "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-1.jpg",
      title: "Food Fair",
      location: "Central Square",
      date: "19/11/2024",
    },
  ];

  return (
    <div className="bg-[#f8f8f9] w-full py-16 sm:py-16 px-4">
      <div className="max-w-screen-xl mx-auto ">
        {/* Section Header */}
        <div className="relative flex justify-center items-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f48321] text-center">
            Our Recent Events
          </h2>
          <a
            href="#"
            className="absolute right-10 text-[#2692d1] font-medium text-lg hidden lg:block hover:underline"
          >
            View all Events
          </a>
        </div>

        {/* Carousel Component */}
    
           <CardCarousel cards={cardData} />
       
        

        {/* View All link for mobile/tablet */}
        <div className="text-center mt-12 lg:hidden">
          <a
            href="#"
            className="text-[#2692d1] font-medium text-lg hover:underline"
          >
            View all Events
          </a>
        </div>
      </div>
    </div>
  );
};


export default EventsSection;