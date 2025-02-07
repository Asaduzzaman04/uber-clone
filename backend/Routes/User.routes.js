import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
} from '../Controllers/User.Controllers.js';
import { authUser } from '../middlewares/authUser.middleware.js';

//register user
const UserRouter = express.Router();

// Register user with server side validation
UserRouter.post(
  '/register',
  [
    body('fullname.firstname')
      .not()
      .isEmpty()
      .withMessage('First Name is required')
      .isLength({ min: 3 })
      .withMessage('First Name must be at least 3 characters long'),

    body('fullname.lastname').optional(),

    body('email').isEmail().withMessage('Please enter a valid email'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('socketID').not().isEmpty().withMessage('Socket ID is required')
  ],
  registerUser
);
// Login user with server side validation
UserRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  loginUser
);

// Get user profile with authentication middleware
UserRouter.get('/profile', authUser, getUserProfile);
//user logout route goes here
UserRouter.get('/logout', authUser, logoutUser);

//export router to initialize it in the app
export default UserRouter;
