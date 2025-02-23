import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Form() {
    const navigate = useNavigate();
    const location = useLocation();

    const [locationInput, setLocation] = useState('Kathmandu 44600, Nepal');
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(null);
    const [numPeople, setNumPeople] = useState('Just me');
    const [priceBid, setPriceBid] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const guideEmail = queryParams.get('email');

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        const userRole = localStorage.getItem('role');

        if (!userEmail) {
            navigate('/login');
        }

        if (userRole !== 'tourist') {
            alert('Only tourists can create a trip.');
            navigate('/');
        }
    }, [navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'location':
                setLocation(value);
                break;
            case 'numPeople':
                setNumPeople(value);
                break;
            case 'priceBid':
                setPriceBid(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!locationInput || !dateFrom || !dateTo || !numPeople || !priceBid || !guideEmail) {
            setError('All fields are required.');
            return;
        }

        const touristEmail = localStorage.getItem('email');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dateFrom < today || (dateTo && dateTo < today)) {
            setError('Booking cannot be made for past dates.');
            return;
        }

        const tripDetails = {
            location: locationInput,
            dateFrom,
            dateTo,
            numPeople,
            priceBid,
            tourist: touristEmail,
            guide: guideEmail,
        };

        try {
            const response = await fetch('http://localhost:3000/api/trip/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripDetails),
            });

            if (!response.ok) {
                setError('An error occurred while submitting your trip.');
                return;
            }

            setSuccess(true);
            alert("Your booking was submitted, you will receive a response soon!");
            navigate('/');
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-xl font-semibold mb-4 dark:text-white">Create a trip</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Trip created successfully!</p>}
            
            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Where are you going?</label>
                <input
                    type="text"
                    name="location"
                    value={locationInput}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Date from</label>
                    <DatePicker
                        selected={dateFrom}
                        onChange={date => setDateFrom(date)}
                        minDate={new Date()}
                        required
                        className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Date to</label>
                    <DatePicker
                        selected={dateTo}
                        onChange={date => setDateTo(date)}
                        minDate={dateFrom}
                        required
                        className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Number of people</label>
                <select
                    name="numPeople"
                    value={numPeople}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                >
                    <option>Just me</option>
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                    <option>5 people</option>
                    <option>6 people</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Price Bid</label>
                <input
                    type="text"
                    name="priceBid"
                    value={priceBid}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
            </div>

            <button type="submit" className="bg-red-400 hover:bg-red-600 text-white w-full py-2 rounded-lg mb-4">
                CREATE NEW TRIP
            </button>
        </form>
    );
}