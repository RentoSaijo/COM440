// Configuration ---------------------------------------------------------

// Locate local backend.
const API_BASE_URL = 'http://localhost:3001/api';

// Helpers ---------------------------------------------------------------

// Read responses and report server errors.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: 'no-store', ...options });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
};

// User requests ---------------------------------------------------------

// Search matching users.
export const searchUsers = query =>
  request(`/users/search?q=${encodeURIComponent(query)}`);

// Retrieve individual user details.
export const getUserById = userId => request(`/users/${encodeURIComponent(userId)}`);

// Create user records.
export const createUser = userData => request('/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData),
});

// Retrieve complete records in salary order.
export const getUsers = order => request(`/users?order=${encodeURIComponent(order)}`);

// Delete individual user records.
export const deleteUser = userId => request(`/users/${encodeURIComponent(userId)}`, {
  method: 'DELETE',
});
