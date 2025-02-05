import userModel from '../models/user.model.js';
import { createUser } from '../Services/User.Services.js';
import { validationResult } from 'express-validator';

export const registerUser = async (req, res, next) => {
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
