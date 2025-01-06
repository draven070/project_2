import Hotel from '../models/hotel.Models.js';

// Get all hotels
const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hotel by ID
 const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new hotel
 const createHotel = async (req, res) => {
    const hotel = new Hotel(req.body);
    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing hotel
const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a hotel
const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export {createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel};