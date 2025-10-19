import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Assuming this is your configured axios

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
        setLoading(false); 
    }, []);

    const login = async (username, password) => {
        try {
            // Axios automatically stringifies the body and sets headers
            const response = await axiosInstance.post(
                "/user/login",
                { username, password }
            );

            // Axios response data is in `response.data`
            // The `response.ok` check is not needed, as axios throws an error on non-2xx status
            const data = response.data; 

            if (data.token) {
                // --- Store the token ---
                localStorage.setItem('adminToken', data.token);
                
                // --- Set token for all future axios requests ---
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                
                setIsAuthenticated(true);
                
                console.log("Admin logged in successfully");
                navigate('/admin/dashboard'); // Redirect to admin page
                return true;
            } else {
                throw new Error('No token received');
            }

        } catch (error) {
            // This catch block will now handle 401 (Invalid Credentials) errors from axios
            console.error("Login failed:", error.response ? error.response.data : error.message);
            
            // Ensure state is clean on failure
            localStorage.removeItem('adminToken');
            delete axiosInstance.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken'); // Clear the token
        
        // --- Clear the token from axios ---
        delete axiosInstance.defaults.headers.common['Authorization'];

        setIsAuthenticated(false);
        navigate('/admin/login'); // Redirect to login page
    };

    const value = {
        isAuthenticated,
        loading, 
        login,
        logout,
    };

    if (loading) {
        return <div>Loading...</div>; // Or a proper spinner component
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to easily use the context
export const useAuth = () => {
    return useContext(AuthContext);
};