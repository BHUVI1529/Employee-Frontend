import axios from 'axios';
import React from 'react';
import logo from './nictlogo.jpg'; // Replace with the actual logo path

const Header = () => {
    return (
        <div className="bg-gradient-to-br from-teal-100 via-pink-50 to-lime-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                {/* Logo */}
                <img src={logo} alt="NICT Logo" className="w-30 h-20 object-contain" />

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-teal-700 mx-auto">
                    NICT COMPUTER EDUCATION
                </h1>
            </div>
        </div>
    );
};

export default Header;

