// import React from 'react';
// import { ImageCard } from './OurImpact';
// import ourimpact1 from '../../assets/ourimpact1.jpg';

// const EventDetailsPage = ({ event, onBack, otherEvents }) => {
//   return(
//     <div className="bg-white font-sans animate-fade-in">
//        <div className="max-w-4xl mx-auto p-4 md:p-8">
//           {/* Back Button */}
//           <button onClick={onBack} className="text-blue-600 hover:underline mb-8">&larr; Back to all stories</button>
          
//           {/* Main Image */}
//           <img 
//             src={event.imageUrl}
//             alt={event.title}
//             className="w-full h-auto object-cover rounded-lg mb-6"
//           />

//           {/* Main Content */}
//           <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
//               <h1 className="text-2xl md:text-4xl font-bold text-orange-500">
//                   {event.title}
//               </h1>
//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//               </p>
//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </p>

//               {/* In-Content Image Grid */}
//               <div className="grid grid-cols-3 gap-4 py-4">
//                   <img src={ourimpact1} alt="Event detail 1" className="rounded-lg"/>
//                   <img src={ourimpact1} alt="Event detail 2" className="rounded-lg"/>
//                   <img src={ourimpact1} alt="Event detail 3" className="rounded-lg"/>
//               </div>

//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//               </p>
//               <p>
//                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//           </div>

//           {/* Explore More Stories Section */}
//           <div className="mt-16">
//               <div className="flex justify-between items-center mb-8">
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore More Stories</h2>
//                   <button onClick={onBack} className="text-blue-600 hover:underline text-sm">View all</button>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {otherEvents.slice(0, 3).map(card => (
//                       <ImageCard 
//                           key={card.id}
//                           imageUrl={card.imageUrl}
//                           title={card.title}
//                           description={card.description}
//                           onClick={() => window.scrollTo(0, 0)} // A simple way to reset view
//                       />
//                   ))}
//               </div>
//           </div>
//        </div>
//     </div>
//   );
// };


// export default EventDetailsPage;

import React from 'react';
import ourimpact1 from '../../assets/ourimpact1.jpg';

/**
 * EventDetailsPage
 * Props:
 * - event: { id, title, imageUrl, description }
 * - onBack: () => void
 * - otherEvents: array of event cards
 * - onSelect: (card) => void   // open another event from "Explore More"
 */
const EventDetailsPage = ({ event, onBack, otherEvents = [], onSelect }) => {
  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button onClick={onBack} className="text-blue-600 hover:underline mb-8">
          &larr; Back to all stories
        </button>
        <p className="text-gray-600">No event selected.</p>
      </div>
    );
  }

  // Small card for "Explore More" (kept local to avoid circular imports)
  const SmallCard = ({ imageUrl, title, description, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="text-left bg-gray-100 rounded-xl overflow-hidden flex flex-col w-full hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      aria-label={title || 'Open story'}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://placehold.co/600x400/cccccc/222222?text=Image';
        }}
      />
      <div className="p-4 flex-grow flex flex-col">
        {title ? (
          <h3 className="font-bold text-lg text-orange-500 mb-2">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </button>
  );

  return (
    <div className="bg-white font-sans animate-fade-in">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Back Button */}
        <button onClick={onBack} className="text-blue-600 hover:underline mb-8">
          &larr; Back to all stories
        </button>

        {/* Main Image */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-auto object-cover rounded-lg mb-6"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://placehold.co/1000x600/cccccc/222222?text=Image';
          }}
        />

        {/* Main Content */}
        <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
          <h1 className="text-2xl md:text-4xl font-bold text-orange-500">
            {event.title}
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* In-Content Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
            <img src={ourimpact1} alt="Event detail 1" className="rounded-lg" />
            <img src={ourimpact1} alt="Event detail 2" className="rounded-lg" />
            <img src={ourimpact1} alt="Event detail 3" className="rounded-lg" />
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Explore More Stories Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Explore More Stories
            </h2>
            <button
              onClick={onBack}
              className="text-blue-600 hover:underline text-sm"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents
              .filter((c) => c.id !== event.id)
              .slice(0, 3)
              .map((card) => (
                <SmallCard
                  key={card.id}
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  onClick={() => {
                    if (typeof onSelect === 'function') {
                      onSelect(card);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
