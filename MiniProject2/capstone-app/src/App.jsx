import React from 'react'
import './App.css'
import { UserProvider } from './context/userContext'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import { AuthProvider } from './context/auth-context'

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
