// Import necessary modules
import Review from '../models/reviewModel.js'; // Adjust path as needed
import Tourist from '../models/touristModel.js'; // Import the correct model
import User from '../models/userModels.js';
// Import the User model

// Controller to get reviews by guide's email
const getReviewsByGuideEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find guide by email
    const guide = await User.findOne({ email });

    if (!guide) {
      return res.status(404).json({ success: false, message: "Guide not found" });
    }

    // Fetch reviews where guideId matches the guide's _id
    const reviews = await Review.find({ guide: guide._id })
      .populate("user", "fullName email"); // Populate user details

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addReview = async (req, res) => {
  try {
    const { review, rating, guideId } = req.body;
    const { email } = req.params;

    console.log("Email from request:", email);

    // Find the tourist by email
    const tourist = await Tourist.findOne({ email });
    console.log("Found User:", tourist);

    // Fix: Check for tourist, not "user"
    if (!tourist) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create a new review instance
    const newReview = new Review({
      review,
      rating,
      user: tourist._id, // Fix: Use tourist._id
      guide: guideId,
    });

    console.log(newReview);

    // Save the new review to the database
    const savedReview = await newReview.save();

    // Respond with success message and the saved review object
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: { ...savedReview.toObject(), userName: tourist.fullName }, // Fix: Use tourist.fullName
    });
  } catch (error) {
    console.error("Error in addReview controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addReview,getReviewsByGuideEmail };
