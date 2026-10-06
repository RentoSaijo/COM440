// Imports ---------------------------------------------------------------

// Load React and application styles.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Startup ---------------------------------------------------------------

// Mount application in browser.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
