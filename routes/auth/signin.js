const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const validateRequest = require('../../middlewares/request-validation');
const Password = require('../../services/password');

const signinRouter = Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      const passwordMatch = await Password.compare(
        existingUser.password,
        password
      );

      // Generate JWT and store it on the session object
      const userJWT = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY
      );
      req.session.jwt = userJWT;

      res.status(200).send(existingUser);
    } catch (error) {
      console.error(error);
      res.status(400).send({ errors: [{ message: 'Invalid Credentials' }] });
    }
  }
);

module.exports = signinRouter;
