import React from "react";

export const EventCard = ({ image, title, location, date, onKnowMore }) => {
  return (
    <div className="w-[384px] h-[469px] mb-10 bg-white rounded-2xl shadow-lg flex flex-col p-6 font-sans flex-shrink-0">
      <div className="h-[258px] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="pt-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          
          <h3
            className="text-lg font-bold text-[#f48321] truncate mb-2 hover:text-[#2692d1] transition-colors"
            title={title}   // <-- this shows full text on hover
          >
            {title}
          </h3>


          <p className="text-sm text-gray-700 pt-1 flex-shrink-0 ml-2">{date}</p>
        </div>
        <p className="text-gray-700 text-base mb-4">{location}</p>
        {/* The onClick event is now handled by the onKnowMore prop */}
        <button
          onClick={onKnowMore}
          className="mt-auto w-full bg-[#2692d1] text-white text-base font-semibold h-12 rounded-lg hover:bg-[#32a3e6] transition duration-300"
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default EventCard;