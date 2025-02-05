import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile } from '../Controllers/User.Controllers.js';
import { authUser } from '../middlewares/auth.middleware.js';

//register user
const Router = express.Router();

// Register user with server side validation
Router.post(
  '/register',
  [
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First Name is required'),
    body('fullname.lastname').optional(),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  registerUser
);
// Login user with server side validation
Router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginUser);


Router.get('/profile',authUser,  getUserProfile )

export default Router;
