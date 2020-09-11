const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const config = require('config');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstruct request body
    const { name, email, password } = req.body;

    try {
      // only create a new user if the email doesn't exist
      let user = await User.findOne({ email });

      if (user) {
        console.log(`user exists: ${user}`);

        return res.status(400).json({ msg: 'User already exists' });
      }

      // create a new user
      user = new User({
        name,
        email,
        password,
      });

      // generate salt
      const salt = await bcrypt.genSalt(10);

      // hash the password using the salt
      user.password = await bcrypt.hash(password, salt);

      // save the user
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // return JWT
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
