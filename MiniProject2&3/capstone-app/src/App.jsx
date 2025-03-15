import React from 'react'
import './App.css'
import { UserProvider } from './context/userContext'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import { AuthProvider } from './context/auth-context.jsx'
//import ProtectedRoute from './components/ProtectedRoute/protectedroute'
//import { CoachAdminProvider } from './context/coachAdminContext'
//import CoachAdminPage from './pages/CoachAdminPage'
import { Button } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";



const App = ({ toggleTheme, mode }) => {
  
  return (
    <>
     
      <AuthProvider>
        <UserProvider>
          <Button onClick={toggleTheme} startIcon={mode === "dark" ? <Brightness7 /> : <Brightness4 />}>
        {mode === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
        <NavBar></NavBar>
          <AppRoutes></AppRoutes>
        </UserProvider>
        </AuthProvider>
    
        
      
    </>
  )
}

export default App
