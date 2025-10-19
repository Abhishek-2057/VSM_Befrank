import React from 'react';

// SVG component for the quotation marks to match the design
const QuoteIcon = () => (
  <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-200">
    <path d="M18.8801 36H0L11.8399 0H24.52L18.8801 36Z" fill="currentColor"/>
    <path d="M42.24 36H23.3599L35.2 0H47.88L42.24 36Z" fill="currentColor"/>
  </svg>
);


// The Testimonial Card, updated to match the final UI
const TestimonialCard = ({ content, name, role, organization }) => {
  return (
    // Card styling updated for a soft background, no border, and generous padding.
    <div className="bg-[#f5fbff] border border-none rounded-[40px] p-8 lg:p-9 text-center">
      
      {/* Top quote icon */}
      <div className="flex justify-center mb-6">
        <QuoteIcon />
      </div>

      {/* Testimonial content */}
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
        {content}
      </p>

      {/* Bottom quote icon - flipped vertically */}
      <div className="flex justify-center mb-6 transform scale-y-[-1]">
         <QuoteIcon />
      </div>

      {/* Author information */}
      <div>
        <p className="font-bold text-lg text-gray-800">{name}</p>
        <p className="text-gray-800 font-semibold text-sm">{role}</p>
        <p className="text-gray-800 font-semibold text-sm">{organization}</p>
      </div>

    </div>
  );
};


// The main Testimonial Section, converted from MUI to Tailwind
export const TestimonialSection = () => {
  return (
    // Section container with padding
    <section className="bg-white py-16 sm:py-20 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for the two-column layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12  ">
          
          {/* Left Column: Heading */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#f48321] leading-tight">
              Stories from<br />Our Impactful Journey
            </h2>
          </div>

          {/* Right Column: Testimonial Card */}
          <div className="lg:w-3/5 w-full max-w-xl lg:max-w-none">
            <TestimonialCard
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
              name="Mr. Karan Pardeshi"
              role="Principal"
              organization="Shri Maa Vidyalaya, Thane (W)"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

