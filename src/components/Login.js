import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://employee-attendance-nkz6.onrender.com/api/auth/login', {
        //    const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: identifier,
                password
            });

            const { token, message } = response.data;

            if (!token) {
                setError(message || "Login failed. Please check your credentials.");
                return;
            }

            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                setError("Session expired. Please login again.");
                return;
            }
            localStorage.setItem("token", token);

            if (decoded.sub === "Admin") {
                setSuccess("Login successful! Navigating to Admin Dashboard...");
                navigate("/admin/dashboard");
            } else {
                setSuccess("Login successful! Navigating to User Dashboard...");
                navigate("/user-dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>

                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-sm text-center">{success}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forgotpassword" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
   Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;






















