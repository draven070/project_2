import React, { useState, useEffect } from "react";
import axios from "axios";

const HotelBookingPage = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  // Fetch hotels from the backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hotel/get");
        setHotels(response.data); // Update state with the fetched hotels
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel) {
      alert("Please select a hotel to book.");
      return;
    }

    const bookingData = {
      ...formData,
      hotelId: selectedHotel._id,
    };

    try {
      console.log("Booking Data:", bookingData);
      alert(`Booking successful for hotel: ${selectedHotel.name}`);
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Failed to book the hotel. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Hotel Booking</h1>

        {/* Hotels List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Hotels</h2>
          {hotels.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <li
                  key={hotel._id}
                  className={`p-6 border rounded-lg shadow-sm cursor-pointer ${
                    selectedHotel === hotel ? "bg-green-100 border-green-500" : "bg-white"
                  }`}
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <img
                    src={hotel.images[0] || "https://via.placeholder.com/150"}
                    alt={`${hotel.name} image`}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
                  <p className="text-sm text-gray-600">
                    {hotel.location.city}, {hotel.location.country}
                  </p>
                  <p className="text-sm text-gray-600">{hotel.location.address}</p>
                  <p className="text-sm text-gray-600">Price: ${hotel.pricePerNight}/night</p>
                  <p className="text-sm text-gray-600">Rating: {hotel.rating} ⭐</p>
                  <p className="text-sm text-gray-600">
                    Amenities: {hotel.amenities?.join(", ") || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hotels available at the moment.</p>
          )}
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Book a Room</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-In Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-Out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedHotel}
              className={`w-full py-3 px-6 font-semibold text-white rounded-lg shadow-sm ${
                selectedHotel
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingPage;
