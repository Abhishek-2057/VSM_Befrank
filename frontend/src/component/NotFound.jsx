import React from "react";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 px-4">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on Be Frank by VSM Thane."
        canonical="/404"
      />

      <div className="text-center max-w-xl">
        <h1 className="text-[120px] font-extrabold text-[#2692d1] leading-none">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Page not found
        </h2>

        <p className="text-gray-600 mt-3">
          The page you’re looking for might have been removed, renamed, or never
          existed.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#2692d1] text-white rounded-xl hover:bg-[#1e7bb8] transition-all shadow-lg"
          >
            <Home size={18} /> Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
