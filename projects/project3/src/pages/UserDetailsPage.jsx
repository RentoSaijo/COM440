// Imports ---------------------------------------------------------------

// Load component dependencies.
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserById } from '../services/api';

// Styles ----------------------------------------------------------------

// Center page content.
const PageContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

// Style return navigation.
const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.2s ease;
  &:hover {
    background: #3a7bc8;
  }
`;

// Group user details.
const UserCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: clamp(1rem, 3vw, 2rem);
  overflow-wrap: anywhere;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

// Style user heading.
const UserHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  h1 {
    margin: 0 0 0.5rem;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
    font-size: 1.1rem;
  }
`;

// Arrange user details.
const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 1.5rem;
`;

// Style individual fields.
const InfoItem = styled.div`
  h3 {
    margin: 0 0 0.5rem;
    color: #555;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  p {
    margin: 0;
    color: #333;
    font-size: 1.1rem;
  }
`;

// Display loading indicator.
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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
  margin: 2rem 0;
`;

// Style recovery actions.
const RetryButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #3a7bc8;
  }
`;

// Component -------------------------------------------------------------

// Render individual user details.
const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helpers -------------------------------------------------------------

  // Retrieve requested user records.
  const fetchUserDetails = async () => {
    if (!id) {
      setError('User ID is missing');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userData = await getUserById(id);
      if (!userData) {
        throw new Error('No user data returned from the server');
      }
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Failed to load user details');
    } finally {
      setIsLoading(false);
    }
  };

  // Load details when user identifiers change.
  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  // Retry failed requests.
  const handleRetry = () => {
    fetchUserDetails();
  };

  // Return to search page.
  const handleGoBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <PageContainer>
        <BackButton to='/'>← Back to Search</BackButton>
        <LoadingContainer role='status' aria-label='Loading user details'>
          <div className='loader'></div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !user) {
    return (
      <PageContainer>
        <BackButton to='/'>← Back to Search</BackButton>
        <ErrorMessage role='alert'>
          {error || 'User not found'}
          <div style={{ marginTop: '1rem' }}>
            <RetryButton onClick={handleRetry} style={{ marginRight: '1rem' }}>
              Retry
            </RetryButton>
            <RetryButton onClick={handleGoBack}>
              Go to Home Page
            </RetryButton>
          </div>
        </ErrorMessage>
      </PageContainer>
    );
  }

  // Select details displayed below user heading.
  const userDetails = Object.entries(user).filter(
    ([key]) => !['id', 'name', 'email'].includes(key)
  );

  return (
    <PageContainer>
      <BackButton to='/'>← Back to Search</BackButton>

      <UserCard>
        <UserHeader>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p><small>User ID: {user.id}</small></p>
        </UserHeader>

        <UserInfo>
          {userDetails.length > 0 ? (
            userDetails.map(([key, value]) => (
              <InfoItem key={key}>
                <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                <p>
                  {Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'object' && value !== null
                      ? JSON.stringify(value)
                      : value}
                </p>
              </InfoItem>
            ))
          ) : (
            <InfoItem>
              <p>No additional details available for this user.</p>
            </InfoItem>
          )}
        </UserInfo>
      </UserCard>
    </PageContainer>
  );
};

export default UserDetailsPage;
