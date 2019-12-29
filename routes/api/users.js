const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User');

// @route  GET api/users
// @desc   Test route
// @access Public (don't need a token to access)
// router.get('/', (req, res) => res.send('User route'));

// @route  POST api/users
// @desc   Register User
// @access Public (don't need a token to access)
router.post('/', [
  //validations using express-validator
  check('name', 'Name is required')
  .not()
  .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Pleae enter a password with 6 or more characters'
  ).isLength({ min: 6 }) 
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

    // mongoose - promise using async await
    try {
      //* See if user exists
      let user = await User.findOne({ email });

      //* If user exists we will send error
      if(user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
      }

      //* Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //* Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
        // this finally saves the user
      await user.save();

      //* Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'),
      { expiresIn: 360000},
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
      );

    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

module.exports = router;