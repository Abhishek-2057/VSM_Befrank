import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // This function simulates calling your backend
    const login = (username, password) => {
        // --- SIMULATED BACKEND CHECK ---
        // In a real app, you'd fetch() your backend.
        // Here, we just check the hardcoded values.
        if (username === 'admin' && password === 'password123') {
            setIsAuthenticated(true);
            console.log("Admin logged in");
            navigate('/admin/dashboard'); // Redirect to admin page after login
            return true;
        } else {
            console.log("Invalid credentials");
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/admin/login'); // Redirect to login page after logout
    };

    // 3. Pass the values to the context
    const value = {
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook to easily use the context
export const useAuth = () => {
    return useContext(AuthContext);
};