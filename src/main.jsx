import React from 'react'
import ReactDOM from 'react-dom/client'
import ComingSoon from './ComingSoon.jsx'
import './index.css'

// Entry for coming-soon.html. The real site is live at the root now; this is kept so the
// coming-soon page can be put back there if it is ever needed again.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ComingSoon />
  </React.StrictMode>,
)
