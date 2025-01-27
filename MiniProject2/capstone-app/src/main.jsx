import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import './index.css'

import UserProvider from './context/userContext.jsx'
import App from './App.jsx'


/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
const ErrorFallback = () => <h1>Oops! Something went wrong.</h1>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* All other routing components need this to work */}
    <BrowserRouter>
      <UserProvider>
       
          <App />
    
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);