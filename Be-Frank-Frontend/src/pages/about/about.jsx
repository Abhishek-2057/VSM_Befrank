import React from 'react';

import Hero1 from '../../assets/aboutImage4.jpg'; 

export const About = () => {
    const aboutData = [
        {
            title: "we are set to build",
            title2: "a better way to fun and learn!",
            imageLeft: Hero1,
            imageRight: Hero1,
        },
        {
            title: "About Vidyadaan Sahayyak Mandal",
            paragraph:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            title: "About Be Frank",
            paragraph:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
            imageLeft: Hero1,
            imageRight: Hero1,
        },
        {
            title: "About School Be Frank",
            paragraph:
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
            imageLeft: Hero1,
            imageRight: Hero1,
        },
    ];

    const ourTeam = [
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
        { image: Hero1, title: "Member Name", subtitle: "Designation" },
    ];

    return (
        <div className="bg-white">
            {aboutData.map((item, index) => (
                <section 
                    key={index} 
                    className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-9 md:pt-12"
                >
                    {/* Title 1 */}
                    <h2 className="text-[#f48321] font-bold text-2xl sm:text-4xl lg:text-5xl capitalize">
                        {item.title}
                    </h2>

                    {/* Title 2 (conditionally rendered) */}
                    {item.title2 && (
                        <h2 className="text-[#2692d1] font-bold text-2xl sm:text-4xl lg:text-5xl capitalize">
                            {item.title2}
                        </h2>
                    )}

                    {/* Paragraph (conditionally rendered) */}
                    {item.paragraph && (
                        <p className="text-slate-600 text-base sm:text-lg mt-6 md:mt-8 mb-6 md:mb-10">
                            {item.paragraph}
                        </p>
                    )}

                    {/* Image Section (conditionally rendered) */}
                    {item.imageLeft && item.imageRight && (
                        <div className="flex flex-col md:flex-row gap-4 mt-6 md:h-110">
                            <img
                                src={item.imageLeft}
                                alt={`${item.title}-left`}
                                className="w-full md:w-3/5 rounded-2xl object-cover md:h-full"
                            />
                            <img
                                src={item.imageRight}
                                alt={`${item.title}-right`}
                                className="w-full md:w-2/5 rounded-2xl object-cover md:h-full"
                            />
                        </div>

                    )}
                </section>
            ))}

            {/* --- Our Team Section --- */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-[#f48321] font-bold text-2xl sm:text-4xl lg:text-5xl pt-16">
                    Our Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 sm:py-12 md:py-16">
                    {ourTeam.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            {/* Image placeholder */}
                            <div className="bg-slate-200 aspect-square w-full rounded-xl mb-6">
                                {/* <img src={member.image} alt={member.title} className="w-full h-full object-cover rounded-xl" /> */}
                            </div>
                            {/* Text content */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{member.title}</h3>
                                <p className="text-slate-500 pb-3">{member.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* --- How You Can Participate Section --- */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-12">
                 <h2 className="text-black font-bold text-2xl sm:text-4xl lg:text-5xl">
                    How you can participate?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mt-6 md:mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.eiusmod tempor incididunt ut labore et dolore magna aliqua.eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </section>
        </div>
    );
};