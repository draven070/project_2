import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    quote: "",
    aboutMeTitle: "",
    aboutMeContent: "",
    languages: "",
    activities: "",
  });

  const [files, setFiles] = useState({
    profileImage: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Email not found in localStorage.");
      return;
    }

    const data = new FormData();
    data.append("email", email);
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("quote", formData.quote);
    data.append("aboutMeTitle", formData.aboutMeTitle);
    data.append("aboutMeContent", formData.aboutMeContent);
    data.append("languages", formData.languages);
    data.append("activities", formData.activities);
    data.append("profileImage",formData.profileImage);
    data.append("coverImage",formData.coverImage);
    // Append files if they are selected
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/profile/profile",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Profile saved successfully.");

      console.log("Response:", response.data);
      navigate(`/dash/${formData.email}`);
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Error submitting profile.");
    }
  };
console.log("iam heree")
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create or Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="quote"
          placeholder="Quote"
          value={formData.quote}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="aboutMeTitle"
          placeholder="About Me Title"
          value={formData.aboutMeTitle}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="aboutMeContent"
          placeholder="About Me Content"
          value={formData.aboutMeContent}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="text"
          name="languages"
          placeholder="Languages"
          value={formData.languages}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="activities"
          placeholder="Activities"
          value={formData.activities}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div>
          <label className="block mb-1">Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;