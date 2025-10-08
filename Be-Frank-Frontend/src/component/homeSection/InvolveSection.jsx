import React from 'react';

// The card component, now styled to match the image
const InvolvementCard = ({ title, description }) => {
  return (
    // Card with fixed dimensions, shadow, and rounded corners
    <div className="bg-white rounded-2xl shadow-md w-[320px] h-[404px] p-5 flex flex-col">
      {/* Image placeholder as seen in the UI */}
      <div className="bg-gray-100 rounded-xl h-40 w-full mb-6 flex-shrink-0"></div>
      
      {/* Card Title */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      
      {/* Card Description */}
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </div>
  );
};

// The main section component, styled to match the image
const InvolveSection = () => {
  const involvementOptions = [
    {
      id: 1,
      title: "Suggest School's",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 2,
      title: "Volunteer with us",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 3,
      title: "Donate",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    }
  ];

  return (
    <section className="py-15 bg-[#f8f8f9] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center text-[#f48321]">
          How you can involve
        </h2>
        
        {/* Flex container to center the cards and handle wrapping */}
        <div className="flex flex-wrap justify-center gap-8">
          {involvementOptions.map(option => (
            <InvolvementCard 
              key={option.id}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvolveSection;