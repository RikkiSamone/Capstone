// routes/userRoutes.js
const express = require('express');
const { createUser } = require('../controllers/Users/createUser');
const login = require('../controllers/Users/loginUser')
const searchUser = require('../controllers/Users/getUser');
const updateUser = require('../controllers/Users/updateUser');
const deleteUser = require('../controllers/Users/deleteUser');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

// Route for creating a user
router.post('/create-account', createUser);

//Route for login
router.post('/login', login);

// Route for getting a user
router.get('/search/:email', searchUser);

// Route for updating a user
router.put('/update-user', updateUser);

// Route for deleting a user
router.delete('/delete-user/:email', deleteUser);

// Route for getting the currently authenticated user
router.get('/me', authenticateJWT, (req, res) => {
  // Assuming the token is validated and user info is added to the request object
  res.json(req.user);  // Send back the user data from the token
});

module.exports = router;