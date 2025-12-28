
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (loading) return;

      setLoading(true);
      const toastId = toast.loading("Logging in...");

      try {
        const loggedIn = await auth.login(username, password);

        if (!loggedIn) {
          throw new Error("Invalid username or password");
        }

        toast.update(toastId, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (err) {
        setError(err.message);
        toast.update(toastId, {
          render: err.message || "Login failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };


    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#2692d1] via-[#1e7bb8] to-[#f48321] relative overflow-hidden p-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f48321]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Login Card - Changed max-w-xl to max-w-sm for a tighter fit */}
        <div className="relative z-10 w-full max-w-sm mx-auto">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section with Logo - Reduced padding */}
            <div className="bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] p-6 text-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#f48321]/20 rounded-full -ml-8 -mb-8"></div>

              {/* Logo - Slightly smaller */}
              <div className="relative mb-3">
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                  <img
                    src="https://vsmthane.org/wp-content/uploads/2022/02/vsmthane-logo.jpg"
                    alt="VSM Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </div>

              {/* Title - Reduced font size */}
              <h2 className="text-2xl font-bold text-white mb-1">
                Admin Portal
              </h2>
              <p className="text-blue-100 text-xs">Please login to continue</p>
            </div>

            {/* Form Section - Reduced padding and spacing */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-shake">
                  <p className="text-red-600 text-xs font-medium text-center flex items-center justify-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    {error}
                  </p>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wide"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2692d1]">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="username"
                    disabled={loading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2692d1] focus:border-transparent transition-all duration-300 text-sm text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wide"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f48321]">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2692d1] focus:border-transparent transition-all duration-300 text-sm text-gray-800 placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2692d1] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white py-3 rounded-lg font-bold text-base hover:shadow-lg hover:scale-[1.02] transition-all duration-300 transform active:scale-95 mt-2"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-400">
                    Secure Admin Access
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-xs">
              © 2025 Vidyadaan Sahayyak Mandal.
            </p>
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx global>{`
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
      </div>
    );
};