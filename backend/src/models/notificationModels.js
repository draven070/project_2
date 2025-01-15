import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  guideEmail: {
    type: String,
    required: true,
  },
  touristEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
