//des: this file will contain the middleware to authenticate the user
import blackListTokenModel from '../models/blackListToken.model.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  const token =
    req.cookies?.['x-auth-token'] || req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization denied. No token provided.' });
  }
  // Check if token is blacklisted
  const blackListedToken = await blackListTokenModel.findOne({ token });
  // If token is blacklisted  return error
  if (blackListedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Check if user exists
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
