// Imports ---------------------------------------------------------------

// Load component dependencies.
import { useState } from 'react';
import styled from 'styled-components';
import SearchForm from '../components/SearchForm';
import UserList from '../components/UserList';
import CreateUserForm from '../components/CreateUserForm';
import DatabaseButtons from '../components/DatabaseButtons';
import { searchUsers } from '../services/api';

// Styles ----------------------------------------------------------------

// Center page content.
const PageContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

// Style page heading.
const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin: 0 0 1rem;
  }
  p {
    color: #666;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

// Display loading indicator.
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  margin: 2rem auto;
  .loader {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Display request errors.
const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  background: #fde2e2;
  padding: 1rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
`;

// Separate search and creation forms.
const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 3rem 0;
`;

// Component -------------------------------------------------------------

// Render search and user creation controls.
const UserLookupPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helpers -------------------------------------------------------------

  // Retrieve matching users.
  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchUsers(query);
      setSearchResults(results);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Include newly created users in displayed search results.
  const handleUserCreated = (newUser) => {
    if (hasSearched) {
      setSearchResults(prev => [newUser, ...prev]);
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>User Database Lookup</h1>
        <p>Search for users in the database or create a new user</p>
      </Header>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <ErrorMessage role='alert'>{error}</ErrorMessage>}

      {isLoading ? (
        <LoadingContainer role='status' aria-label='Searching users'>
          <div className='loader'></div>
        </LoadingContainer>
      ) : (
        hasSearched && <UserList users={searchResults} />
      )}

      <Divider />

      <CreateUserForm onUserCreated={handleUserCreated} />
      <DatabaseButtons />
    </PageContainer>
  );
};

export default UserLookupPage;
