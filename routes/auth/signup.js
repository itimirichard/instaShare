const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const validateRequest = require('../../middlewares/request-validation');

const signupRouter = Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Password must be between 5 and 15 characters long'),
  ],
  validateRequest,
  async (req, res) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      console.log(email);
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('Email already in use');
      }

      const user = new User({ email, password });
      await user.save();

      // Generate JWT and store it on the session object
      const userJWT = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY
      );

      req.session = {
        jwt: userJWT,
      };

      res.status(201).send({ email: user.email, token: req.session.jwt });
    } catch (error) {
      console.error(error);
      res.status(400).send({ errors: [{ msg: 'Email already in use' }] });
    }
  }
);

module.exports = signupRouter;
