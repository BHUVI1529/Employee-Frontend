import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useEffect } from 'react';


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        employeeId: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        role: 'TEACHING', // default value
        designation: '',
        shiftTimings: '',
        workLocation: '',
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [disableAdminOption, setDisableAdminOption] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAdminExists = async () => {
            try {
                const res = await api.get('/employees');
                const adminExists = res.data.some(emp => emp.role === 'ADMIN');
                setDisableAdminOption(adminExists);
    
                // If admin already exists and the selected role is ADMIN, reset it to TEACHING
                if (adminExists && formData.role === 'ADMIN') {
                    setFormData(prev => ({ ...prev, role: 'TEACHING' }));
                }
    
            } catch (error) {
                console.error('Error checking admin:', error);
            } finally {
                setLoading(false); // Done checking
            }
        };
    
        checkAdminExists();
    }, []);
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        const requiredFields = ['fullName', 'employeeId', 'email', 'phoneNumber', 'username', 'password', 'designation', 'shiftTimings', 'workLocation', 'role'];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `${field} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await api.post('/register', formData);
            const successMsg = res.data;

            if (successMsg.includes('Admin already exists')) {
                setMessage(successMsg);
            } else {
                setMessage('Registered successfully!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration Error:', error.response || error);
            setMessage('Registration failed. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-gray-100 to-purple-100">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-6">Employee Registration</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {[
                        { label: 'Employee Full Name', name: 'fullName' },
                        { label: 'Employee ID', name: 'employeeId' },
                        { label: 'Email ID', name: 'email' },
                        { label: 'Phone Number', name: 'phoneNumber' },
                        { label: 'Username', name: 'username' },
                        { label: 'Password', name: 'password', type: 'password' },
                        { label: 'Designation', name: 'designation' },
                        { label: 'Shift Timings', name: 'shiftTimings' },
                        { label: 'Work Location', name: 'workLocation' }
                    ].map(({ label, name, type = 'text' }, index) => (
                        <div key={index}>
                            <label className="block text-left text-gray-600 font-medium">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                className={`mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                                    errors[name]
                                        ? 'border-red-400 focus:ring-red-300'
                                        : 'border-gray-200 focus:ring-blue-400'
                                } transition`}
                                required
                            />
                            {errors[name] && (
                                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    {/* Role Dropdown */}
                    {/* Role Dropdown */}
{!loading && (
    <div>
        <label className="block text-left text-gray-600 font-medium">Role</label>
        <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
            {!disableAdminOption && <option value="ADMIN">ADMIN</option>}
            <option value="TEACHING">TEACHING</option>
            <option value="NON_TEACHING">NON_TEACHING</option>
        </select>

        {disableAdminOption && (
            <p className="text-sm text-gray-500 mt-1">Admin has already been registered.</p>
        )}
    </div>
)}



                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1"
                    >
                        Register
                    </button>

                    {message && (
                        <p className={`text-center mt-4 ${message.includes('already exists') || message.includes('failed') ? 'text-red-500' : 'text-green-500'} font-medium`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account?
                    <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;


