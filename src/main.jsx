import React from 'react'
import ReactDOM from 'react-dom/client'
import ComingSoon from './ComingSoon.jsx'
import './index.css'

// The homepage is built and ready in ./Home.jsx — swap the import and the element
// below to put it live.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ComingSoon />
  </React.StrictMode>,
)
