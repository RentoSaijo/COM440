// Setup -----------------------------------------------------------------

// Load server libraries.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configure JSON requests and cross-origin access.
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

// Database --------------------------------------------------------------

// Initialize sample users.
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    salary: 120,
    department: 'Engineering',
    location: 'New York',
    joinDate: '2021-03-15',
    projects: ['Project Alpha', 'Project Beta'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    salary: 210,
    department: 'Engineering',
    location: 'San Francisco',
    joinDate: '2019-06-22',
    projects: ['Project Alpha', 'Project Gamma', 'Project Delta'],
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Admin',
    salary: 190,
    department: 'IT',
    location: 'Chicago',
    joinDate: '2020-01-10',
    projects: ['User Management', 'Security', 'Infrastructure'],
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Designer',
    salary: 70,
    department: 'Product',
    location: 'Seattle',
    joinDate: '2022-02-18',
    projects: ['UI Redesign', 'Mobile App'],
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Product Manager',
    salary: 95,
    department: 'Product',
    location: 'Boston',
    joinDate: '2020-09-05',
    projects: ['Web Platform', 'Mobile App'],
  },
  {
    id: '6',
    name: 'Tom Spartan',
    email: 'tom.spartan@conncoll.edu',
    role: 'Product Manager',
    salary: 84,
    department: 'Product',
    location: 'New London',
    joinDate: '2023-09-17',
    projects: ['Web Platform', 'Degree Works'],
  },
  {
    id: '7',
    name: 'Ellie Sudakis',
    email: 'esudakis@conncoll.edu',
    role: 'Programmer',
    salary: 79,
    department: 'Product',
    location: 'New London',
    joinDate: '2024-02-03',
    projects: ['CamelWeb', 'Banner'],
  },
];

// Allocate increasing user identifiers.
let nextUserId = Math.max(...users.map(user => Number(user.id))) + 1;

// Helpers ---------------------------------------------------------------

// Format current local date.
const getJoinDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Select fields used by search results.
const summarizeUser = ({ id, name, email, role }) => ({ id, name, email, role });

// Routes ----------------------------------------------------------------

// Search names, email addresses, roles, and departments.
app.get('/api/users/search', (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  const results = users.filter(user =>
    [user.name, user.email, user.role, user.department].some(value =>
      value.toLowerCase().includes(query)
    )
  );
  res.json(results.map(summarizeUser));
});

// List complete records in salary order.
app.get('/api/users', (req, res) => {
  const order = req.query.order || 'asc';
  if (!['asc', 'desc'].includes(order)) {
    return res.status(400).json({ error: 'Order must be asc or desc' });
  }
  const direction = order === 'desc' ? -1 : 1;
  const sortedUsers = [...users].sort((first, second) =>
    direction * (first.salary - second.salary)
  );
  res.json(sortedUsers);
});

// Retrieve individual user details.
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Validate and create user records.
app.post('/api/users', (req, res) => {
  const { name, email, role, salary, department } = req.body || {};
  if (typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Email is invalid' });
  }
  if (!Number.isSafeInteger(salary) || salary < 0) {
    return res.status(400).json({ error: 'Salary must be a nonnegative whole number' });
  }
  if ((role !== undefined && typeof role !== 'string') ||
      (department !== undefined && typeof department !== 'string')) {
    return res.status(400).json({ error: 'Role and department must be text' });
  }
  if (users.some(user => user.email.toLowerCase() === email.trim().toLowerCase())) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const newUser = {
    id: String(nextUserId++),
    name: name.trim(),
    email: email.trim(),
    role: role?.trim() || 'User',
    salary,
    department: department?.trim() || '',
    location: 'Not specified',
    joinDate: getJoinDate(),
    projects: ['final project'],
  };
  users.push(newUser);
  res.status(201).json(summarizeUser(newUser));
});

// Delete matching user records.
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(user => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).end();
});

// Startup ---------------------------------------------------------------

// Listen for client requests.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
