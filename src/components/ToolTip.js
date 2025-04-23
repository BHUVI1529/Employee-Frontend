// import React, { useState, useEffect } from "react";

// const Tooltip = ({ userId }) => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/admin/attendance/user/${userId}`);
//        // const response = await fetch(`https://final-attendance.onrender.com/admin/attendance/user/${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data");
//         }
//         const data = await response.json();
//         setAttendanceData(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, [userId]);

//   if (loading) return <div className="bg-gray-100 p-4 rounded shadow">Loading...</div>;
//   if (error) return <div className="bg-red-100 p-4 rounded shadow">Error: {error}</div>;

//   return (
//     <div className="bg-white border border-gray-300 p-4 rounded shadow-md w-72 absolute top-12">
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-2 py-1 bg-gray-100">Name</th>
//             <th className="border border-gray-300 px-2 py-1 bg-gray-100">Login Time</th>
//             <th className="border border-gray-300 px-2 py-1 bg-gray-100">Logout Time</th>
//             <th className="border border-gray-300 px-2 py-1 bg-gray-100">Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((record, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-2 py-1">{record.name}</td>
//               <td className="border border-gray-300 px-2 py-1">{record.loginTime}</td>
//               <td className="border border-gray-300 px-2 py-1">{record.logoutTime}</td>
//               <td className="border border-gray-300 px-2 py-1">{record.remarks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tooltip;
