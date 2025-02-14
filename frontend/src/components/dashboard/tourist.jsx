import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TouristProfile = () => {
  const defaultProfileImage = "https://placehold.co/100x100";
  const defaultBackgroundImage = "https://placehold.co/600x300";

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    location: "",
    profileImage: "",
    backgroundImage: "",
    quote: "",
    activities: "",
  });

  const [editMode, setEditMode] = useState(false);
  const { touristId } = useParams();

  // Fetch tourist profile data
  useEffect(() => {
    const fetchTouristProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tourists/profile/${touristId}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchTouristProfile();
  }, [touristId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3000/api/tourists/profile/${touristId}`,
          profile
        );
        alert("Profile updated successfully!");
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Background and Profile Image */}
        <div className="relative">
          <img
            src={
              profile.backgroundImage
                ? `http://localhost:3000/${profile.backgroundImage}`
                : defaultBackgroundImage
            }
            alt="Background"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center">
            <img
              src={
                profile.profileImage
                  ? `http://localhost:3000/${profile.profileImage}`
                  : defaultProfileImage
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="ml-4 text-white">
              <h2 className="text-xl font-bold">{profile.fullName || "Your Name"}</h2>
              <p>{profile.location || "Your Location"}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Quote</label>
              <textarea
                name="quote"
                value={profile.quote}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your favorite quote or motto..."
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Activities</label>
              <input
                type="text"
                name="activities"
                value={profile.activities}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Activities you enjoy (e.g., hiking, sightseeing)"
                readOnly={!editMode}
              />
            </div>
          </div>
          {/* Edit/Save Button */}
          <div className="mt-6 flex justify-end">
            {editMode ? (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TouristProfile;
