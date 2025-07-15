import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('sarkaranurag104@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth =useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(auth)

  

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const data = await loginUser(email, password);
    dispatch(login(data.user))
    navigate({to:"/dashboard"})
    setLoading(false);
    console.log("success");
    alert("Login Success");
  } catch (err) {
    setLoading(false);
    setError(err.message || "Login failed.");

  }
};

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="text-center mt-4">
          <p className="cursor-pointer text-sm text-gray-600">
            Don't have an account?{' '}
            <span onClick={() => state(false)} className="text-blue-500 hover:text-blue-700">
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
