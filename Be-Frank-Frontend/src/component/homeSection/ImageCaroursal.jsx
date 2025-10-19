import React, { useState, useEffect, useCallback } from "react";

// --- MOCK DATA ---
const mockHomepageData = {
  hero: {
    slides: [
      {
        id: 1,
        preheadline: "WE ARE SET TO BUILD A BETTER WAY TO",
        headline: "FUN AND LEARN!",
        imageUrl:
          "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-5.jpg",
      },
      {
        id: 2,
        preheadline: "EMPOWERING THE NEXT GENERATION OF",
        headline: "THINKERS & DOERS",
        imageUrl:
          "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-5.jpg",
      },
      {
        id: 3,
        preheadline: "CREATING A SPACE FOR CREATIVITY AND",
        headline: "INNOVATION TO THRIVE",
        imageUrl:
          "https://vsmthane.org/wp-content/uploads/2022/05/Be-Frank-Sessions-VSM-Thane-NGO-4.jpg",
      },
    ],
  },
}


// --- HERO SECTION COMPONENT ---
export default function ImageCaroursal() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides =  mockHomepageData?.hero?.slides || [];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 1) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [slides.length, nextSlide]);

  const goToSlide = (index) => setCurrentSlide(index);

  const getHeadlineLines = (headline) => {
    const words = headline.split(" ");
    if (words.length > 1) {
      return [
        words.slice(0, words.length - 1).join(" "),
        words[words.length - 1],
      ];
    }
    return [headline, ""];
  };

  if (!slides.length) {
    return (
      <section className="w-full h-screen bg-gray-200 flex items-center justify-center">
        <p>Loading Hero Section...</p>
      </section>
    );
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.headline}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1920x1080/e2e8f0/4a5568?text=Image+Not+Found";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Text Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 lg:px-20">
          {slides.map((slide, index) => {
            const [line1, line2] = getHeadlineLines(slide.headline);
            return (
              <div
                key={slide.id}
                className={`absolute w-full max-w-xl text-white transition-all duration-100 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <p className="text-xl md:text-2xl font-light tracking-wider uppercase">
                  {slide.preheadline}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold uppercase mt-4 leading-tight">
                  {line1} <br /> {line2}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </section>
  );
}


