import React from 'react';
import { X, CircleX } from 'lucide-react';

// We'll use the same placeholder image for the gallery
import PlaceholderImage from './../assets/aboutImage4.jpg'; 

const EventDetailModal = ({ event, onClose }) => {
  // This stops the modal from closing when you click inside the content area
  const handleContentClick = (e) => e.stopPropagation();

  return (
    // Backdrop
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-gray-400/70 bg-opacity-60 z-50 flex justify-center items-center p-4"
    >
      {/* Modal Content */}
      <div 
        onClick={handleContentClick}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative no-scrollbar"
      >
        {/* Close Button */}
        <div className='flex justify-end'>
            <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-4"
            >
            <CircleX size={35} />
            </button>
        </div>

        <div className='pb-4 px-8 md:px-12'>

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f48321]">Be Frank - Be Focused</h2>
            <p className="text-gray-500 text-sm md:text-base">{event.date}</p>
          </div>
          <p className="text-gray-600 pb-1">Shreemaa Vidyalay - {event.location}</p>
          <p className="text-gray-600">Facilitator Name: [Facilitator's Name Here]</p>
        </div>

        {/* Description */}
        <div className="text-gray-700 space-y-4 mb-8">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        
        {/* Image Gallery */}
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
                <img src={PlaceholderImage} alt="Event gallery" className="rounded-lg object-cover w-full h-full" />
            </div>
             <img src={PlaceholderImage} alt="Main event" className="rounded-lg object-cover w-full" />
        </div>
        </div>
      </div>
    </div>
  );
};


export default EventDetailModal