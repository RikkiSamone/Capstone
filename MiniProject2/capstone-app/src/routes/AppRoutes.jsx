import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../components/LogIn/loginForm";
import DashboardPage from "../components/Dashboard/dashboard";

function AppRoutes(props) {

return (
<Routes>
{/* index matches on default/home URL: / */}
<Route index element={<Homepage {...props} />} />

{/* nested routes, matches on /dash/tasks etc */}
<Route path='/login' element={<LoginForm />} />
<Route path='/mydashboard' element={<DashboardPage />} />



{/* special route to handle if none of the above match */}
        <Route path="*" element={<PageNotFound />} />

</Routes>
)
}

export default AppRoutes;