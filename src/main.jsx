import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './authContext.jsx'
import { BrowserRouter, Router } from 'react-router-dom';
import ProjectRoutes from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ProjectRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
