import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, 'First Name must be at least  3 characters long']
      },
      lastname: {
        type: String
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: [3, 'email must be at least  3 characters long']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'password must be at least  6 characters long']
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    socketID: {
      type: String
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare password for authentication
userSchema.statics.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Verify JWT token
userSchema.methods.verifyAuthToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const userModel = new mongoose.model('User', userSchema);

export default userModel;
