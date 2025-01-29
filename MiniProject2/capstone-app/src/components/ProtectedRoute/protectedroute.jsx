import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Import UserContext

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(UserContext); // Get authentication status

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;