import User from "../models/userModels.js";
import Tourist from "../models/touristModel.js";

// View all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password for security
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
const getAllTourist = async (req, res) => {
  try {
    const Tourists = await Tourist.find().select("-password"); // Exclude password for security
    res.status(200).json(Tourists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
const deleteTourist = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTourist = await Tourist.findByIdAndDelete(id);

    if (!deletedTourist) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export { getAllUsers, deleteUser,getAllTourist,deleteTourist };
