import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { UserProvider }from './context/userContext.jsx'
import App from './App.jsx'
import { ThemeProvider } from './context/themeContext.jsx'


/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
const ErrorFallback = () => <h1>Oops! Something went wrong.</h1>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* All other routing components need this to work */}
    <ThemeProvider>
    <BrowserRouter>
      <UserProvider>
          <App />
      </UserProvider>
      </BrowserRouter>
      </ThemeProvider>
  </StrictMode>
);