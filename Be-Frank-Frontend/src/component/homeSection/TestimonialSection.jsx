import React, { useState, useEffect, useCallback, useRef } from "react";

/* --- ICONS --- */
const QuoteIcon = () => (
  <svg
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-300 w-8 h-6 md:w-12 md:h-9" // Responsive sizing
  >
    <path d="M18.8801 36H0L11.8399 0H24.52L18.8801 36Z" fill="currentColor" />
    <path d="M42.24 36H23.3599L35.2 0H47.88L42.24 36Z" fill="currentColor" />
  </svg>
);

const QuoteSvg = (size = 20, rotate = 0) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#f48321"
    className="inline-block align-baseline mx-1 opacity-70"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <g>
      <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z" />
      <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z" />
    </g>
  </svg>
);


/* --- CARD COMPONENT --- */
const TestimonialCard = ({ content, name, role, organization }) => {
  return (
    <div className="bg-[#f5fbff] rounded-3xl sm:rounded-5xl p-4 sm:p-6 lg:p-8 text-center text-gray-800 shadow-sm h-full flex flex-col justify-center">

      <p className="text-gray-700 text-base md:text-lg italic leading-relaxed mb-8">
        {QuoteSvg(window.innerWidth > 768 ? 20 : 15, 180)}
        {content}
        {QuoteSvg(window.innerWidth > 768 ? 20 : 15, 0)}
      </p>


      

      <div className="mt-auto">
        <h3 className="font-bold text-lg sm:text-xl text-[#f48321]">{name}</h3>
        <p className="text-gray-800 font-medium text-xs sm:text-sm mt-1">{role}</p>
        <p className="text-gray-800 text-xs sm:text-sm">{organization}</p>
      </div>
    </div>
  );
};

/* --- MAIN SECTION --- */
export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "Coming from a tribal rural background as a first-generation learner, finding my voice was never easy. Be Frank gave me a safe space to express myself, build confidence, and embrace my identity with pride. The public speaking sessions transformed my fear into courage, and today I speak with confidence and honesty. Be Frank helped me realize that my story matters.",
      name: "Vaishnavi Sakhare",
      role: "M.A. in Rural Development and Governance",
      organization: "Tata Institute of Social Sciences, Hyderabad",
    },
    {
      id: 2,
      content:
        "Be Frank transformed me from a hesitant participant into a confident facilitator and leader. Conducting sessions in rural and Ashram schools, nursing colleges, and presenting at the Mumbai Get Together showed me the true power of honest expression and empathy. Today, I lead with confidence, listen with purpose, and help others find their voice.",
      name: "Rohini Rupchand Kate",
      role: "MSW Part I",
      organization: "Yashwantrao Chavan School of Social Work",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  // Auto Slide Effect
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [nextSlide, isPaused]);

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex flex-col items-center justify-between gap-5 lg:gap-7">
          
          {/* 1. Left Heading Section */}
          <div className="w-full">
            <div className="inline-block mb-4">
              <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl md:text-3xl">
                Stories from Our Impactful Journey
              </h2>
              <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
            </div>
          </div>
        

          {/* 2. Right Carousel Section */}
          <div 
            className=" w-full max-w-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* CSS GRID STACK:
                All items occupy col 1 / row 1. This ensures the container 
                height is always determined by the content, preventing layout collapse.
            */}
            <div className="grid grid-cols-1 grid-rows-1 relative">
              {testimonials.map((item, index) => {
                const isActive = index === current;
                return (
                  <div
                    key={item.id || index}
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out transform ${
                      isActive
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 translate-x-12 -z-10 pointer-events-none"
                    }`}
                  >
                    <TestimonialCard {...item} />
                  </div>
                );
              })}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrent(i);
                    setIsPaused(true); // Pause briefly on manual interaction
                    setTimeout(() => setIsPaused(false), 5000);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === i
                      ? "w-8 bg-[#f48321]"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;