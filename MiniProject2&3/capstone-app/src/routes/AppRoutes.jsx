import { Routes, Route } from "react-router-dom";
import HomePage from "../components/LandingPage/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../components/LogIn/loginForm";
import DashboardPage from "../components/Dashboard/dashboard";
import CreateAccount from "../pages/CreateAccount";
import MeetOurCoaches from "../components/Coaches/coachBios";
import BookingForm from "../components/Dashboard/bookingform";
import ProtectedRoute from "../components/ProtectedRoute/protectedroute";

function AppRoutes(props) {

return (
<Routes>
{/* index matches on default/home URL: / */}
<Route index element={<HomePage {...props} />} />
{/* nested routes, matches on /dash/tasks etc */}
<Route path='/create-account' element={<CreateAccount />} />
<Route path='/login' element={<LoginForm />} />
<Route path='/book-appointment/:coachName' element={<BookingForm />} />
<Route path='/book-appointment' element={<BookingForm />} />

{/* Protected Routes */}
<Route path='/mydashboard' element={<ProtectedRoute element={<DashboardPage />} />} />
<Route path='/coaches' element={<ProtectedRoute element={<MeetOurCoaches />} />} />
{/* special route to handle if none of the above match */}
<Route path="*" element={<PageNotFound />} />

</Routes>
)
}

export default AppRoutes;