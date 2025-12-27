import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * ============================================================================
 * DITTO! - REFACTORED ENTRY POINT
 * ============================================================================
 * The monolithic structure has been modularized.
 * This file now serves as a pass-through to the new root component: App.jsx
 * 
 * New Structure:
 * /constants  - Configuration (themes, difficulties)
 * /components - UI primitives and Game/Screen specific components
 * /hooks      - Custom hooks for logic (useGameLogic, usePersistedScore)
 * App.jsx     - Main application assembly
 */

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)