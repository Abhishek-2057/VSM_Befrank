import React, { useState } from 'react';

import PlaceholderImage from '../../assets/aboutImage4.jpg'; 
import { EventCard } from '../../component/EventCard';
import EventDetailModal from '../../component/EventModel';

const eventsData = [
    {
        id: 1,
        name: 'Community Learning Session',
        location: 'Thane West',
        date: '29/11/2024',
        image: PlaceholderImage,
    },
    {
        id: 2,
        name: 'Annual Sports Day',
        location: 'Mumbai Central',
        date: '28/11/2024',
        image: PlaceholderImage,
    },
    {
        id: 3,
        name: 'Science Fair Exhibition',
        location: 'Kalyan',
        date: '27/11/2024',
        image: PlaceholderImage,
    },
    {
        id: 4,
        name: 'Art & Craft Workshop',
        location: 'Dombivli',
        date: '26/11/2024',
        image: PlaceholderImage,
    },
    {
        id: 5,
        name: 'Guest Speaker Seminar',
        location: 'Ghatkopar',
        date: '25/11/2024',
        image: PlaceholderImage,
    },
    {
        id: 6,
        name: 'Charity Drive',
        location: 'Thane East',
        date: '24/11/2024',
        image: PlaceholderImage,
    },
];


export const EventsPage = () => {
    // State to hold the event data for the modal
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        // Added relative positioning to contain the modal if needed
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
            <div className="max-w-7xl mx-auto">
                {/* --- Page Title --- */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
                    <span className="text-[#f48321]">we are set to build</span><br/>
                    <span className="text-[#2692d1]">a better way to fun and learn!</span>
                </h1>

                {/* --- Events Container --- */}
                <div className="flex flex-wrap justify-center gap-8">
                    {eventsData.map((event) => (
                        <EventCard 
                            key={event.id}
                            image={event.image}
                            title={event.name}
                            location={event.location}
                            date={event.date}
                            // When this is called, it sets the selected event, opening the modal
                            onKnowMore={() => setSelectedEvent(event)}
                        />
                    ))}
                </div>
            </div>

            {/* --- Render the Modal Conditionally --- */}
            {/* The modal will only appear if selectedEvent is not null */}
            {selectedEvent && (
                <EventDetailModal 
                    event={selectedEvent}
                    // This function is passed to the modal to allow it to close itself
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};