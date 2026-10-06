// BACKEND CODE
// ============

// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    salary: '120',
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
    salary: '210',
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
    salary: '190',
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
    salary: '70',
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
    salary: '95',
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
    salary: '84',
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
    salary: '79',
    department: 'Product',
    location: 'New London',
    joinDate: '2024-02-03',
    products: ['CamelWeb', 'Banner'],
  },
];

// Routes
app.get('/api/users/search', (req, res) => {
  console.log('In /api/users/search...');
  const query = req.query.q?.toLowerCase() || '';

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const results = users.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query) ||
    (user.department && user.department.toLowerCase().includes(query))
  );

  // Return simplified results for the search
  const simplifiedResults = results.map(({ id, name, email, role }) => ({
    id, name, email, role
  }));

  res.json(simplifiedResults);
});

app.get('/api/users/:id', (req, res) => {
  console.log(`In /api/users/:id... where id is ${req.params.id}`);
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(`Server responded with user name ${user.name}`);

  res.json(user);
});

app.post('/api/users', (req, res) => {
  console.log('In /api/users...');
  const { name, email, role, department } = req.body;
  console.log(`Name: {name}`);

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    role: role || 'User',
    department: department || '',
    joinDate: new Date().toISOString().split('T')[0],
  };

  // Add to database
  users.push(newUser);
  //console.log('New User Added');
  //console.log(users)

  // Return simplified user object
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
