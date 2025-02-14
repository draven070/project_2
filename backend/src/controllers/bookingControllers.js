import Trip from '../models/tripModels.js'; // Assuming bookingModel.js contains the Trip schema
import Notification from '../models/notificationModels.js';

/**
 * Accept a booking.
 */
const acceptBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID
    const booking = await Trip.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    // Check if the booking is already accepted or rejected
    if (booking.status === 'accepted' || booking.status === 'rejected') {
      return res.status(400).json({
        status: 'error',
        message: `Booking has already been ${booking.status}. Cannot accept or reject further.`,
      });
    }

    // Update the booking status to 'accepted'
    booking.status = 'accepted';
    await booking.save();

    // Create a notification for the booking
    const notification = new Notification({
      guideEmail: booking.guide,
      touristEmail: booking.tourist,
      message: `Your trip to ${booking.location} from ${booking.dateFrom} to ${booking.dateTo} has been accepted.`,
    });

    await notification.save();

    return res.status(200).json({
      status: 'success',
      message: 'Booking accepted and notification sent.',
      data: booking,
    });
  } catch (error) {
    console.error('Error accepting booking:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

/**
 * Reject a booking.
 */
const rejectBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID
    const booking = await Trip.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    // Check if the booking is already accepted or rejected
    if (booking.status === 'accepted' || booking.status === 'rejected') {
      return res.status(400).json({
        status: 'error',
        message: `Booking has already been ${booking.status}. Cannot accept or reject further.`,
      });
    }

    // Update the booking status to 'rejected'
    booking.status = 'rejected';
    await booking.save();

    // Create a notification for the booking
    const notification = new Notification({
      guideEmail: booking.guide,
      touristEmail: booking.tourist,
      message: `Your trip to ${booking.location} from ${booking.dateFrom} to ${booking.dateTo} has been rejected by ${booking.guide}.`,
    });

    await notification.save();

    return res.status(200).json({
      status: 'success',
      message: 'Booking rejected and notification sent.',
      data: booking,
    });
  } catch (error) {
    console.error('Error rejecting booking:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const getNotifications = async (req, res) => {
  const { touristEmail } = req.params; // Assuming the touristEmail is passed in the URL parameters

  try {
    // Find notifications for the specified tourist email
    const notifications = await Notification.find({ touristEmail })
      .sort({ createdAt: -1 }); // Sort by most recent notification first

    if (notifications.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No notifications found for this tourist email.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Notifications fetched successfully.',
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export { acceptBooking, rejectBooking, getNotifications };
