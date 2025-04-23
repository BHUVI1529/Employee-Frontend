// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center space-x-4 bg-white shadow p-4">
            <button
                onClick={() => navigate('/candidates')}
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
                Candidates
            </button>
            <button
                onClick={() => navigate('/view-attendance')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Attendance
            </button>
            {/* <button
                onClick={() => navigate('/absentees')}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Absentees
            </button> */}
            {/* <button
                onClick={() => navigate('/leave')}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                Leave
            </button> */}
        </div>
    );
};

export default Navbar;
