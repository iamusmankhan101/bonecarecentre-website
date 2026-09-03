import React from 'react'
import ReactDOM from 'react-dom/client'
import About from './About.jsx'
import './index.css'

// Entry for about.html, served at /about (see vercel.json's cleanUrls).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <About />
  </React.StrictMode>,
)
