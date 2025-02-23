import Profile from "../models/profileModel.js";
import User from "../models/userModels.js";


// GET profile data by email
const getProfileDataW = async (req, res) => {
    try {
      // Assuming you may receive different parameters to filter profiles
      const filters = req.query;
  
      const profiles = await Profile.find(filters);
  
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ message: "Profiles not found" });
      }
  
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ message: "Error fetching profile data", error });
    }
  };
const getProfileData = async (req, res) => {
  try {
    const email = req.params.email; 
    console.log(email);
    const profile = await Profile.findOne({ email });
    console.log(profile);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data", error });
  }
};

// UPDATE or CREATE profile data

// Get profile data
const getProfileDataC = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile data not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Error fetching profile data', error });
  }
};

// Update profile data

const updateProfileData = async (req, res) => {
  try {
    const email = req.params.email; // Assuming email is passed as a URL parameter
    const newData = req.body;
    console.log("request", req);

    let profile = await Profile.findOne({ email });

    if (profile) {

      // If profile exists, update it
      profile = await Profile.findOneAndUpdate({ email }, newData, {
        new: true,
      });

    } else {
      // If profile doesn't exist, create a new one
      profile = new Profile({ email, ...newData });
      await profile.save();
      res.status(201).json({ message: 'Profile data created successfully!', data: profile });
    }


    res.json({ message: "Profile data updated successfully!", data: profile });
  } catch (error) {
    console.error("Error updating profile data:", error);
    res.status(500).json({ message: "Error updating profile data", error });

  }
};


// Create or update a profile
const createProfileData = async (req, res) => {
  try {

    const {
      email,
      name,
      location,
      quote,
      aboutMeTitle,
      aboutMeContent,
      languages,
      activities,
    } = req.body;
    const guideUser = await User.findOne({email});
    const {guide}=guideUser._id;
    if (!email || !name || !location || !quote || !aboutMeTitle || !aboutMeContent || !languages || !activities) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const profileImagePath = req.files?.profileImage ? req.files.profileImage[0].path : "";
    const coverImagePath = req.files?.coverImage ? req.files.coverImage[0].path : "";

    const profileData = {
      guide,
      email,
      name,
      location,
      quote,
      aboutMeTitle,
      aboutMeContent,
      languages: Array.isArray(languages) ? languages : languages.split(',').map(l => l.trim()),
      activities: Array.isArray(activities) ? activities : activities.split(',').map(a => a.trim()),
      profileImage: profileImagePath,
      coverImage: coverImagePath,
    };

    let profile = await Profile.findOne({ email });

    if (profile) {
      // Update existing profile
      Object.assign(profile, profileData);
      await profile.save();
    } else {
      // Create a new profile
      profile = new Profile(profileData);
      await profile.save();
    }

    const user = await User.findOne({ email });

    if (user) {
      user.form = "submitted";
      await user.save();
    }

    res.status(200).json({ message: "Profile saved successfully", data: profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ message: "Error creating/updating profile", error });
  }
};


// Export the controller methods


export { getProfileData, updateProfileData, createProfileData,getProfileDataW };
