import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './nictlogo.jpg'; // Replace with the actual logo path

const RemarkPage = () => {
    const { userId, instituteId } = useParams();
    const [remarks, setRemarks] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (isSubmitting) return; // Prevent further clicks if already submitting

        setIsSubmitting(true); // Set submitting state to true

        try {
            const attendanceData = {
                user: { id: userId },
                loginOption: "logout",
                instituteId,
                remarks,
            };

              await axios.post('https://employee-attendance-nkz6.onrender.com/api/attendance/add', attendanceData);
           // await axios.post('http://localhost:8080/api/attendance/add', attendanceData);
            navigate('/logout-success');
        } catch (error) {
            console.error("Error submitting remark:", error);
            alert("Error submitting remark. Please try again.");
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

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
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-10"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Provide Remarks to Logout
                </h2>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter your remark here"
                    className="w-full p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    rows="6"
                />
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting} // Disable button when submitting
                        className={`px-6 py-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>

            {/* Footer Section */}
            <footer className="w-full bg-teal-700 text-white py-4 mt-auto">
                <div className="text-center">
                    <p className="text-sm">© 2024 Institute. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                            <img src="whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                            <img src="linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RemarkPage;
