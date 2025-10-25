// import React, { useState } from 'react';
// import { useAuth } from '../../context/authContext';

// export const AdminLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const auth = useAuth();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError(''); 
        
//         const loggedIn = auth.login(username, password);
        
//         if (!loggedIn) {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                
//                 {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };


import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';


export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 
        
        const loggedIn = auth.login(username, password);
        
        if (!loggedIn) {
            setError('Invalid username or password');
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2692d1] via-[#1e7bb8] to-[#f48321] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f48321]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-xl mx-6">
                {/* Card Container */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header Section with Logo */}
                    <div className="bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] p-8 text-center relative">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f48321]/20 rounded-full -ml-12 -mb-12"></div>
                        
                        {/* Logo */}
                        <div className="relative mb-4">
                            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg">
                                <img 
                                    src="https://vsmthane.org/wp-content/uploads/2022/02/vsmthane-logo.jpg" 
                                    alt="VSM Logo" 
                                    className="h-16 w-auto"
                                />
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Admin Portal
                        </h2>
                        <p className="text-blue-100 text-sm">
                            Welcome back! Please login to continue
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-shake">
                                <p className="text-red-600 text-sm font-medium text-center flex items-center justify-center gap-2">
                                    <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2692d1]">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2692d1] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f48321]">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2692d1] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2692d1] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-[#2692d1] border-gray-300 rounded focus:ring-[#2692d1] cursor-pointer"
                                />
                                <span className="text-gray-600 font-medium">Remember me</span>
                            </label>
                            <a href="#" className="text-[#f48321] hover:text-[#d66b0d] font-semibold hover:underline">
                                Forgot Password?
                            </a>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform active:scale-95"
                        >
                            Login to Dashboard
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Secure Login</span>
                            </div>
                        </div>

                        {/* Security Badge */}
                        {/* <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Lock size={16} className="text-[#f48321]" />
                            <span>Protected by end-to-end encryption</span>
                        </div> */}
                    </form>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-6">
                    <p className="text-white text-sm">
                        © 2025 Vidyadaan Sahayyak Mandal. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                @keyframes delay-1000 {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};
