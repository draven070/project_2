import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Widget = () => {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { email } = useParams();

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/profile/${email}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const addReview = () => {
    const newReview = {
      id: reviews.length + 1,
      text: 'Wonderful experience!',
      author: 'Jane Doe',
    };
    setReviews([...reviews, newReview]);
  };

  useEffect(() => {
    fetchProfileData();
  }, [email]);

  if (!profile) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative">
            <img
              src={profile.coverImage
                ? `http://localhost:3000/${profile.coverImage}`
                : defaultBackgroundImage}
              alt="Background"
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-6 left-6 flex items-center">
              <img
                src={profile.profileImage
                  ? `http://localhost:3000/${profile.profileImage}`
                  : defaultBackgroundImage}
                
                alt="Profile"
             
                className="w-28 h-28 rounded-full border-2 border-white"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-gray-200">{profile.location}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 grid md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2">
              {/* About Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About Me</h2>
                <p>{profile.aboutMeContent}</p>
              </div>

              {/* Languages Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Languages</h2>
                <p>{profile.languages.join(', ')}</p>
              </div>

              {/* Activities Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
                <p>{profile.activities.join(', ')}</p>
              </div>

              {/* Reviews Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id} className="mb-4">
                      <p className="italic">"{review.text}"</p>
                      <p className="text-sm text-gray-600">- {review.author}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <textarea
                    placeholder="Write your review here..."
                    className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-gray-200"
                  ></textarea>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-gray-200"
                  />
                  <button
                    onClick={addReview}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Review
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <Link to={`/form?email=${email}`}>
                <button className="w-full py-2 mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Create a Trip
                </button>
              </Link>

              <div className="mt-4">
                <h4 className="font-semibold">More Information</h4>
                <a href="#" className="text-blue-500 hover:text-blue-700">About TrekSathi</a>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Need Assistance?</h4>
                <p>
                  Contact our{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Customer Support
                  </a>{' '}
                  for help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
