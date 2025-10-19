<<<<<<< HEAD
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
=======
// import React from 'react';
// import ourimpact1 from '../../assets/ourimpact1.jpg';
// import ourimpact2 from '../../assets/ourimpact2.jpg';
// import ourimpact3 from '../../assets/ourimpact3.jpg';

// // Reusable Card component for the grid sections
// const ImageCard = ({ imageUrl, title, description }) => {
//   return (
//     <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col p-5 w-full">
//       <img 
//         src={imageUrl} 
//         alt={title} 
//         className="w-full h-auto object-cover rounded-xl"
//         onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/cccccc/222222?text=Image'; }}
//       />
//       <div className="p-4 md:p-6 flex-grow flex flex-col">
//         <h3 className="font-bold text-lg md:text-xl text-orange-500 mb-2">{title}</h3>
//         <p className="text-gray-600 text-sm md:text-base leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Main component for the entire page layout
// const LearningJourney = () => {

//   const gridCards = [
//     {
//       id: 1,
//       imageUrl: ourimpact3,
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//     },
//     {
//       id: 2,
//       imageUrl: ourimpact3,
//       description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
//     },
//     {
//       id: 3,
//       imageUrl: ourimpact3,
//       description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
//     },
//      {
//       id: 4,
//       imageUrl: ourimpact3,
//       description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//     },
//     {
//       id: 5,
//       imageUrl: ourimpact3,
//       description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
//     },
//     {
//       id: 6,
//       imageUrl: ourimpact3,
//       description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione."
//     }
//   ];

//   return (
//     <div className="bg-white font-sans">
//       <div className="max-w-7xl mx-auto p-4 md:p-8">

//         {/* --- Top Banner --- */}
//         <header className="bg-white text-left mb-8 py-4">
//           <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//             <span className="text-orange-500">we are set to build</span><br />
//             <span className="text-blue-600">a better way to fun and learn!</span>
//           </h1>
//         </header>

//         {/* --- Featured Section --- */}
//         <section className="bg-gray-50 rounded-lg flex flex-col lg:flex-row mb-8 overflow-hidden">
//           {/* Left: Image */}
//           <div className="w-full lg:w-3/5">
//             <img 
//               src={ourimpact2} 
//               alt="Featured event" 
//               className="w-full h-full object-cover"
//             />
//           </div>
//           {/* Right: Text Content */}
//           <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
//             <h2 className="font-bold text-xl md:text-2xl text-orange-500 mb-4">
//               This change my way of thinking - student
//             </h2>
//             <p className="text-gray-600 text-base leading-relaxed">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </p>
//             <p className="text-gray-600 text-base leading-relaxed mt-4">
//               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
//             </p>
//           </div>
//         </section>

//         {/* --- Image Grid Section --- */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {gridCards.map(card => (
//             <ImageCard 
//               key={card.id}
//               imageUrl={card.imageUrl}
//               title="This change my way of thinking - student"
//               description={card.description}
//             />
//           ))}
//         </section>

//       </div>
//     </div>
//   );
// };

// export default LearningJourney;




import React ,{useState}from 'react';
import ourimpact1 from '../../assets/ourimpact1.jpg';
import ourimpact2 from '../../assets/ourimpact2.jpg';
import ourimpact3 from '../../assets/ourimpact3.jpg';
import EventDetailsPage from './EventDetailsPage';

