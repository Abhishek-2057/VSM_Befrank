import React from 'react';

// Card for a single statistic, styled to match the image
const StatCard = ({ number, text }) => {
  return (
    // Using a very light gray background, specific dimensions, and larger rounding
    // bg-gray-50 rounded-2xl p-6 text-center shadow-sm
    <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm   flex flex-col justify-center items-center">
      <h3 className="text-5xl font-bold text-[#2692d1] mb-3">{number}</h3>
      <p className="text-gray-600 text-lg leading-tight">{text}</p>
    </div>
  );
};

// The main statistics section component, styled to match the image
const StatisticsSection = () => {
  const stats = [
    { id: 1, number: '3000+', text: 'School Be Frank Conducted' },
    { id: 2, number: '3000+', text: 'School Be Frank Conducted' },
    { id: 3, number: '3000+', text: 'School Be Frank Conducted' },
    { id: 4, number: '3000+', text: 'School Be Frank Conducted' }
  ];

  return (
    <section className="py-24  bg-white font-sans">
      {/* Centered container with padding */}
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main flex container for the two-column layout */}

        <div className="flex flex-col lg:flex-row items-center justify-between  lg:gap-x-24">
          
          {/* Left Column: Title and Description */}
          <div className="lg:w-[384px] text-center lg:text-left mb-12 lg:mb-0">
            <h2 className="text-5xl font-bold leading-tight text-[#f48321] mb-6">
              Be Frank<br />in Numbers
            </h2>
            <p className="text-gray-500 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          {/* Right Column: 2x2 Grid of Stat Cards */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {stats.map(stat => (
                <StatCard 
                  key={stat.id}
                  number={stat.number}
                  text={stat.text}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;