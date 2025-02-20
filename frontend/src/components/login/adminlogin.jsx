import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mock data for login
  const mockAdminData = {
    email: "admin@example.com",
    password: "admin123",
    token: "mockAdminAccessToken",
    _id: "mockAdminUserId",
    role: "admin",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate backend login
    if (email === mockAdminData.email && password === mockAdminData.password) {
      // Simulate saving data to localStorage (e.g., after successful login)
      localStorage.setItem("accessToken", mockAdminData.token);
      localStorage.setItem("userId", mockAdminData._id);
      localStorage.setItem("role", mockAdminData.role);
      localStorage.setItem("email", mockAdminData.email);

      // Navigate to the Admin Dashboard
      navigate("/Dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3000/api/admin/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();
  //     console.log("Response Data:", data);

  //     if (response.ok) {
  //       localStorage.setItem("accessToken", data.token); // Save access token to local storage
  //       localStorage.setItem("userId", data._id); // Save user ID to local storage
  //       localStorage.setItem("role", "admin"); // Save admin role to local storage
  //       localStorage.setItem("email", data.email); // Save email to local storage

  //       navigate("/admin/dashboard"); // Redirect to the admin dashboard after successful login
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     setError("Error logging in. Please try again later.");
  //   }
  // };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleLogin}>
          <div className="text-center md:text-left">
            <label className="mr-1">Sign in as Admin</label>
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
