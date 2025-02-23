import mongoose from 'mongoose';
import Profile from '../models/profileModel.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"]
  },
  roles: {
    type: String,
    enum: ['user', 'guide'],
    default: 'guide'
  },
  addedinfo: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  form: {
    type: String,
    enum: ['submitted', 'unsubmitted'],
    default: 'unsubmitted',  // Default value is unsubmitted
  },
  formStatus: {
    type: String,
    enum: ['verified', 'unverified'],
    default: 'unverified',  // Default value is unsubmitted
  },
  Profile:{
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
  },
  // reviews:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Review',

  // }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;