import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuideTrips() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const guideEmail = localStorage.getItem('email'); // Get guide's email from localStorage

    useEffect(() => {
        if (!guideEmail) {
            setError('Guide email is missing from localStorage.');
            return;
        }

        // Fetch trips for the guide using their email
        const fetchTrips = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/trip/get/${guideEmail}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch trips');
                    return;
                }

                const data = await response.json();
                setTrips(data.trips); // Store the trips in state
            } catch (error) {
                setError('An error occurred while fetching trips.');
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [guideEmail]);

    // Handle Accept/Reject action
    const handleAction = (tripId, action) => {
        console.log(`${action} trip with ID: ${tripId}`);
        setSuccess(true);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Guide Trip Requests
            </h2>
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-600 p-4 rounded-md mb-6">
                    Action completed successfully!
                </div>
            )}
            <div className="space-y-6">
                {trips.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                        No trip requests at the moment.
                    </p>
                ) : (
                    trips.map((trip) => (
                        <div
                            key={trip._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {trip.location}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(trip.dateFrom).toLocaleDateString()} -{' '}
                                    {new Date(trip.dateTo).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                <strong>Tourist:</strong> {trip.tourist}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                <strong>Number of People:</strong> {trip.numPeople}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                <strong>Price Bid:</strong> ${trip.priceBid}
                            </p>
                            <div className="flex space-x-4 justify-end">
                                <button
                                    onClick={() => handleAction(trip._id, 'Accept')}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleAction(trip._id, 'Reject')}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
