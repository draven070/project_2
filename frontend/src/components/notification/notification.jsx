import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripRequestNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the tourist email from localStorage
    const touristEmail = localStorage.getItem('email');

    if (touristEmail) {
      // Fetch notifications using the tourist's email
      axios
        .get(`http://localhost:3000/api/notification/${touristEmail}`)
        .then((response) => {
          setNotifications(response.data.data); // Set the notifications in state
          setLoading(false); // Stop loading
        })
        .catch(() => {
          setError('No notifications found for this email');
          setLoading(false); // Stop loading
        });
    } else {
      setError('Tourist email not found in localStorage');
      setLoading(false); // Stop loading
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Trip Request Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found for this email.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <p><strong>Guide:</strong> {notification.guideEmail}</p>
            <p><strong>Tourist:</strong> {notification.touristEmail}</p>
            <p><strong>Message:</strong> {notification.message}</p>

            {/* Notification Status */}
            <div className="mt-4">
              {notification.message.includes('accepted') ? (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                  <strong>Trip Accepted!</strong> {notification.message}
                </div>
              ) : notification.message.includes('rejected') ? (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  <strong>Trip Rejected!</strong> {notification.message}
                </div>
              ) : (
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                  Waiting for decision on the trip request.
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripRequestNotification;
