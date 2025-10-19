import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Assuming this is your configured axios

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        // This function will run once when the app loads
        const verifyAuthToken = async () => {
            const token = localStorage.getItem('adminToken');
            
            if (token) {
                try {
                    // 1. Set the token header for the verification request
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // 2. Call your backend's verify route (getAdminProfile)
                    // This will throw an error if the token is invalid (e.g., 401)
                    await axiosInstance.get('/api/admin/profile');
                    
                    // 3. If the request succeeds, the token is valid
                    setIsAuthenticated(true);
                    
                } catch (error) {
                    // 4. If the token is invalid, log the user out
                    console.error("Token verification failed, logging out:", error.message);
                    localStorage.removeItem('adminToken');
                    delete axiosInstance.defaults.headers.common['Authorization'];
                    setIsAuthenticated(false);
                }
            }
            
            // 5. Finished loading, app can now render
            setLoading(false);
        };

        verifyAuthToken();
    }, []); // The empty array ensures this runs only once on mount

    const login = async (username, password) => {
        try {
            // Note: I'm using '/api/admin/login' to match your backend controller
            const response = await axiosInstance.post(
                "/api/admin/login",
                { username, password }
            );

            const data = response.data; 

            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setIsAuthenticated(true);
                
                console.log("Admin logged in successfully");
                navigate('/admin/dashboard'); 
                return true;
            } else {
                throw new Error('No token received');
            }

        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            localStorage.removeItem('adminToken');
            delete axiosInstance.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken'); 
        delete axiosInstance.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        navigate('/admin/login'); 
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