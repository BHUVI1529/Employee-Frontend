import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './nictlogo.jpg'; // Replace with the actual logo path

const UserDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100">
            {/* Header Section - Modified */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Left side: ApptechKnow logo with larger size */}
                <img src={logo} alt="AppteckKnow Logo" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain" />

                {/* Centered Heading */}
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Dashboard Content */}
            <div className="flex-grow flex flex-col items-center justify-center mt-8">
                <div className="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-3xl font-extrabold text-gray-700 mb-6">User Dashboard</h2>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/applyleave')} // Route for Apply Leave
                            className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Apply for Leave
                        </button>
                        <button
                            onClick={() => navigate('/qr-scanner')} // Route for QR Code Scanner
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Scan the QR Code
                        </button>
                        <button
                            onClick={() => navigate('/login')} // Route for login
                            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:-translate-y-1"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-teal-700 text-white text-center py-4">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
                </p>
                <p className="text-sm">
                    Designed and developed by GRID R&D
                </p>
            </footer>
        </div>
    );
};

export default UserDashboard;
