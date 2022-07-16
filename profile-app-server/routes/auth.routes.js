const router = require('express').Router();
// jwt auth token
const jwt = require('jsonwebtoken');
// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
// Require the User model in order to interact with the database
const User = require('../models/User.model');
// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

/* router.get('/loggedin', (req, res) => {
  res.json(req.user);
}); */

router.post('/signup', async (req, res, next) => {
  const { username, password, campus, course, image } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(400).json({ errorMessage: 'Username already taken.' });
    }
    // if user is not found, create a new user - start with hashing the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPW = bcrypt.hashSync(password, salt);
    await User.create({
      username,
      password: hashedPW,
      campus,
      course,
      image,
    });
    return res.status(201).json({ message: 'All good' });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage:
          'Username need to be unique. The username you chose is already in use.',
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }
  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }
  // Search the database for a user with the username submitted in the form
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({ errorMessage: 'Wrong credentials.' });
    }
    // If user is found based on the username, check if the in putted password matches the one saved in the database
    const comparePassword = bcrypt.compareSync(password, foundUser.password);
    if (comparePassword) {
      // save user object
      const user = foundUser.toObject();
      delete user.password;

      /* req.session.currentUser = user;
      return res.json(user); */

      // if password is true, create token
      const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });
      // send token to client
      res.status(200).json({ authToken, authToken });
      console.log(authToken);
    } else {
      res.status(400).json({ message: 'Oops, something went wrong!' });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/verify', isLoggedIn, (req, res) => {
  res.status(200).json(req.payload);
});

/* router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ message: 'Done' });
  });
}); */

module.exports = router;
