import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist", required: true },
  message: { type: String, required: true },
//   read: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = model("Notification", notificationSchema);
export default Notification;
