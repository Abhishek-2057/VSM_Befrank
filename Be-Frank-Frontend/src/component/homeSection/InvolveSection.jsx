import React from "react";
import { Link } from "react-router-dom";

const InvolvementCard = ({ title, src, description, to, isExternal }) => {
  
  const handleExternalClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "You are being redirected to our parent organization's donation website (VSM Thane). Do you want to continue?"
    );

    if (confirmed) {
      window.open(to, "_blank", "noopener,noreferrer");
    }
  };

  if (isExternal) {
    return (
      <a
        href={to}
        onClick={handleExternalClick}
        className="bg-white rounded-sm shadow-md p-5 flex flex-col w-full max-w-[320px] h-full cursor-pointer"
      >
        {/* Image */}
        <div className="w-full h-40 mb-5 overflow-hidden rounded-xl">
          <img src={src} className="w-full h-full object-contain" alt={title} />
        </div>

        {/* Title */}
        <h3 className="text-2xl text-center font-bold mb-2 text-gray-800">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-center text-md font-medium leading-relaxed flex-grow">
          {description}
        </p>
      </a>
    );
  }

  // ✅ Internal links still use React Router
  return (
    <Link
      to={to}
      className="bg-white rounded-sm shadow-md p-5 flex flex-col w-full max-w-[320px] h-full"
    >
      <div className="w-full h-40 mb-5 overflow-hidden rounded-xl">
        <img src={src} className="w-full h-full object-contain" alt={title} />
      </div>

      <h3 className="text-2xl text-center font-bold mb-2 text-gray-800">
        {title}
      </h3>

      <p className="text-gray-600 text-center text-md font-medium leading-relaxed flex-grow">
        {description}
      </p>
    </Link>
  );
};




// The main section component, styled to match the image
const InvolveSection = () => {
  const involvementOptions = [
    {
      id: 1,
      title: "Volunteer with Us",
      img: "/BecomeAVolunteer.png",
      description: "You can join our Be Frank Team and become a part of our sessions in various schools and locations.",
      to:"/contact",
      isExternal: false,
    },
    {
      id: 2,
      title: "Become a Donor",
      img: "/Donate.png",
      description: "You can donate to us to support the infrastructure and administrative costs, such as transportation and other necessary expenses, for Be Frank sessions.",
      to:"https://vsmthane.org/donate/",
      isExternal: true,
    },
    {
      id: 3,
      title: "Suggest a School",
      img: "/SuggestaSchool.png",
      description: "You can suggest schools with cooperative administrations and students who meet the criteria mentioned above.",
      to:"/contact",
      isExternal: false,
    }
  ];

  return (
    <section className="py-15 bg-[#f8f8f9] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
          <div className="inline-block mb-5">
            <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl md:text-3xl text-center">
              How can you participate
            </h2>
            <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
          </div>
        
        {/* Flex container to center the cards and handle wrapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center w-full">
          {involvementOptions.map(option => (
            <InvolvementCard
              key={option.id}
              title={option.title}
              src={option.img}
              description={option.description}
              to={option.to}
              isExternal={option.isExternal} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default InvolveSection;