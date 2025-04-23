import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from '../components/Header';

function AbsenteesPage() {
  const [absentees, setAbsentees] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const fetchAbsentees = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    try {
      console.log("Fetching absentees for date:", date);
       const response = await axios.get('https://employee-attendance-nkz6.onrender.com/admin/absentees', {
      // const response = await axios.get('http://localhost:8080/admin/absentees', {
        params: { date },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAbsentees(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching absentees:", err);
      setError("Failed to fetch absentees. Please try again later.");
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    fetchAbsentees();
  }, []);

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>
        Absentees List
      </h2>

      {/* Date Selector */}
      <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <label htmlFor="date" style={{ fontWeight: 'bold', color: '#333' }}>Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '180px' }} // Adjusted width of the input
        />
        <button
          onClick={fetchAbsentees}
          style={{
            padding: '10px 15px', // Adjusted padding to make button smaller
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            minWidth: '130px', // Reduced minimum width of the button
            width: 'auto', // Let the button resize automatically
          }}
        >
          Fetch Absentees
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ textAlign: 'center', color: 'red', marginBottom: '20px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      {/* Absentees Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', flexGrow: 1 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#4caf50', color: 'white' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Course</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {absentees.length > 0 ? (
              absentees.map((absentee, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{absentee.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{absentee.course}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', color: '#555', fontWeight: 'bold' }}
                >
                  No absentees found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {/* Footer */}
       <footer
        className="bg-gray-700 text-white text-center py-4"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#333", // Ensure footer background color matches
        }}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
        </p>
        <p className="text-sm">Designed and developed by GRID R&D</p>
      </footer>
    </div>
  );
}

export default AbsenteesPage;
