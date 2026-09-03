import React from 'react'
import ReactDOM from 'react-dom/client'
import Services from './Services.jsx'
import './index.css'

// Entry for services.html, served at /services (see vercel.json's cleanUrls).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Services />
  </React.StrictMode>,
)
