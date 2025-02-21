import React, { useState, useEffect } from "react";

const HotelList = () => {
  const [location, setLocation] = useState(""); // Store user input location
  const [hotels, setHotels] = useState([]); // All hotels data
  const [recommendedHotels, setRecommendedHotels] = useState([]); // Filtered hotels based on recommendation
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of unique locations
  const locations = [
    "Pokhara, Nepal",
    "Lalitpur, Nepal",
    "Chitwan, Nepal",
    "Lumbini, Nepal",
    "Nagarkot, Nepal",
    "Mechinagar, Nepal",
    "Ilam, Nepal",
    "Dharan, Nepal",
    "Damak, Nepal",
    
  ];

  // Fetch all hotels initially
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/hotel"); // API to fetch all hotels
      if (!response.ok) {
        throw new Error("Error fetching hotels");
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recommended hotels based on location
  const fetchRecommendations = async () => {
    if (!location.trim()) {
      setError("Please select a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/recommend?location=${encodeURIComponent(location)}`);

      if (!response.ok) {
        throw new Error("Error fetching recommendations");
      }

      const data = await response.json();
      setRecommendedHotels(data.slice(0, 3)); // Show only top 3 recommendations
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Find Hotels Based on Location</h2>

      {/* Dropdown for Location */}
      <div className="flex justify-center mb-6">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2 text-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <button
          onClick={fetchRecommendations}
          className="ml-2 px-6 py-2 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
        >
          Search
        </button>
      </div>

      {error && <div className="text-center text-xl text-red-600">{error}</div>}
      {loading && <div className="text-center text-2xl">Loading...</div>}

      {/* Display hotels (Initially All, or Top 3 after Search) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(recommendedHotels.length > 0 ? recommendedHotels : hotels).map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
       
            <img
              src={`http://localhost:5000${hotel.image}` || "https://via.placeholder.com/300"}
              alt={hotel.hotel_name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {hotel.hotel_name}
                </a>
              </h2>
              <p className="text-gray-600 text-lg mb-2">{hotel.location}</p>
              <p className="text-gray-600 text-lg mb-2">Rating: {hotel.rating} ⭐</p>
              <p className="text-gray-600 text-lg mb-2">Price Range: {hotel.price_range}</p>
              <a
                href={hotel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
