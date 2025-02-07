import blackListTokenModel from '../models/blackListToken.model.js';
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
    // Check if user already exists
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: 'User already exists' });
    }
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

    //* res.setHeader("Authorization", `Bearer ${token}`); //Send token in header
    
    res.cookie('x-auth-token', token);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  user profile route
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user logout route
export const logoutUser = async (req, res) => {
  try {
    // clear cookie and add token to blacklist
    res.clearCookie('x-auth-token', {
      // httpOnly: true,
      // secure: true,
      // sameSite: 'None'
    }) 
    const token =
      req.cookies?.['x-auth-token'] || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({ token });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};
