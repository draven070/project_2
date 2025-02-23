import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response Data:', data);

      if (response.ok) {
        localStorage.setItem('accessToken', data.token);  // Save access token to local storage
        localStorage.setItem('userId', data._id);         // Save user ID to local storage
        localStorage.setItem('role', 'guide'); 
        localStorage.setItem('email', data.email);          // Save user role to local storage

        // Fetch the user's data to check the form status
        const userResponse = await fetch(`http://localhost:3000/api/user/users/${data.email}`, {
          headers: {
            'Authorization': `Bearer ${data.token}`, // Send the token in the header
          },
        });

        const userData = await userResponse.json();

        if (userData.form === 'unsubmitted') {
          navigate('/profileform');  // Redirect to the profile form page
        } else {
          navigate(`/dash/${email}`);  // Redirect to the dashboard if form is already submitted
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
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
          
            Signin as a Guide
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
          <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account? 
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
        </form>
      </div>
    </section>
    
  );
}

export default Login;
