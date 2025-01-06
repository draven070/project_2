import Booking from "../models/bookingModels.js";
import Notification from "../models/notificationModels.js";

const acceptBookingRequest = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking request
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update booking status to "accepted"
    booking.status = "accepted";
    await booking.save();

    // Create a notification for the user
    const notification = new Notification({
      userId: booking.userId,
      message: `Your booking request has been accepted by the guide!`,
    });

    await notification.save();

    res.status(200).json({ message: "Booking accepted successfully!", booking });
  } catch (error) {
    console.error("Error accepting booking request:", error);
    res.status(500).json({ message: "Error accepting booking request", error });
  }
};

export { acceptBookingRequest };
