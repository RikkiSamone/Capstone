import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import HomePage from "../components/LandingPage/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../components/LogIn/loginForm";
import CreateAccount from "../pages/CreateAccount";
import MeetOurCoaches from "../components/Coaches/coachBios";
import BookingPage from "../components/Dashboard/bookingPage";
import CoachAvailabilityForm from "../components/CoachAvailability/CoachAvailability";
import CoachCalendar from "../components/CoachCalendar/CoachCalendar";
import CoachAdminPage from "../pages/CoachAdminPage";
import CoachLogin from "../components/CoachLogIn/CoachLogin";
import DashboardPage from "../components/Dashboard/dashboard";
import ProfilePage from "../pages/UpdateProfilePage";
import MyProfilePage from "../pages/MyProfile";
import ResourcesPage from "../pages/Resources";
import Unauthorized from "../pages/UnauthorizedPage";

// AppRoutes component
function AppRoutes(props) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Wait for authentication state to be set before rendering routes
  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator until authentication is checked
  }

  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<HomePage {...props} />} />

      {/* user creation and login */}
      <Route path='/create-account' element={<CreateAccount />} />
      <Route path='/login' element={isAuthenticated ? <Navigate to="/mydashboard" /> : <LoginForm />} />
      <Route path='/update-profile' element={<ProfilePage />} />
          

      {/* user: appointment booking */}
      <Route path='/book-appointment/:coachName' element={<BookingPage />} />
      <Route path='/book' element={<BookingPage />} />

      {/* Coach Interface */}
      <Route path="/coach-dashboard" element={user?.role === "coach" ? <CoachAdminPage /> : <Navigate to="/unauthorized" />} />
      <Route path="/coach-login" element={<CoachLogin />} />
      <Route path='/coach-availability' element={<CoachAvailabilityForm />} />
      <Route path='/coach-calendar' element={<CoachCalendar />} />

      {/* User Interface */}
      <Route path='/coaches' element={<MeetOurCoaches />} />
          <Route path="/mydashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path='/myprofile' element={<MyProfilePage />} />
          <Route path='/resources' element={<ResourcesPage />} />

      {/* special route to handle if none of the above match */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default AppRoutes;