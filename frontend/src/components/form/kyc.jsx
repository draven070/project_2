import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    citizenshipNumber: '',
    profileImage: null,
    citizenshipPhoto: null,
    cv: null,
  });

  const [preview, setPreview] = useState({
    profileImage: null,
    citizenshipPhoto: null,
    cv: null,
  });

  const userEmail = localStorage.getItem('email'); // Retrieve email from localStorage

  useEffect(() => {
    if (!userEmail) {
      alert('No email found. Please log in first.');
    }
  }, [userEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });

    // Generate a preview URL for the file
    setPreview({ ...preview, [e.target.name]: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert('User email is required.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('citizenshipNumber', formData.citizenshipNumber);
    formDataToSend.append('profileImage', formData.profileImage);
    formDataToSend.append('citizenshipPhoto', formData.citizenshipPhoto);
    formDataToSend.append('cv', formData.cv);
    formDataToSend.append('email', userEmail); // Include email in request

    try {
      const response = await axios.post(
        'http://localhost:3000/api/kyc/create',
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting KYC:', error);
      alert('Error submitting KYC form');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          KYC Form Submission
        </h2>
        <p className="text-center text-gray-600 mb-6">User Email: <span className="font-semibold">{userEmail}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="citizenshipNumber"
            placeholder="Citizenship Number"
            value={formData.citizenshipNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Profile Image Upload */}
          <div className="border border-gray-300 p-3 rounded-lg">
            <label className="block text-gray-700 font-semibold mb-1">
              Profile Image:
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded-lg"
            />
            {preview.profileImage && (
              <img
                src={preview.profileImage}
                alt="Profile Preview"
                className="mt-2 w-20 h-20 rounded-lg shadow"
              />
            )}
          </div>

          {/* Citizenship Photo Upload */}
          <div className="border border-gray-300 p-3 rounded-lg">
            <label className="block text-gray-700 font-semibold mb-1">
              Citizenship Photo:
            </label>
            <input
              type="file"
              name="citizenshipPhoto"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded-lg"
            />
            {preview.citizenshipPhoto && (
              <img
                src={preview.citizenshipPhoto}
                alt="Citizenship Preview"
                className="mt-2 w-20 h-20 rounded-lg shadow"
              />
            )}
          </div>

          {/* CV Upload */}
          <div className="border border-gray-300 p-3 rounded-lg">
            <label className="block text-gray-700 font-semibold mb-1">CV (Optional):</label>
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
            {preview.cv && (
              <p className="text-green-600 font-medium mt-1">File selected</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit KYC
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
