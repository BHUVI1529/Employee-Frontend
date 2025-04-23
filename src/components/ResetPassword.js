import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("❌ Passwords do not match!");
      setMessage('');
      return;
    }

    try {
      const response = await axios.post('https://employee-attendance-nkz6.onrender.com/api/auth/reset-password', {
    //  const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        token,
        newPassword
      });

      setMessage("✅ " + response.data);
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError("❌ Error resetting password. Try again.");
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Reset Your Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-600 font-medium text-sm text-center animate-fade-in">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 font-medium text-sm text-center animate-fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;