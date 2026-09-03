import React from 'react'
import ReactDOM from 'react-dom/client'
import WhyUs from './WhyUs.jsx'
import './index.css'

// Entry for why-us.html, served at /why-us (see vercel.json's cleanUrls).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WhyUs />
  </React.StrictMode>,
)
