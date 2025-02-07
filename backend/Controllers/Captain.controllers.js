// Init Dependencies
import captainModel from './../models/captain.model.js';
import { createCaptain } from '../Services/Captain.services.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListToken.model.js';

// Create a Captain register
export const registerCaptain = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      fullname: { firstname, lastname },
      email,
      password,
      socketID,
      status,
      vehicle: { color, plateNumber, vehicleType, capactiy },
      location
    } = req.body;

    // Check if captain already exists
    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }
    //hash password before saving
    const hashedPassword = await captainModel.hashPassword(password);
    //create a captain
    const captain = await createCaptain({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      socketID,
      status,
      color,
      plateNumber,
      vehicleType,
      capactiy,
      location
    });
    //generate token
    const token = captain.generateAuthToken();
    return res.status(201).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a Captain login
export const loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if captain exists
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }
    //check if password is correct
    const isMatch = await captain.comparePassword(password);
  
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    //generate token
    const token = captain.generateAuthToken();
    //* res.setHeader("Authorization", `Bearer ${token}`); // Send token in header

    res.cookie('x-auth-token', token);
    return res.status(200).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Captain Profile
export const getCaptainProfile = async (req, res) => {
  try {
    const { captain } = req;
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }
    return res.status(200).json({ captain: captain });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//create a Captain logout
export const logoutCaptain = async (req, res) => {
  try {
    //clear cookie
    res.clearCookie('x-auth-token');
    //get token from header or cookie
    const token =
      req.cookies?.['x-auth-token'] ||
      req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    //blacklist token
    await blackListTokenModel.create({ token });
    return res.status(200).json({ message: 'Captain logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
