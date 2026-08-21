import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'

// Entry for home.html — the homepage preview at /home. The root page (index.html →
// main.jsx) still serves ComingSoon; swap that when the site goes live.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
