// Imports ---------------------------------------------------------------

// Load component dependencies.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserLookupPage from './pages/UserLookupPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserDatabasePage from './pages/UserDatabasePage';

// Styles ----------------------------------------------------------------

// Define application typography and spacing.
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f7fa;
  }
`;

// Component -------------------------------------------------------------

// Render application routes.
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<UserLookupPage />} />
        <Route path='/user/:id' element={<UserDetailsPage />} />
        <Route path='/users' element={<UserDatabasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
