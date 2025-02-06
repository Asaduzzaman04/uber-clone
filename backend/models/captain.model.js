import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const captainSchema = mongoose.Schema({
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
    //   match: [
    //     /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    //     'Password must contain at least one numeric digit, one uppercase and one lowercase letter'
    //   ]
  },
  socketID: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least  3 characters long']
    },
    plateNumber: {
      type: String,
      required: true,
      minlength: [3, 'Plate Number must be at least  3 characters long']
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'cng']
    },
    capactiy: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least  1']
    }
  },
  location: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  }
});

// Hash password before saving
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare password for authentication
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token for authentication
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

const captainModel = new mongoose.model('Captain', captainSchema);

export default captainModel;
