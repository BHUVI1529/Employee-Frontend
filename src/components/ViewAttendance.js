import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const getAllAttendance = async (token) => {
  try {
    const response = await axios.get('https://employee-attendance-nkz6.onrender.com/api/attendance/getAll', {
    //const response = await axios.get('http://localhost:8080/api/attendance/getAll', {
      headers: { Authorization: `Bearer ${token} `},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all attendance data:', error);
    throw new Error('Error fetching all attendance data.');
  }
};

export const getAttendanceByDate = async (token, selectedDate) => {
  try {
    const response = await axios.get(`https://employee-attendance-nkz6.onrender.com/api/attendance/by-date?date=${selectedDate}`, {
  //  const response = await axios.get(`http://localhost:8080/api/attendance/by-date?date=${selectedDate}`, {
      headers: { Authorization:` Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance by date:', error);
    throw new Error('Failed to load attendance data for the selected date.');
  }
};

const ViewAttendance = () => {
  //const [selectedDate, setSelectedDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchTodayAttendance = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please login.');
        return;
      }
  
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      setSelectedDate(today); // Set input field to today's date
  
      try {
        setLoading(true);
        const data = await getAttendanceByDate(token, today);
        setAttendanceData(data);
      } catch (err) {
        setError(err.message);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTodayAttendance();
  }, []);
  

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found. Please log in.');
      return;
    }

    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await getAttendanceByDate(token, selectedDate);
      setAttendanceData(data);
    } catch (err) {
      setError(err.message);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-emerald-800 mb-10">📋 Attendance Records</h2>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Search Attendance by Date</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSearch}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            🔍 Search
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>

      {loading && <p className="text-center text-gray-700 text-lg">Loading...</p>}

      {attendanceData.length > 0 ? (
        <div className="overflow-x-auto max-w-7xl mx-auto bg-white p-4 rounded-2xl shadow-xl">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Employee ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Designation</th>
                <th className="py-3 px-4 text-left">Work Location</th>
                <th className="py-3 px-4 text-left">Institute</th>
                <th className="py-3 px-4 text-left">Login Time</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{record.id}</td>
                  <td className="py-2 px-4">{record.employee?.employeeId}</td>
                  <td className="py-2 px-4">{record.employee?.fullName}</td>
                  <td className="py-2 px-4">{record.employee?.email}</td>
                  <td className="py-2 px-4">{record.employee?.designation}</td>
                  <td className="py-2 px-4">{record.employee?.workLocation}</td>
                  <td className="py-2 px-4">{record.institute?.instituteName}</td>
                  <td className="py-2 px-4">{new Date(record.loginTime).toLocaleString()}</td>
                  <td className="py-2 px-4">{record.attendanceType}</td>
                  <td className="py-2 px-4">{record.remarks || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-center text-gray-700 text-lg">No attendance records found.</p>
      )}
    </div>
  );
};

export default ViewAttendance;