import React from 'react';
import aboutImage1 from '../../assets/aboutImage1.jpg';
import aboutImage2 from '../../assets/aboutImage2.jpg';
import aboutImage3 from '../../assets/aboutImage3.jpg';
import aboutImage4 from '../../assets/aboutImage4.jpg';

const AboutSection = () => {
  return (
    <section className="bg-white py-0 md:py-20 px-0 md:px-28 ">
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
        
        {/* Left Section: Images */}
        <div className="w-[90%] md:w-1/2 h-auto md:h-[480px] flex gap-3">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3 w-1/2">
            <div className="h-[200px] md:h-[60%] w-full rounded-lg shadow-md overflow-hidden">
              <img 
                src={aboutImage1} 
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="h-[150px] md:h-[35%] w-full rounded-lg shadow-md overflow-hidden">
              <img 
                src={aboutImage2} 
                alt="Image 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-3 w-1/2">
            <div className="h-[120px] md:h-[30%] w-full rounded-lg shadow-md overflow-hidden">
              <img 
                src={aboutImage3} 
                alt="Image 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="h-[230px] md:h-[65%] w-full rounded-lg shadow-md overflow-hidden">
              <img 
                src={aboutImage4} 
                alt="Image 4"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Section: About Us */}
        <div className="w-[90%] md:w-1/2 flex flex-col justify-center md:pl-8">
          <h2 className="text-[#f48321] font-bold mb-5 text-3xl sm:text-4xl md:text-5xl leading-tight">
            About us
          </h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className="bg-[#2692d1] hover:bg-blue-600 text-white py-2 px-10 rounded-md text-sm md:text-base font-medium transition duration-300 self-start">
            Know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
