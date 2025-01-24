import React, { useState } from 'react';
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
    const email = queryParams.get('email');

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

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const tourist = localStorage.getItem('email');

        if (!tourist) {
            setError('Tourist email is missing from localStorage.');
            return;
        }

        if (!email || !isValidEmail(email)) {
            setError('The provided email is invalid.');
            return;
        }

        const tripDetails = {
            location: locationInput,
            dateFrom,
            dateTo,
            numPeople,
            priceBid,
            tourist,
            guide: email,
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
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const data = await response.json();
            setSuccess(true);
            alert("Your Booking was submitted, you will receive a response soon!");
            navigate('/');
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" max-w-3xl mx-auto bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-white">Plan Your Trip</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">Trip created successfully!</p>}

            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Destination</label>
                <input
                    type="text"
                    name="location"
                    value={locationInput}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Start Date</label>
                    <DatePicker
                        selected={dateFrom}
                        onChange={(date) => setDateFrom(date)}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">End Date</label>
                    <DatePicker
                        selected={dateTo}
                        onChange={(date) => setDateTo(date)}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Number of Travelers</label>
                <select
                    name="numPeople"
                    value={numPeople}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option>Just me</option>
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                    <option>5 people</option>
                    <option>6 people</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Price Bid</label>
                <input
                    type="text"
                    name="priceBid"
                    value={priceBid}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
                Plan Trip
            </button>
        </form>
    );
}