export const ImageCard = ({ imageUrl, title, description, onClick }) => {
  return (
    <div 
      className="bg-gray-100 rounded-xl overflow-hidden flex flex-col p-5 w-full"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto object-cover rounded-xl"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/cccccc/222222?text=Image'; }}
        />
      </div>
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-lg md:text-xl text-orange-500 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

<<<<<<< HEAD
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
=======

const LearningJourneyList = ({ onCardClick, events }) => {
  return (
    <div className="bg-white font-sans">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
       
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
        <header className="bg-white text-left mb-8 py-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-orange-500">we are set to build</span><br />
            <span className="text-blue-600">a better way to fun and learn!</span>
          </h1>
        </header>

<<<<<<< HEAD
        {/* --- Featured Section --- */}
        <section className="bg-gray-50 rounded-lg flex flex-col lg:flex-row mb-8 overflow-hidden">
          {/* Left: Image */}
          <div className="w-full lg:w-3/5">
            <img 
              src={ourimpact2} 
=======
    
        <section className="bg-gray-50 rounded-lg flex flex-col lg:flex-row mb-8 overflow-hidden">
          <div className="w-full lg:w-3/5">
            <img 
              src={ourimpact2}
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
              alt="Featured event" 
              className="w-full h-full object-cover"
            />
          </div>
<<<<<<< HEAD
          {/* Right: Text Content */}
=======
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
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

<<<<<<< HEAD
        {/* --- Image Grid Section --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridCards.map(card => (
=======
        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(card => (
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
            <ImageCard 
              key={card.id}
              imageUrl={card.imageUrl}
              title="This change my way of thinking - student"
              description={card.description}
<<<<<<< HEAD
            />
          ))}
        </section>

=======
              onClick={() => onCardClick(card)}
            />
          ))}
        </section>
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default LearningJourney;
=======

// --- Event Details Page Component ---
// const EventDetailsPage = ({ event, onBack, otherEvents }) => {
//   return(
//     <div className="bg-white font-sans animate-fade-in">
//        <div className="max-w-4xl mx-auto p-4 md:p-8">
//           {/* Back Button */}
//           <button onClick={onBack} className="text-blue-600 hover:underline mb-8">&larr; Back to all stories</button>
          
//           {/* Main Image */}
//           <img 
//             src={event.imageUrl}
//             alt={event.title}
//             className="w-full h-auto object-cover rounded-lg mb-6"
//           />

//           {/* Main Content */}
//           <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
//               <h1 className="text-2xl md:text-4xl font-bold text-orange-500">
//                   {event.title}
//               </h1>
//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//               </p>
//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </p>

//               {/* In-Content Image Grid */}
//               <div className="grid grid-cols-3 gap-4 py-4">
//                   <img src="https://placehold.co/300x200/e74c3c/ffffff?text=Insight+1" alt="Event detail 1" className="rounded-lg"/>
//                   <img src="https://placehold.co/300x200/2ecc71/ffffff?text=Insight+2" alt="Event detail 2" className="rounded-lg"/>
//                   <img src="https://placehold.co/300x200/3498db/ffffff?text=Insight+3" alt="Event detail 3" className="rounded-lg"/>
//               </div>

//               <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//               </p>
//               <p>
//                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//           </div>

//           {/* Explore More Stories Section */}
//           <div className="mt-16">
//               <div className="flex justify-between items-center mb-8">
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore More Stories</h2>
//                   <button onClick={onBack} className="text-blue-600 hover:underline text-sm">View all</button>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {otherEvents.slice(0, 3).map(card => (
//                       <ImageCard 
//                           key={card.id}
//                           imageUrl={card.imageUrl}
//                           title={card.title}
//                           description={card.description}
//                           onClick={() => window.scrollTo(0, 0)} // A simple way to reset view
//                       />
//                   ))}
//               </div>
//           </div>
//        </div>
//     </div>
//   );
// };


// --- Main App Component to handle routing ---
const ourimpact = () => {
  const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'details'
  const [selectedEvent, setSelectedEvent] = useState(null);

  const allEvents = [
    { id: 1, imageUrl: ourimpact3, title: "This change my way of thinking - student", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, imageUrl: ourimpact3, title: "A new perspective on learning", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 3, imageUrl: ourimpact3, title: "Fun-filled educational journey", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { id: 4, imageUrl: ourimpact3, title: "Building confidence together", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 5, imageUrl: ourimpact3, title: "The power of teamwork", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
    { id: 6, imageUrl: ourimpact3, title: "Making a difference in the community", description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione." }
  ];

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const handleShowList = () => {
    setSelectedEvent(null);
    setCurrentPage('list');
  };

  if (currentPage === 'details' && selectedEvent) {

    const otherEvents = allEvents.filter(e => e.id !== selectedEvent.id);
    return <EventDetailsPage event={selectedEvent} onBack={handleShowList} otherEvents={otherEvents} />;
  }

  return <LearningJourneyList onCardClick={handleShowDetails} events={allEvents} />;
};

export default ourimpact;
>>>>>>> 0995e513e3254240dee162dd963a3a1c7ce85a7b

