import mongoose from 'mongoose';

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
    default: 'active'
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
  }
});

const captainModel = new mongoose.model('Captain', captainSchema);

export default captainModel;
