// A complete React form with server database lookup functionality
// This example includes both frontend and backend code

// FRONTEND CODE
// =============

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserLookupPage from './pages/UserLookupPage';
import UserDetailsPage from './pages/UserDetailsPage';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f7fa;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<UserLookupPage />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
