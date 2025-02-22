import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock data for admin login
  const mockAdminData = {
    email: 'admin@gmail.com',
    password: '1234',
    token: 'mockAdminAccessToken',
    _id: 'mockAdminUserId',
    role: 'admin',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate backend login with mock data
    if (email === mockAdminData.email && password === mockAdminData.password) {
      localStorage.setItem('accessToken', mockAdminData.token);
      localStorage.setItem('userId', mockAdminData._id);
      localStorage.setItem('role', mockAdminData.role);
      localStorage.setItem('email', mockAdminData.email);
      navigate('/Dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

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
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Sign in as Admin
          </h2>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
