import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './nictlogo.jpg'; // Replace with the actual logo path

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/qr-scanner');
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer); // Clean up timer if component unmounts
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-gray-50 flex flex-col items-center justify-between">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md w-full">
                <img src={logo} alt="AppteKnow Logo" className="w-30 h-20 object-contain" />
                <h1 className="text-2xl font-semibold text-teal-700 mx-auto">
                    AppteKnow Careers - Your Job is Our Success
                </h1>
            </div>

            {/* Main Content Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center mt-10"> {/* Adjusted mt-10 */}
                <h2 className="text-2xl font-semibold text-teal-700 mb-4">Login marked Successfully!</h2>
                <p className="text-gray-700 mb-6">Redirecting to QR Code page...</p>
                <button
                    onClick={() => navigate('/qr-scanner')}
                    className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
                >
                    Go to QRCode Scanner page
                </button>
            </div>

           
            {/* Footer Section */}
            <footer className="w-full bg-teal-700 text-white py-4 mt-auto">
                <div className="text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
                </p>
                <p className="text-sm">
                    Designed and developed by GRID R&D
                </p>
                </div>
            </footer>
        </div>
    );
};

export default Success;
