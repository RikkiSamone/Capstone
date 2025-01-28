import React from 'react'
import './App.css'
import UserProvider from './context/userContext'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'


function App() {
  
  return (
    <>
      <UserProvider>
        <NavBar></NavBar>
          <AppRoutes></AppRoutes>
      </UserProvider>
    </>
  )
}

export default App
