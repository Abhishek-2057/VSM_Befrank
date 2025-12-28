import React, { useState, useEffect, useCallback, useRef } from "react";
import caurosal1 from '../../assets/homeimages/caroursal1.jpg'; 
import caurosal2 from '../../assets/homeimages/caroursal2.jpg'; 
import caurosal3 from '../../assets/homeimages/caroursal3.jpeg'; 

// --- MOCK DATA ---
const mockHomepageData = {
  hero: {
    slides: [
      {
        id: 1,
        preheadline: "We Are Set to Build a Better Way to",
        headline: "Fun and Learn!",
        imageUrl: caurosal1,
      },
      {
        id: 2,
        preheadline: "Empowering the Next Generation of",
        headline: "Thinkers and Doers",
        imageUrl:
         caurosal2,
      },
      {
        id: 3,
        preheadline: "Creating a Space for Creativity and",
        headline: "Innovation to Thrive",
        imageUrl:
          caurosal3,
      },
    ],
  },
};

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  
  const slides = mockHomepageData?.hero?.slides || [];
  const AUTO_PLAY_INTERVAL = 5000;

  // --- NAVIGATION LOGIC ---
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const handleManualNext = () => {
    nextSlide();
    resetTimer();
  };

  const handleManualPrev = () => {
    prevSlide();
    resetTimer();
  };

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
  }, [nextSlide]);

  useEffect(() => {
    if (slides.length > 1) {
      resetTimer();
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [slides.length, resetTimer]);

  // --- TOUCH LOGIC ---
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleManualNext();
    if (distance < -minSwipeDistance) handleManualPrev();
  };

  const getHeadlineLines = (headline) => {
    if (!headline) return ["", ""];
    const words = headline.split(" ");
    return words.length > 1 
      ? [words.slice(0, words.length - 1).join(" "), words[words.length - 1]] 
      : [headline, ""];
  };

  if (!slides.length) return <div className="h-96 w-full bg-gray-200 animate-pulse" />;

  return (
    <section 
      id="hero" 
      className="relative w-full relative aspect-[16/11] sm:aspect-[20/8] mb-5 w-full overflow-hidden bg-gray-900 group"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Text Content */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        <div className="absolute bottom-8 left-4 sm:bottom-14 sm:left-10 lg:bottom-20 lg:left-20 w-[90%] max-w-xl text-left">
          <div className="grid grid-cols-1 grid-rows-1">
            {slides.map((slide, index) => {
              const [line1, line2] = getHeadlineLines(slide.headline);
              return (
                <div
                  key={slide.id}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <p className="text-xl sm:text-3xl font-normal tracking-wider text-gray-200">
                    {slide.preheadline}
                  </p>
                  <h1 className="font-bold leading-tight">
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f48321] drop-shadow-md">
                      {line1}
                    </span>
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2692d1] drop-shadow-md">
                      {line2}
                    </span>
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full shadow-sm ${
              index === currentSlide ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#f48321]" : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={handleManualPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </button>
      <button onClick={handleManualNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>
    </section>
  );
}