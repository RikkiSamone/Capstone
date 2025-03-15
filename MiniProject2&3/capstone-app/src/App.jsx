import React from 'react'
import './App.css'
import { UserProvider } from './context/userContext'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import { AuthProvider } from './context/auth-context.jsx'
//import ProtectedRoute from './components/ProtectedRoute/protectedroute'
//import { CoachAdminProvider } from './context/coachAdminContext'
//import CoachAdminPage from './pages/CoachAdminPage'



function App() {
  
  return (
    <>
     
      <AuthProvider>
      <UserProvider>
        <NavBar></NavBar>
          <AppRoutes></AppRoutes>
        </UserProvider>
        </AuthProvider>
    
        
      
    </>
  )
}

export default App
