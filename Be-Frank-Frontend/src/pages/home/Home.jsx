import React from 'react'

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
      <ImageCaroursal />
      <AboutSection />
      <EventsSection />
      <StatisticsSection />
      <InvolveSection />
      <TestimonialSection />
      <VideoCarousel />
    </div>
  )
}

export default Home
