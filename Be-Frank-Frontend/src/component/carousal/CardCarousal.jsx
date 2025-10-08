import React, { useState, useEffect, useMemo } from "react";
import EventCard from "../EventCard";
// --- SVG Icons for Carousel Arrows ---
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const useBreakpoint = () => {
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsPerView;
};


const CardCarousel = ({ cards }) => {
    const cardsPerView = useBreakpoint();
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % cards.length);
    };

    // Memoize visible cards to prevent re-calculation on every render
    const visibleCards = useMemo(() => {
        const result = [];
        for (let i = 0; i < cardsPerView; i++) {
            const index = (startIndex + i) % cards.length;
            result.push(cards[index]);
        }
        return result;
    }, [startIndex, cardsPerView, cards]);


    return (
        <div className="relative w-full">
            {/* Left Arrow */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 -translate-y-1/2 left-0 xl:-left-12 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition text-gray-600"
            >
                <ChevronLeftIcon />
            </button>

            {/* Card Container */}
            <div className="flex justify-center items-stretch gap-8  overflow-hidden">
                {visibleCards.map((card, index) => (
                    <EventCard key={`${card.title}-${index}`} {...card} />
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute top-1/2 -translate-y-1/2 right-0 xl:-right-12 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition text-gray-600"
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
};


export default CardCarousel;