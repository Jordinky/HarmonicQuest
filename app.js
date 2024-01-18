// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const { faker } = require('@faker-js/faker');
const app = express();

app.use(bodyParser.json());

// Mock data for musician profiles
const musicians = [];
for (let i = 0; i < 10; i++) {
  musicians.push({
    id: i + 1,
    name: faker.person.fullName(),
    password: faker.internet.password(),
    skills: faker.person.jobTitle(3).split(' '),
    instruments: faker.person.jobType(2).split(' '),
    genres: faker.music.genre(2).split(' '),
    location: faker.location.city(),
    description: faker.lorem.paragraph(),
  });
}
const registeredUsers = musicians;

// Secret key for JWT, should be kept secret in a real application
const secretKey = 'your-secret-key';
// Routes

function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  }


// Mock route to get all musicians
app.get('/musicians', (req, res) => {
  res.json(musicians);
});

// Mock route to register a new user (no actual user registration logic here)
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username already exists
    const userExists = registeredUsers.some((user) => user.username === username);
    
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    // In a real application, you should hash and salt the password for security
    const newUser = {
      username,
      password, // You should hash and salt passwords in a real application
    };
  
    // Save the user to the mock database
    registeredUsers.push(newUser);
  
    // Generate a JWT token and return it in the response
    const token = generateToken(username);
    res.status(201).json({ message: 'User registered successfully', token });
  });
 
app.post('/login', (req, res) => {
const { username, password } = req.body;

// Check if the user exists and the password matches (in a real app, compare hashed passwords)
const user = registeredUsers.find((user) => user.username === username && user.password === password);

if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
}

// Generate a JWT token and return it in the response
const token = generateToken(username);
res.status(200).json({ message: 'Authentication successful', token });
}); 

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
