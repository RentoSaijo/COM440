// Imports ---------------------------------------------------------------

// Load component dependencies.
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styles ----------------------------------------------------------------

// Center search results.
const ListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Arrange result entries.
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

// Style selectable users.
const ListItem = styled.li`
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  h3 {
    margin: 0 0 0.5rem;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

// Display empty search results.
const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  h3 {
    margin: 0 0 1rem;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

// Component -------------------------------------------------------------

// Render matching user records.
const UserList = ({ users }) => {
  const navigate = useNavigate();

  // Helpers -------------------------------------------------------------

  // Open selected user details.
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (!users || users.length === 0) {
    return (
      <ListContainer>
        <EmptyMessage>
          <h3>No users found</h3>
          <p>Try a different search term or create a new user.</p>
        </EmptyMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            role='link'
            tabIndex={0}
            onClick={() => handleUserClick(user.id)}
            onKeyDown={event => { if (event.key === 'Enter') handleUserClick(user.id); }}
          >
            <h3>{user.name}</h3>
            <p>User id: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default UserList;
