import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from './nictlogo.jpg'; // Replace with actual logo path

const ApplyLeave = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token") || Cookies.get("token"); // Fetch the token from cookies or localStorage
        const id = localStorage.getItem("id");

        if (!token) {
            console.error("Authorization token is missing!");
            setMessage("Authorization token is missing!");
            return;
        }

        const leaveApplication = {
            id,   // Add the userId to the payload
            fromDate,
            toDate,
            reason,
            status: "Pending",
        };

        try {
            const response = await axios.post(
                //'http://localhost:8080/api/leave',
                'https://employee-attendance-nkz6.onrender.com/api/leave',
                leaveApplication,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setMessage(response.data);
            setFromDate('');
            setToDate('');
            setReason('');
            setModalOpen(true); // Open modal on success
        } catch (error) {
            console.error('Error submitting leave application:', error);
            setMessage('Failed to submit leave application. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate('/user-dashboard'); // Navigate to user dashboard after closing the modal
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">

            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md ">
                <img src={logo} alt="AppteKnow Logo" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain" />
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center ">
                    ApptechKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Main Content - Apply Leave Form */}
            <div className="flex-grow flex items-center justify-center mt-8 px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-6">Apply for Leave</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-left text-gray-600 font-medium">From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-600 font-medium">Reason for Leave</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Submit
                        </button>
                    </form>
                    {message && (
                        <p className="text-center mt-4 text-gray-700 font-medium">
                            {message}
                        </p>
                    )}
                </div>
            </div>

            {/* Modal for Success Message */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl text-center max-w-md w-full shadow-lg">
                        <h2 className="text-2xl font-semibold text-green-500 mb-4">Leave Application Submitted</h2>
                        <p className="text-lg text-gray-700 mb-6">{message}</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )}

            {/* Footer Section */}
            <footer className="bg-teal-700 text-white text-center py-4 mt-8">
                <p className="text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
                </p>
                <p className="text-xs sm:text-sm">
                    Designed and developed by GRID R&D
                </p>
            </footer>

        </div>
    );
};

export default ApplyLeave;
