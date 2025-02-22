import React, { useState } from 'react';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    citizenshipNumber: '',
    image: null,
    citizenshipPhoto: null,
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = 'Name can only contain letters';
    }
    
    if (!formData.citizenshipNumber.trim()) {
      errors.citizenshipNumber = 'Citizenship Number is required';
    } else if (!/^[0-9-/]+$/.test(formData.citizenshipNumber)) {
      errors.citizenshipNumber = 'Only numbers, "/", and "-" are allowed';
    }
    
    if (!formData.image) {
      errors.image = 'Profile image is required';
    }

    if (!formData.citizenshipPhoto) {
      errors.citizenshipPhoto = 'Citizenship photo is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('citizenshipNumber', formData.citizenshipNumber);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('citizenshipPhoto', formData.citizenshipPhoto);
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }

      const response = await fetch('http://localhost:3000/api/kyc/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ api: errorData.message });
        return;
      }

      setSuccessMessage('KYC form submitted successfully!');
      setFormData({ name: '', citizenshipNumber: '', image: null, citizenshipPhoto: null, cv: null });
    } catch (error) {
      setErrors({ api: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">KYC Form</h2>
      {successMessage && <div className="bg-green-100 p-4 text-green-700 mb-4">{successMessage}</div>}
      {errors.api && <div className="bg-red-100 p-4 text-red-700 mb-4">{errors.api}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="citizenshipNumber" placeholder="Citizenship Number" value={formData.citizenshipNumber} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <div>
          <label className="block mb-1">Image *</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
        </div>
        <div>
          <label className="block mb-1">Citizenship Photo *</label>
          <input type="file" name="citizenshipPhoto" accept="image/*" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          {errors.citizenshipPhoto && <p className="text-red-500 text-xs">{errors.citizenshipPhoto}</p>}
        </div>
        <div>
          <label className="block mb-1">CV (Optional)</label>
          <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit KYC</button>
      </form>
    </div>
  );
};

export default KYCForm;
