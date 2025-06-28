import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'; // Import Link

const BACKEND_URL = 'http://localhost:5000/api/login';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let googleicon = "https://img.icons8.com/color/48/000000/google-logo.png";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem('role', data.role);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        if (data.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else if (data.role === 'ngo') {
          window.location.href = '/ngo-dashboard';
        } else {
          window.location.href = '/';
        }

      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Forgot your password? <a href="/reset-password" className="text-blue-600 hover:underline">Reset Password</a>
          </p>
          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded py-2 bg-white hover:bg-gray-100 transition"
          >
            <img src={googleicon} alt="Google Icon" className="w-6 h-6" />
            <span className="text-gray-700 font-medium">Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;