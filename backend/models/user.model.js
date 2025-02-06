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
      minlength: [3, 'email must be at least  3 characters long'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'password must be at least  6 characters long'],
      select: false
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
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
   expiresIn: '24h'
  });
};


const userModel = new mongoose.model('User', userSchema);

export default userModel;
