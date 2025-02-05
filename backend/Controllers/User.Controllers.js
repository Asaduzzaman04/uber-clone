import userModel from '../models/user.model.js';
import { createUser } from '../Services/User.Services.js';
import { validationResult } from 'express-validator';

// Register user route
export const registerUser = async (req, res) => {
  try {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullname: { firstname, lastname },
      email,
      password
    } = req.body;

    // Hash password before saving
    const hashPassword = await userModel.hashPassword(password);
    // Create user
    const user = await createUser({
      firstname,
      lastname,
      email,
      password: hashPassword
    });
    // Generate JWT token for authentication
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user route
export const loginUser = async (req, res) => {
  try {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email and password' });
    }

    // Compare password for authentication
    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token for authentication
    const token = user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  user profile route
export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
