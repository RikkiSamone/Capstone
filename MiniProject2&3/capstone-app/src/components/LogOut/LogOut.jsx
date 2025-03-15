import React from 'react';
import { useAuth } from '../../context/auth-context'; // Make sure the path matches your auth-context file

const LogoutButton = () => {
  const { logout } = useAuth(); // Access the logout function from context

  const handleLogout = () => {
    logout(); // Call logout when button is clicked
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;