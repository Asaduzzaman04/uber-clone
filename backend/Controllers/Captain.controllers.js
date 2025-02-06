// Init Dependencies
import captainModel from './../models/captain.model.js';
import { createCaptain } from '../Services/Captain.services.js';
import { validationResult } from 'express-validator';

// Create a Captain
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
      vehicle: { color, plateNumber, vehicleType, capacity },
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
      capacity,
      location
    });
    //generate token
    const token = captain.generateAuthToken();
    return res.status(201).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
