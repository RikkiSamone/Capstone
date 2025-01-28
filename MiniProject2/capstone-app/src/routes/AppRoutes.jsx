import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../components/LogIn/loginForm";
import DashboardPage from "../components/Dashboard/dashboard";
import CreateAccount from "../pages/CreateAccount";
import MeetOurCoaches from "../components/Coaches/coachBios";
import BookingForm from "../components/Dashboard/bookingform";

function AppRoutes(props) {

return (
<Routes>
{/* index matches on default/home URL: / */}
<Route index element={<Homepage {...props} />} />
{/* nested routes, matches on /dash/tasks etc */}
<Route path='/create-account' element={<CreateAccount />} />
<Route path='/login' element={<LoginForm />} />
<Route path='/mydashboard' element={<DashboardPage />} />
<Route path='/coaches' element={<MeetOurCoaches />} />
<Route path="/book-appointment/:coachName" element={<BookingForm />} />




{/* special route to handle if none of the above match */}
<Route path="*" element={<PageNotFound />} />

</Routes>
)
}

export default AppRoutes;