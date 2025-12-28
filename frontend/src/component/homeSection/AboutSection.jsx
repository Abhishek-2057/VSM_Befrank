import React, { useState, useRef, useEffect } from "react";
import aboutImage1 from '../../assets/aboutImage1.jpg';
import aboutImage2 from '../../assets/aboutImage2.jpg';
import aboutImage3 from '../../assets/aboutImage3.jpg';
import aboutImage4 from "../../assets/AboutImage4.jpeg";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";


import pdfEN from "../../assets/onepager/Be_Frank_one_pager_brochure.pdf";
import pdfMR from "../../assets/onepager/Be_Frank_Marathi_one_pager.pdf";

const AboutSection = () => {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // close on click outside (optional but nice)
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
          <div className="mb-5 w-fit">
            <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl md:text-3xl whitespace-nowrap">
              About Us
            </h2>
            <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
          </div>

          <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
            Vidyadaan Sahayyak Mandal, Thane (VSM Thane), was founded in 2008 by a small group of like-minded people to help needy and deserving students who were unable to continue their education due to weak financial positions. VSM quickly realised that in order to truly nurture these students, they would need to provide 360-degree emotional and professional support, rather than just sponsoring academic fees.</p>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            Establishing strong bonding  among students was the most important task. The alumni and current students of VSM therefore commenced a series of activities that eventually culminated in the most popular program: <strong>‘Be Frank’</strong>. It is an activity based program conducted by the students, mainly for the students at VSM. It’s helpful in grooming student’s personality & awareness.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-3">
            <Link
              to="/about"
              className="bg-[#2692d1] hover:bg-blue-500 text-white py-2 px-10 rounded-md text-sm md:text-base font-medium transition duration-300 w-full md:w-auto text-center"
            >
              Find Out More
            </Link>

            {/* <Link
              to="/"
              className="bg-[#2692d1] hover:bg-blue-500 text-white py-2 px-10 rounded-md text-sm md:text-base font-medium transition duration-300 w-full md:w-auto text-center"
            >
              Be Frank One Pager
            </Link> */}
            {/* Dropdown trigger + menu (click to open for ALL screens) */}
            <div ref={menuRef} className="relative w-full md:w-auto">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="bg-[#2692d1] hover:bg-blue-500 text-white py-2 px-10 rounded-md 
             text-sm md:text-base font-medium transition duration-300 
             w-full md:w-auto text-center flex items-center justify-center gap-2"
              >
                Be Frank One Pager

                {/* Dropdown Icon */}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>


              {/* Dropdown menu */}
              <div
                className={`absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg ${open ? "block" : "hidden"
                  }`}
                role="menu"
              >
                <a
                  href={pdfEN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  English PDF
                </a>
                <a
                  href={pdfMR}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Marathi PDF
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
