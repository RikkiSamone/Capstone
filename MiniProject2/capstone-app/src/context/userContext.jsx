import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext({
  user: null,       // Default: no user is logged in
  setUser: () => {}, // Placeholder function for updating the user
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // User state (e.g., username, email, etc.)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Ensures children components can access the context */}
    </UserContext.Provider>
  );
}