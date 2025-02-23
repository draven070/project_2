import { useEffect, useState } from "react";
import axios from "axios";

const HOTELS_API_URL = "http://localhost:3000/api/hotel";

const AdminDashboardHotels = () => {
    const [activeTab, setActiveTab] = useState("hotels");
    const [hotels, setHotels] = useState([]);
    const [newHotel, setNewHotel] = useState({
        hotel_name: "",
        location: "",
        website: "",
        rating: "",
        price_range: "",
        image: null, // File object
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const res = await axios.get(HOTELS_API_URL);
            setHotels(res.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHotel({ ...newHotel, [name]: value });
    };

    const handleWebsiteBlur = () => {
        const urlPattern = /^(https?:\/\/[^\s]+)/;
        if (newHotel.website && !urlPattern.test(newHotel.website)) {
            alert("Invalid URL format. Please enter a valid website (e.g., https://example.com)");
            setNewHotel({ ...newHotel, website: "" });
        }
    };

    const handleFileChange = (e) => {
        setNewHotel({ ...newHotel, image: e.target.files[0] });
    };

    const handleAddHotel = async () => {
        if (!newHotel.website) {
            alert("Please enter a valid website URL before adding the hotel.");
            return;
        }
    
        const formData = new FormData();
        formData.append("hotel_name", newHotel.hotel_name);
        formData.append("location", newHotel.location);
        formData.append("website", newHotel.website);
        formData.append("rating", newHotel.rating);
        formData.append("price_range", newHotel.price_range);
        formData.append("image", newHotel.image);
    
        try {
            const response = await axios.post("http://localhost:3000/api/addhotels", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            console.log("Hotel added successfully:", response.data);
    
            // Ensure the response contains all necessary hotel data
            if (response.data && response.data._id) {
                setHotels((prevHotels) => [...prevHotels, response.data]);
            } else {
                console.error("Error: Response does not contain the complete hotel data.");
            }
    
            // Reset the form
            setNewHotel({
                hotel_name: "",
                location: "",
                website: "",
                rating: "",
                price_range: "",
                image: null,
            });
        } catch (error) {
            console.error("Error adding hotel:", error.response?.data || error.message);
        }
    };
    

    const handleDeleteHotel = async (hotelName, location) => {
        try {
            const response = await axios.delete("http://localhost:3000/api/deletehotel", {
                data: { hotel_name: hotelName, location: location },
            });

            if (response.status === 200) {
                setHotels((prevHotels) => prevHotels.filter((hotel) => !(hotel.hotel_name === hotelName && hotel.location === location)));
                console.log("Hotel deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting hotel:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">

                {activeTab === "hotels" && (
                    <div>
                        <h2 className="text-xl font-bold mt-6">Hotel Management</h2>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Hotel Name</th>
                                    <th className="border p-2">Location</th>
                                    <th className="border p-2">Website</th>
                                    <th className="border p-2">Image</th>
                                    <th className="border p-2">Rating</th>
                                    <th className="border p-2">Price Range</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel) => (
                                    <tr key={hotel._id} className="border">
                                        <td className="border p-2">{hotel.hotel_name}</td>
                                        <td className="border p-2">{hotel.location}</td>
                                        <td className="border p-2"><a href={hotel.website} target="_blank" className="text-blue-500">Visit</a></td>
                                        <td className="border p-2">
                                            <img src={`http://localhost:3000${hotel.image}`} alt="Hotel" className="w-16 h-16 object-cover" />
                                        </td>
                                        <td className="border p-2">{hotel.rating}</td>
                                        <td className="border p-2">{hotel.price_range}</td>
                                        <td className="border p-2">
                                            <button
                                                className="bg-red-500 text-white px-3 py-2 rounded"
                                                onClick={() => handleDeleteHotel(hotel.hotel_name, hotel.location)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2 className="text-xl font-bold mt-6">Add New Hotel</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="hotel_name" placeholder="Hotel Name" className="border p-2" value={newHotel.hotel_name} onChange={handleInputChange} required />
                            <input type="text" name="location" placeholder="Location" className="border p-2" value={newHotel.location} onChange={handleInputChange} required />
                            <input type="text" name="website" placeholder="Website (https://example.com)" className="border p-2" value={newHotel.website} onChange={handleInputChange} onBlur={handleWebsiteBlur} required />
                            <input type="file" name="image" className="border p-2" onChange={handleFileChange} required />
                            <input type="text" name="rating" placeholder="Rating" className="border p-2" value={newHotel.rating} onChange={handleInputChange} required />
                            <input type="text" name="price_range" placeholder="Price Range" className="border p-2" value={newHotel.price_range} onChange={handleInputChange} required />
                        </div>
                        <button className="bg-green-500 text-white px-3 py-2 mt-4 rounded" onClick={handleAddHotel}>Add Hotel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardHotels;
