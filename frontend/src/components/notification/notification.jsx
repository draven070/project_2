import React, { useState } from 'react';

const TripRequestNotification = () => {
    // Dummy data for notification
    const [notification, setNotification] = useState({
        status: 'accepted', // Change to 'rejected' for testing rejection
        guideEmail: 'sita@example.com',
        touristEmail: 'tourist@gmail.com',
        location: 'Kathmandu 44600, Nepal',
        priceBid: '999',
        dateFrom: '2025-01-03',
        dateTo: '2025-01-05',
    });

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-xl rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
                Trip Request Notification
            </h2>
            
            <div className="space-y-4">
                <div className="text-gray-700 dark:text-gray-300">
                    <p><strong className="font-semibold">Guide:</strong> {notification.guideEmail}</p>
                    <p><strong className="font-semibold">Tourist:</strong> {notification.touristEmail}</p>
                    <p><strong className="font-semibold">Location:</strong> {notification.location}</p>
                    <p><strong className="font-semibold">Date From:</strong> {new Date(notification.dateFrom).toLocaleDateString()}</p>
                    <p><strong className="font-semibold">Date To:</strong> {new Date(notification.dateTo).toLocaleDateString()}</p>
                    <p><strong className="font-semibold">Price Bid:</strong> ${notification.priceBid}</p>
                </div>

                {/* Notification Status */}
                <div className="mt-4">
                    {notification.status === 'accepted' ? (
                        <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg">
                            <strong className="font-semibold">Trip Accepted!</strong> Your trip with guide {notification.guideEmail} has been accepted.
                        </div>
                    ) : notification.status === 'rejected' ? (
                        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg">
                            <strong className="font-semibold">Trip Rejected!</strong> Your trip with guide {notification.guideEmail} has been rejected.
                        </div>
                    ) : (
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
                            <strong className="font-semibold">Pending Decision</strong> Waiting for decision on the trip request.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripRequestNotification;
