import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist", required: true },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  tripDetails: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
}, { timestamps: true });

const Booking = model("Booking", bookingSchema);
export default Booking;
