// Imports ---------------------------------------------------------------

// Load database services and page tools.
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import DatabaseButtons from '../components/DatabaseButtons';
import { deleteUser, getUsers } from '../services/api';

// Styles ----------------------------------------------------------------

// Center database content.
const PageContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  h1 {
    margin: 1.5rem 0 1rem;
    font-size: 1.75rem;
  }
`;

// Style return navigation.
const BackButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  background: #4a90e2;
  color: white;
  text-decoration: none;
  &:hover {
    background: #3a7bc8;
  }
`;

// Allow horizontal scrolling on small screens.
const TableContainer = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    min-width: 1000px;
    border-collapse: collapse;
    background: white;
    font-size: 0.875rem;
  }
  caption {
    margin-bottom: 0.75rem;
    text-align: left;
    color: #555;
  }
  th,
  td {
    padding: 0.75rem;
    border: 1px solid #bac4d0;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #e1edfc;
  }
  tbody tr:nth-child(even) {
    background: #f5f7fa;
  }
`;

// Style row deletion controls.
const DeleteButton = styled.button`
  display: inline-flex;
  padding: 0.6rem;
  border: 1px solid #d7b2b0;
  border-radius: 4px;
  background: white;
  color: #a52c25;
  cursor: pointer;
  &:hover {
    background: #fde2e2;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Present loading, empty, and error messages.
const Status = styled.p`
  margin: 1rem 0;
  &[role='alert'] {
    color: #b42318;
  }
`;

// Component -------------------------------------------------------------

// Display complete user records.
const UserDatabasePage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Fetch current records on each navigation and deletion.
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError('');
    getUsers(order)
      .then(data => { if (active) setUsers(data); })
      .catch(err => { if (active) setError(err.message || 'Unable to load users.'); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [order, location.key, refresh]);

  // Confirm deletions and reload current salary order.
  const handleDelete = async user => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    setDeletingId(user.id);
    setError('');
    try {
      await deleteUser(user.id);
      setRefresh(value => value + 1);
    } catch (err) {
      setError(err.message || 'Unable to delete user.');
    } finally {
      setDeletingId(null);
    }
  };

  // Render table and navigation controls.
  return (
    <PageContainer>
      <BackButton to='/'>← Back to Search</BackButton>
      <h1>User Database</h1>
      {error && <Status role='alert'>{error}</Status>}
      {isLoading ? (
        <Status role='status'>Loading users...</Status>
      ) : users.length > 0 ? (
        <TableContainer role='region' aria-label='User database table' tabIndex={0}>
          <table>
            <caption>Salary in thousands, {order === 'asc' ? 'ascending' : 'descending'} order</caption>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
                <th scope='col' aria-sort={order === 'asc' ? 'ascending' : 'descending'}>Salary</th>
                <th scope='col'>Department</th>
                <th scope='col'>Location</th>
                <th scope='col'>Join Date</th>
                <th scope='col'>Projects</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.salary}</td>
                  <td>{user.department}</td>
                  <td>{user.location}</td>
                  <td>{user.joinDate}</td>
                  <td>{user.projects.join(', ')}</td>
                  <td>
                    <DeleteButton
                      type='button'
                      aria-label={`Delete ${user.name}`}
                      title={`Delete ${user.name}`}
                      disabled={deletingId !== null}
                      onClick={() => handleDelete(user)}
                    >
                      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' aria-hidden='true'>
                        <path d='M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6' />
                      </svg>
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      ) : !error && <Status>No users in database.</Status>}
      <DatabaseButtons order={order} disabled={isLoading || deletingId !== null} />
    </PageContainer>
  );
};

export default UserDatabasePage;
