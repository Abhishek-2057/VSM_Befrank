import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = () => {
    const auth = useAuth();

    // If authenticated, render the child component (e.g., EventForm)
    // Otherwise, redirect to the login page
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};