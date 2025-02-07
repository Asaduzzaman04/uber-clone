//des: this file will contain the middleware to authenticate the captain
import jwt from 'jsonwebtoken';
import captainModel from '../models/captain.model.js';
import blackListTokenModel from '../models/blackListToken.model.js';

//des: this function will authenticate the captain
export const authCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.['x-auth-token'] || req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authorization denied. No token provided.' });
    }
    // Check if token is blacklisted
    const isblackListedToken = await blackListTokenModel.findOne({ token });
    if (isblackListedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Check if captain exists
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    next(error);
  }
};
