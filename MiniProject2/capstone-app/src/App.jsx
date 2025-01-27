import React from 'react'
import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import MyThemeProvider from './context/themeContext'
import UserProvider from './context/userContext'



function App() {
  
  return (
    <>
      <UserProvider>
        <MyThemeProvider>
        <NavBar></NavBar>
          <AppRoutes></AppRoutes>
          </MyThemeProvider>
      </UserProvider>
    </>
  )
}

export default App
