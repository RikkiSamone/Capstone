import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Import your context

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext); // Get user from context

  // If there's no user, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected route
  return element;
};

export default ProtectedRoute;