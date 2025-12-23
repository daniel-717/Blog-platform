const express = require('express');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');
const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Register endpoint hit with body:', req.body);
  try{
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password, // Password is automatically hashed by pre-save middleware
    });

    if (user) {
      res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.error('Error during user registration:', err);
  } 
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});
router.post('/logout', (req, res) => {
    // For JWT, logout is primarily handled by the client deleting the token.
    res.json({ message: 'Logout successful' });
});

module.exports = router;