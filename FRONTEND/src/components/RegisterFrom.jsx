import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import {useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';


const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data=await registerUser(name,password,email);
      setLoading(false);
      dispatch(login(data.user))
      navigate({to:"/dashboard"})
      setLoading(false);
      alert("User registered (mock)!");
    } catch (err) {
      setLoading(false);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <div className="text-center mt-4">
          <p className="cursor-pointer text-sm text-gray-600">
            Already have an account?{' '}
            <span onClick={() => state(true)} className="text-blue-500 hover:text-blue-700">
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
