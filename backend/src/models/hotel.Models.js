import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    city: String,
    country: String,
    address: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  amenities: [String], // e.g., ['Free WiFi', 'Swimming Pool', 'Gym']
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
  images: [String], // URLs of hotel images
  contact: {
    phone: String,
    email: String,
  },
  pricePerNight: {
    type: Number,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;



