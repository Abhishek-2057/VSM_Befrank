import React from 'react';
import ourimpact1 from '../../assets/ourimpact1.jpg';
import ourimpact2 from '../../assets/ourimpact2.jpg';
import ourimpact3 from '../../assets/ourimpact3.jpg';

// Reusable Card component for the grid sections
const ImageCard = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col p-5 w-full">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-auto object-cover rounded-xl"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/cccccc/222222?text=Image'; }}
      />
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-lg md:text-xl text-orange-500 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Main component for the entire page layout
const LearningJourney = () => {

  const gridCards = [
    {
      id: 1,
      imageUrl: ourimpact3,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      imageUrl: ourimpact3,
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 3,
      imageUrl: ourimpact3,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
     {
      id: 4,
      imageUrl: ourimpact3,
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 5,
      imageUrl: ourimpact3,
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
    },
    {
      id: 6,
      imageUrl: ourimpact3,
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione."
    }
  ];

  return (
    <div className="bg-white font-sans">
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* --- Top Banner --- */}
        <header className="bg-white text-left mb-8 py-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-orange-500">we are set to build</span><br />
            <span className="text-blue-600">a better way to fun and learn!</span>
          </h1>
        </header>

        {/* --- Featured Section --- */}
        <section className="bg-gray-50 rounded-lg flex flex-col lg:flex-row mb-8 overflow-hidden">
          {/* Left: Image */}
          <div className="w-full lg:w-3/5">
            <img 
              src={ourimpact2} 
              alt="Featured event" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right: Text Content */}
          <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
            <h2 className="font-bold text-xl md:text-2xl text-orange-500 mb-4">
              This change my way of thinking - student
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </section>

        {/* --- Image Grid Section --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridCards.map(card => (
            <ImageCard 
              key={card.id}
              imageUrl={card.imageUrl}
              title="This change my way of thinking - student"
              description={card.description}
            />
          ))}
        </section>

      </div>
    </div>
  );
};

export default LearningJourney;

