import React from 'react';
import QRForPayment from '../assets/QRForPayment.jpg'

// SVG Iconae componentia ad meliorem legibilitatem
const FacebookIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);

const InstagramIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.356 2.175 8.744 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.197-4.354-2.624-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg>
);

const YouTubeIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" /></svg>
);


const Footer = () => {
  return (
    <footer className="bg-white text-black font-sans mt-8 px-4 py-6">
      <hr className="mb-4 border-black" />

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left text-base md:text-lg">
        
        {/* Column 1: Address & Social Links */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="space-y-2">
            <p className="font-bold">Vidyadaan Sahayyak Mandal (VSM Thane)</p>
            <p className="text-gray-700">
              Office No. 2, 1st Staircase, 1st floor, Khopat ST Stand building, Khopat, Thane, Maharashtra, India – 400602
            </p>
          </div>
          <p>+91-9987437446</p>
          <p>teambefrank@gmail.com</p>
          <div>
            <p className="font-bold text-lg mb-2">KEEP IN TOUCH</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <FacebookIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex justify-center space-x-12 md:space-x-16 my-6 md:my-0">
          <div className="flex flex-col space-y-4">
            <a href="/about" className="hover:underline">About us</a>
            <a href="/" className="hover:underline">Our events</a>
            <a href="/contact" className="hover:underline">Contact us</a>
          </div>
          <div className="flex flex-col space-y-4">
            <a href="/" className="hover:underline">Donate</a>
            <a href="/" className="hover:underline">Admission</a>
            <a href="/" className="hover:underline">Join us</a>
          </div>
        </div>
        
        {/* Column 3: UPI QR Code */}
        <div className="flex flex-col items-center md:items-end">
          <div className="text-center md:text-right w-full max-w-[300px]">
             <p className="mb-2">If you wish to Donate through UPI</p>
             <img 
               src={QRForPayment}
               alt="UPI QR Code for donation"
               className="w-full rounded-lg"
             />
          </div>
        </div>

      </div>

      <hr className="mt-4 border-black" />

      {/* Copyright section */}
      <div className="text-center py-4 text-sm md:text-base">
        <p>All Rights Reserved Copyright ©{new Date().getFullYear()} VSMthane</p>
      </div>
    </footer>
  );
};

export default Footer;

