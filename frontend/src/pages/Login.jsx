import React, { useState } from 'react';
import axiosInstance from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  // State to hold the form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to show a message on successful submission
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser refresh
    
    // Log the form data to the console
    console.log('Login Data Submitted:');
    
    const formData = {email:email,password:password};
    const res = axiosInstance.post("/login",formData);

    // Show a success message
    console.log("login tick")
    console.log(res);
    setMessage(res.message);

    // Clear the form fields
    setEmail('');
    setPassword('');

    // Hide the message after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        
        {/* Form element with submit handler */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength="8"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Submission Message Box */}
        {message && (
          <div 
            className="p-3 mt-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md" 
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

