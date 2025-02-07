// dependencies
import express from 'express';
import { body } from 'express-validator';
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain
} from '../Controllers/Captain.controllers.js';
import { authCaptain } from '../middlewares/authCaptain.middleware.js';

//express router
const CaptainRouter = express.Router();

//register captain route gose here

CaptainRouter.post(
  '/register',
  [
    // Fullname validation
    body('fullname.firstname')
      .not()
      .isEmpty()
      .withMessage('First Name is required')
      .isLength({ min: 3 })
      .withMessage('First Name must be at least 3 characters long'),
    body('fullname.lastname').optional(),

    // Email validation
    body('email').isEmail().withMessage('Please enter a valid email'),

    // Password validation
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),

    // Status validation (optional, but must be 'active' or 'inactive' if provided)
    body('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Status must be either active or inactive'),

    // Vehicle validation
    body('vehicle.color')
      .not()
      .isEmpty()
      .withMessage('Color is required')
      .isLength({ min: 3 })
      .withMessage('Color must be at least 3 characters long'),

    body('vehicle.plateNumber')
      .not()
      .isEmpty()
      .withMessage('Plate Number is required')
      .isLength({ min: 3 })
      .withMessage('Plate Number must be at least 3 characters long'),

    body('vehicle.vehicleType')
      .not()
      .isEmpty()
      .withMessage('Vehicle Type is required')
      .isIn(['car', 'motorcycle', 'cng'])
      .withMessage('Vehicle Type must be either car, motorcycle, or cng'),

    body('vehicle.capactiy')
      .not()
      .isEmpty()
      .withMessage('Capacity is required')
      .isInt({ min: 1 })
      .withMessage('Capacity must be at least 1'),

    // Location validation (optional)
    body('location.lat')
      .optional()
      .isNumeric()
      .withMessage('Latitude must be a number'),
    body('location.lng')
      .optional()
      .isNumeric()
      .withMessage('Longitude must be a number')
  ],

  registerCaptain
);

//login captain route goes here
CaptainRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  loginCaptain
);

// Get captain profile with authentication middleware
CaptainRouter.get('/profile', authCaptain, getCaptainProfile);
// logout route goes here
CaptainRouter.get('/logout',authCaptain, logoutCaptain);

//export router to initialize it in the app
export default CaptainRouter;
