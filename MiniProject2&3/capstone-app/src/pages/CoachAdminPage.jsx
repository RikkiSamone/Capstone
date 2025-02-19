import React from "react";
import { useCoachAdmin } from "../context/coachAdminContext"; // Access context

const CoachAdminPage = () => {
  const { isLoggedIn, coachId, logoutCoach } = useCoachAdmin();

  if (!isLoggedIn) {
    return <div>Please log in to access the admin page.</div>;
  }

  return (
    <div>
      <h1>Welcome, Coach {coachId}</h1>
      {/* Render coach's calendar, availability, etc. */}
      <button onClick={logoutCoach}>Logout</button>
    </div>
  );
};

export default CoachAdminPage;
