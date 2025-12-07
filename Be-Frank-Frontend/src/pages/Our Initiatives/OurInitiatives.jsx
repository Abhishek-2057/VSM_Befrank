import React from 'react';
import { Link } from "react-router-dom";

// Reuse existing images or import specific initiative images
import HeroImage from '../../assets/OurInitiativesimage/image2.jpg'; // Example Hero
import about4 from '../../assets/aboutimages/image4.jpg';
import initImage2 from '../../assets/OurInitiativesimage/mehfil.png';
import initImage3 from '../../assets/OurInitiativesimage/vawesomes.png';

export const OurInitiative = () => {
    
    // --- DATA ---
    const initiativeData = [
        {
            title: "Be Frank School Chale Hum",
            image: about4,
            paragraph:
                "Team Be Frank at VSM has introduced the “School Chale Hum” program for students especially those studying in 8th, 9th, and 10th standard. The program aims to help students build useful skills, strengthen their knowledge, and develop a positive attitude.\n\nAt present, the team is connecting with schools in the interiors of Maharashtra that offer quality education despite limited financial resources. We hope to support schools that are committed to helping their students understand their true potential and continue growing with confidence.",
            link: "/events"
        },
        {
            title: "VSM Mehfil",
            image: initImage2,
            paragraph:
                "VSM ushers in every New Year with a burst of creativity and celebration through its signature talent show, Mehfil, led by the spirited Be Frank team. Each year, more than 200 students, volunteers, and alumni light up the stage with performances across diverse art forms.\n\n Mehfil isn’t just an event—it’s the moment everyone at VSM looks forward to, a joyful tradition where students participate with excitement, pride, and wholehearted enthusiasm.",
        },
        {
            title: "Vawsomes Blog",
            image: initImage3,
            paragraph:
               "Vawsomes Blog is a vibrant space where ideas come alive! \n\nIt’s an open platform for students to share their thoughts on a variety of topics, encouraging playful reflection and creative expression. With Vawsomes, we’re adding an exciting new dimension—a place where both students and volunteers can speak from the heart.\n\n Think of it as a colorful kaleidoscope, capturing and celebrating all the bright, beautiful shades of Vidyadaan Sahayyak Mandal!",
            link: "https://vawesomes.wordpress.com/about/"
        }
    ];

    return (
        <div className="bg-white">

            {/* --- HERO SECTION (Same style as About Us) --- */}
            <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={HeroImage}
                        alt="Our Initiatives"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 max-w-7xl mx-auto w-full">
                    <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f48321]">
                            Our Initiatives
                        </h1>
                    </div>
                </div>
            </section>

            {/* --- INITIATIVES LIST SECTION --- */}
            <div className="flex flex-col gap-12 sm:gap-20 py-16 sm:py-24">
                {initiativeData.map((item, index) => {
                    // Logic to swap image side on alternate rows
                    const isEven = index % 2 === 0;

                    return (
                        <section
                            key={index}
                            className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 sm:py-8"
                        >
                            <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                                
                                {/* 1. TEXT CONTENT COLUMN */}
                                <div className="w-full lg:w-1/2">
                                    <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl capitalize">
                                        {item.title}
                                    </h2>
                                    <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-2 mb-6"></div>

                                    {/* Paragraph Parsing Logic */}
                                    {item.paragraph && item.paragraph.split("\n\n").map((para, i) => {
                                        const headingMatch = para.match(/^(.*?):\s*(.*)$/);
                                        return (
                                            <p
                                                key={i}
                                                className={`text-slate-600 text-base sm:text-lg leading-relaxed ${i === 0 ? "mb-4" : "mb-4"}`}
                                            >
                                                {headingMatch ? (
                                                    <>
                                                        <span className="font-bold text-[#2692d1]">{headingMatch[1]} : </span>
                                                        {headingMatch[2]}
                                                    </>
                                                ) : (
                                                    para
                                                )}
                                            </p>
                                        );
                                    })}

                                    {item.link && <Link
                                        to={item.link}
                                        className="bg-[#2692d1] hover:bg-blue-500 text-white py-2 px-10 rounded-md text-sm md:text-base font-medium transition duration-300 w-full md:w-auto text-center"
                                        >
                                        Find Out More
                                    </Link>}
                                </div>



                                {/* 2. IMAGE COLUMN */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[2/1] group">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Optional: Subtle overlay on image */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};