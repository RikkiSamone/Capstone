import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    // Simulate logging in
    setUser({ username: "JohnDoe", email: "johndoe@example.com" });
  };

  const handleLogout = () => {
    // Clear the user state
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <h1>Please log in</h1>
          <button onClick={handleLogin}>Log In</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;