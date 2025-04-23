import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './nictlogo.jpg';

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [scanComplete, setScanComplete] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const isProcessingRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('employeeId');
        if (id) setEmployeeId(id);
    }, []);

    const getCurrentLocation = () =>
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        });

    const isWithinLocation = async (targetLat, targetLng) => {
        try {
            const coords = await getCurrentLocation();

            const isExactMatch =
                coords.latitude.toFixed(6) === targetLat.toFixed(6) &&
                coords.longitude.toFixed(6) === targetLng.toFixed(6);

            if (!isExactMatch) {
                setError("❌ You must be exactly at the institute's location.");
            }

            return isExactMatch;
        } catch (error) {
            console.error('Geolocation Error:', error);
            setError('Unable to access your location.');
            return false;
        }
    };

    const handleScan = async (result) => {
        if (!result || isProcessingRef.current) return;

        const scannedText = result?.text || result?.data;
        if (!scannedText) return;

        isProcessingRef.current = true;
        setScanComplete(true);
        console.log("Scanned QR Data:", scannedText);

        try {
            const data = JSON.parse(scannedText);
            const { location, institutename } = data;

            if (location && institutename) {
                const { latitude, longitude } = location;
                const isInLocation = await isWithinLocation(latitude, longitude);

                if (!isInLocation) {
                    resetScanner();
                    return;
                }

                const instituteId = await fetchInstituteId(institutename);
                if (instituteId) {
                    await markAttendance(employeeId, instituteId);
                } else {
                    setError('Institute not found.');
                    resetScanner();
                }
            } else {
                setError('Invalid QR code format.');
                resetScanner();
            }
        } catch (err) {
            console.error('QR Parse Error:', err);
            setError('Failed to parse QR code.');
            resetScanner();
        }
    };

    const fetchInstituteId = async (instituteName) => {
        try {
            const response = await axios.get('https://employee-attendance-nkz6.onrender.com/api/institute/id', {
        //    const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName }
            });
            return response.data;
        } catch (err) {
            console.error('Institute Fetch Error:', err);
            setError('Could not fetch institute ID.');
            return null;
        }
    };

    const markAttendance = async (employeeId, instituteId) => {
        try {
            const response = await axios.post('https://employee-attendance-nkz6.onrender.com/api/attendance/mark', {
        //    const response = await axios.post('http://localhost:8080/api/attendance/mark', {
                employeeId,
                instituteId
            });

            const attendanceType = response.data.attendanceType;

            if (attendanceType === "Login") {
                navigate('/login-success');
            } else if (attendanceType === "Logout") {
                navigate('/remark/:userId/:instituteId');
            } else {
                setError("Unknown attendance type received.");
                resetScanner();
            }
        } catch (err) {
            console.error('Attendance Error:', err);
            setError('Could not mark attendance.');
            resetScanner();
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner Error:', err);
        setError('Camera access issue or device not supported.');
    };

    const resetScanner = () => {
        isProcessingRef.current = false;
        setScanComplete(false);
        setTimeout(() => setError(null), 5000); // error message clears after 5s
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="NICT Logo" className="w-24 h-16 object-contain" />
                <h1 className="text-lg font-semibold text-teal-700 mx-auto text-center">
                    NICT COMPUTERS - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4">
                <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-all">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center text-teal-700">QR Code Scanner</h2>

                    {error && <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>}

                    <div className="relative w-full h-[350px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                constraints={{ video: { facingMode: "environment" } }}
                                onResult={handleScan}
                                onError={handleError}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80" />
                    </div>

                    <p className="mt-6 text-center text-gray-700 font-semibold">
                        Ensure you're within the institute's premises to scan the code.
                    </p>
                </div>
            </div>

            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;