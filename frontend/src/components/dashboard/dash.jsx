import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Widget = () => {
  const defaultProfileImage = 'https://placehold.co/100x100';
  const defaultBackgroundImage = 'https://placehold.co/600x300';

  const [profile, setProfile] = useState({
    name: '',
    location: '',
    email: '',
    profileImage: '',
    backgroundImage: '',
    bio: '',
    expertise: '',
    toursOffered: '',
    languages: '',
  });

  const [editMode, setEditMode] = useState(false);
  const { guideId } = useParams(); // Assuming `guideId` is passed as a URL parameter

  const reviews = [
    { id: 1, text: 'Amazing tour, highly recommend!', author: 'John Doe' },
    { id: 2, text: 'Very knowledgeable and professional.', author: 'Jane Smith' },
    { id: 3, text: 'Made our trip unforgettable!', author: 'Alice Johnson' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('email'); // Retrieve email from localStorage
        const response = await axios.get(`http://localhost:3000/api/guide/${email}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching guide profile:', error);
      }
    };

    fetchProfile();
  }, []);

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
        await axios.put(`http://localhost:3000/api/guide/${profile.email}`, profile);
        alert('Profile updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/guide', profile);
        alert('Profile created successfully!');
      }
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4" id="guide-profile">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {/* Background and Profile Header */}
            <div className="relative">
              <img
                src={profile.backgroundImage || defaultBackgroundImage}
                alt="Profile background"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center">
                <img
                  src={profile.profileImage || defaultProfileImage}
                  alt="Guide"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <div className="ml-4 text-white">
                  <h2 className="text-2xl font-bold">{profile.name || 'Guide Name'}</h2>
                  {profile.location && <p>{profile.location}</p>}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    placeholder="Write a brief introduction about yourself..."
                    readOnly={!editMode}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Expertise</label>
                  <input
                    type="text"
                    name="expertise"
                    value={profile.expertise}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    placeholder="E.g., Historical sites, Adventure tours"
                    readOnly={!editMode}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Tours Offered</label>
                  <textarea
                    name="toursOffered"
                    value={profile.toursOffered}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    placeholder="List the tours you offer..."
                    readOnly={!editMode}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Languages</label>
                  <input
                    type="text"
                    name="languages"
                    value={profile.languages}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    placeholder="E.g., English, Spanish, French"
                    readOnly={!editMode}
                  />
                </div>
              </div>

              <div className="p-4 flex justify-between">
                {editMode ? (
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Reviews Section */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
              Reviews
            </h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id} className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300">"{review.text}"</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">- {review.author}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-300">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
