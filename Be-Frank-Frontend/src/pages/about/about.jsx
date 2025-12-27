import React from 'react';
import SEO from '../../component/SEO';
import Hero1 from '../../assets/aboutImage3.jpg';
import about1 from '../../assets/aboutimages/image1.png';
import about2 from '../../assets/aboutimages/image2.jpg';
import about3 from '../../assets/aboutimages/image3.jpg';
import about4 from '../../assets/aboutimages/image4.jpg';
import about5 from '../../assets/aboutimages/image5.jpg';
import about6 from '../../assets/aboutimages/image6.jpg';
import temnMember1 from "../../assets/ourteamaboutpage/AditiPandit.jpg"
import temnMember2 from "../../assets/ourteamaboutpage/KaranPardesi.jpg"
import temnMember3 from "../../assets/ourteamaboutpage/AnandSapate.jpg"
import temnMember4 from "../../assets/ourteamaboutpage/ShubhamSakpal.jpg"




export const About = () => {
    const aboutData = [
        // {
        //     title: "we are set to build",
        //     imageLeft: about1,
        //     imageRight: about2,
        // },
        {
            title: "About Vidyadaan Sahayyak Mandal",
            paragraph:
                "Vidyadaan Sahayyak Mandal, Thane (VSM Thane) was founded in 2008 when a few like-minded people got together to help deserving students from Maharashtra’s rural areas who couldn’t pursue higher education due to weak financial position. Very early in its journey, VSM realised that it was the quality of help that mattered more than the quantity. \n\n That has been the abiding mantra of VSM ever since. VSM developed the unique mentor-student model to transform the students into confident, responsible, and independent members of the society.",
        },
        {
            title: "About Be Frank",
            paragraph:
                "Vision: Transformation through activity-based learnings.\n\nJourney of Be Frank: An initiative was started by Anand Sapate and Karan Pardeshi in January 2013 as an informal interaction with  Shahapur students staying at VSM Hostel. During this interaction, the participants spoke candidly about their experiences,varied interests, and their challenges. This inspired Anand and Karan to start Be Frank, a platform where young people could come together, express themselves, and share their ideas. Now  It has  turned into a full-fledged personality development initiative for VSM students.\n\nDevelopment into a kind of it’s own:  After its initiation, the group would gather every two months in the hostel and discuss new topics. The students themselves decided the format and roles, and they would perform poems, act out powadas, tell humorous stories, and even dance. The sessions were filled with enthusiasm and were appreciated by everyone who attended, even the parents and mentors of the young participants could observe positive changes in their wards. Be Frank grew in popularity and soon became a platform where young people from different backgrounds and interests could come together to learn, experience, and grow.Be Frank is a program in which  free expressions of thoughts, openness in accepting new ideas and spontaneity are the most important ingredients. The students themselves decide the format and content of each session, which helps in  blooming new ideas and perspectives organically. Over the years, Be Frank has become synonymous for creativity, self-expression, and personal growth.",
            imageLeft: about3,
            imageRight: about4,
        },
        {
            title: "About School Be Frank",
            paragraph:
                "Team Be Frank at VSM has created a program called “School Chale Hum” for children from underprivileged backgrounds. The goal of this program is to help young students build essential skills, gain useful knowledge, and develop a positive mindset. \n\n At present, the team is focusing on partnering with schools in the interiors of Maharashtra that provide good education to children with limited financial resources. We aim to support schools that are committed to helping their students discover their true potential and grow further.",
            imageLeft: about5,
            imageRight: about6,
        },
    ];

    const ourTeam = [
        { image: temnMember1, title: "Aditi Pandit", subtitle: "Mentor" },
        { image: temnMember2, title: "Karan Pardeshi", subtitle: "Lead" },
        { image: temnMember3, title: "Anand Sapate", subtitle: "Co-Lead" },
        { image: temnMember4, title: "Shubham Sakpal", subtitle: "Design head" },

    ];

    return (
        <div className="bg-white">


        <SEO title="About Us" description="Learn more about our mission and team on the About Us page." />

            <section className="relative w-full h-[30vh] md:h-[60vh] overflow-hidden">
                
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={about1}
                        alt="About Be Frank"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 max-w-7xl mx-auto w-full">
                    <div className="text-left">
                        <h1 className="text-4xl text-[#f48321] sm:text-5xl md:text-6xl font-bold">
                            About Us
                        </h1>
                    </div>
                </div>
            </section>

            {aboutData.map((item, index) => (
                <section
                    key={index}
                    className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-9 md:pt-12"
                >
                    {/* Title 1 */}
                    <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl capitalize">
                        {item.title}
                    </h2>
                    <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>

                    {/* Paragraph (conditionally rendered) */}

                    {item.paragraph && item.paragraph.split("\n\n").map((para, i) => {
                        const headingMatch = para.match(/^(.*?):\s*(.*)$/);

                        return (
                            <p
                                key={i}
                                className={`text-slate-600 text-base sm:text-lg leading-relaxed ${i === 0 ? "mt-6 mb-3" : "mt-0 mb-5"
                                    }`}
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
                <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl pt-16">
                    Our Team
                </h2>
                <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 sm:py-12 md:py-16">
                    {ourTeam.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            {/* Image placeholder */}
                            <div className="bg-slate-200 aspect-square w-full rounded-xl mb-6">
                                <img src={member.image} alt={member.title} className="w-full h-full object-cover rounded-xl" />
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
            {/* <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-12">
                <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl lg:text-3xl">
                    How you can participate?
                </h2>
                <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>

                <ul className="text-slate-600 text-base sm:text-lg mt-6 md:mt-8 space-y-4 list-disc pl-6">
                    <li>
                        <span className="font-bold text-[#2692d1]">Volunteer :</span> You can join our Be Frank Team
                        and become a part of our sessions in various schools and locations.
                    </li>

                    <li>
                        <span className="font-bold text-[#2692d1]">Donor :</span> You can donate to us to support the
                        infrastructure and administrative costs, such as transportation and other necessary expenses,
                        for Be Frank sessions.
                    </li>

                    <li>
                        <span className="font-bold text-[#2692d1]">Suggest a School :</span> You can suggest schools
                        with cooperative administrations and students who meet the criteria mentioned above.
                    </li>
                </ul>
            </section> */}

        </div>
    );
};