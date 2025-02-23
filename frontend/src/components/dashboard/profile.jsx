import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Widget = () => {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]); // Ensure reviews is always an array
  const { email } = useParams();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [status , setStatus] = useState()
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/profile/${email}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/review/guide/${email}`);
      console.log("Review Data Response:", response.data);

      // Ensure response.data is an array or extract the array if inside an object
      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else if (Array.isArray(response.data.reviews)) {
        setReviews(response.data.reviews);
      } else {
        console.error("Unexpected API response format:", response.data);
        setReviews([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching review data:', error);
      setReviews([]); // Set to empty array on error
    }
  };

  const addReview = async () => {
    try {
      const TouristEmail = localStorage.getItem('email');
      const response1 = await axios.get(`http://localhost:3000/api/user/users/${email}`);
      const data = response1.data;
      console.log("Guide ID:", data._id);

      const response = await axios.post(`http://localhost:3000/api/review/add/${TouristEmail}`, {
        review: reviewText,
        rating: rating,
        guideId: data._id
      });

      setReviews([...reviews, { review: reviewText, rating, user: { fullName: TouristEmail } }]);
      setReviewText('');
      setRating(5);
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  const fetchStatus = async() => {
    const response1 = await axios.get(`http://localhost:3000/api/user/users/${email}`)
    const data = response1.data;
   setStatus(data.formStatus);
   console.log("status",status)
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchStatus();
      await fetchProfileData();
      await fetchReviewData();
    };
    fetchData();
  }, [email]);
  

  if (!profile) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={profile.coverImage ? `http://localhost:3000/${profile.coverImage}` : ''}
              alt="Background"
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-6 left-6 flex items-center">
              <img
                src={profile.profileImage ? `http://localhost:3000/${profile.profileImage}` : ''}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-white"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-gray-200">{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About Me</h2>
                <p>{profile.aboutMeTitle}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Languages</h2>
                <p>{profile.languages}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Hobbies</h2>
                <p>{profile.activities}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Status</h2>
                <p>{status}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <ul>
                  {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <li key={index} className="mb-4">
                        <p className="italic">{review.review || "No text provided"}</p>
                        <p className="italic">Rating: {review.rating || "N/A"}</p>
                        <p className="text-sm text-gray-600">
                          - {review.user?.fullName || "Anonymous"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>No reviews available.</p>
                  )}
                </ul>

                <div className="mt-4">
                  <textarea
                    placeholder="Write your review here..."
                    className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-gray-200"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-gray-200"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
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

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <Link to={`/form?email=${email}`}>
                <button className="w-full py-2 mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Create a Trip
                </button>
              </Link>
              <div className="mt-4">
                <h4 className="font-semibold">More Information</h4>
                <Link to="/aboutus" className="text-blue-500 hover:text-blue-700">About YatraSathi</Link>
              </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
