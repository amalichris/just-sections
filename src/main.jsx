import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Standalone site: tokens, then fonts, then the global reset. A host application
// embedding a single section imports only `styles/tokens.css` plus that section's
// own stylesheet — `reset.css` would fight its existing global styles.
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/reset.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
