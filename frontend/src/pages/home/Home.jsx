import React from 'react'
import SEO from '../../component/SEO';
import ImageCaroursal from '../../component/homeSection/ImageCaroursal';
import AboutSection from '../../component/homeSection/AboutSection';
import EventsSection from '../../component/homeSection/EventsSection';
import StatisticsSection from '../../component/homeSection/StatisticsSection';
import InvolveSection from '../../component/homeSection/InvolveSection';

import  TestimonialSection from '../../component/homeSection/TestimonialSection';
import VideoCarousel from '../../component/carousal/VidoeCarousal';



const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Be Frank Initiative | Empowering Students Through Confidence & Creativity"
        description="Be Frank is a student personality development initiative by Vidyadaan Sahayyak Mandal (VSM Thane), nurturing confidence, creativity, leadership, and self-expression among young minds across Maharashtra."
        keywords="Be Frank, VSM Thane, student development, personality development, education NGO Maharashtra"
        url="https://befrank.vsmthane.org/"
      />

      <ImageCaroursal />
      <AboutSection />
      <EventsSection />
      <StatisticsSection />
      <InvolveSection />
      <TestimonialSection />
      <VideoCarousel />
    </div>
  );
}

export default Home
