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
    const handleAction = async (tripId, action) => {
        try {
            const url = `http://localhost:3000/api/notification/${action.toLowerCase()}/${tripId}`;
            const response = await fetch(url, {
                method: 'PUT', // Use POST to trigger the accept or reject action
            });
            console.log(url)
            if (response.ok) {
                setSuccess(true); // Action completed successfully
                setTrips((prevTrips) =>
                    prevTrips.map((trip) =>
                        trip._id === tripId ? { ...trip, status: action.toLowerCase() } : trip
                    )
                ); // Update the trip status in the local state
                
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to process action');
            }
        } catch (error) {
            setError('An error occurred while processing your request.');
            console.error('Error handling action:', error);
        }

    };
    console.log(trips);
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-semibold mb-6 dark:text-white">Trips for Guide</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Action completed successfully!</p>}

            <div>
                {trips.length === 0 ? (
                    <p className="text-gray-600 dark:text-zinc-400">No trips available for you yet.</p>
                ) : (
                    trips.map((trip) => (
                        <div key={trip._id} className="mb-4 p-4 border rounded-lg shadow-md dark:bg-zinc-700 dark:border-zinc-600">
                            <h3 className="text-lg font-semibold dark:text-white">{trip.tourist}</h3>
                            <p className="text-lg font-semibold dark:text-white">{trip.location}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">From: {new Date(trip.dateFrom).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">To: {new Date(trip.dateTo).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">Number of People: {trip.numPeople}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">Price Bid: {trip.priceBid}</p>

                            {/* Conditional rendering of buttons or status */}
                            <div className="mt-4 flex justify-end space-x-4">
                                {trip.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleAction(trip._id, 'Accept')}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction(trip._id, 'Reject')}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <p className={`px-4 py-2 rounded-lg ${trip.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)} {/* Capitalize status */}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
