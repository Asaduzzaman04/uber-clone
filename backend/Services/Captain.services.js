import captainModel from '../models/captain.model.js';
// Create a Captain register Function to create a new captain
export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  socketID,
  status,
  color,
  plateNumber,
  vehicleType,
  capactiy,
  location
}) => {
  try {
    // Check if all fields are provided
    if (
      !firstname ||
      !email ||
      !password ||
      !color ||
      !plateNumber ||
      !vehicleType ||
      !capactiy
    ) {
      throw new Error('All fields are required');
    }
    // Create a new captain
    const captain = await captainModel.create({
      fullname: { firstname, lastname },
      email,
      password,
      socketID,
      status,
      vehicle: { color, plateNumber, vehicleType, capactiy },
      location
    });
    // Return the captain
    return captain;
  } catch (error) {
    throw new Error(error.message);
  }
};
