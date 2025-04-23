import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
           `https://employee-attendance-nkz6.onrender.com/admin/leaveRequests`,
         // `http://localhost:8080/admin/leaveRequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const leaveData = response.data;
          setLeaves(leaveData);
          setLoading(false);
        } else {
          setError("Failed to fetch leave data");
        }
      } catch (err) {
        setError("Error fetching leave data");
        console.error("Error:", err);
      }
    };

    fetchLeaves();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://employee-attendance-nkz6.onrender.com/admin/leaveRequests/${requestId}/approve`,
        //`http://localhost:8080/admin/leaveRequests/${requestId}/approve`,
        { status: "Approved" }, // Send the status as "Approved" for the leave request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === requestId ? { ...leave, status: "Approved" } : leave
          )
        );
      }
    } catch (err) {
      console.error("Error approving leave:", err);
      setError("Error approving leave request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://employee-attendance-nkz6.onrender.com/admin/leaveRequests/${requestId}/reject`,
        //`http://localhost:8080/admin/leaveRequests/${requestId}/reject`,
        { status: "Rejected" }, // Send the status as "Rejected" for the leave request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === requestId ? { ...leave, status: "Rejected" } : leave
          )
        );
      }
    } catch (err) {
      console.error("Error rejecting leave:", err);
      setError("Error rejecting leave request");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2", // Restoring the previous background color
        minHeight: "100vh", // Ensure full height
        fontFamily: "Arial, sans-serif",
        paddingBottom: "80px", // Ensure space for the footer
      }}
    >
      <Header />
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        Leave Applications
      </h2>

      {error && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "18px",
          }}
        >
          Loading leave applications...
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
              <tr>
                <th style={{ padding: "10px" }}>Request ID</th>
                <th style={{ padding: "10px" }}>User Name</th>
                <th style={{ padding: "10px" }}>From Date</th>
                <th style={{ padding: "10px" }}>To Date</th>
                <th style={{ padding: "10px" }}>Reason</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  style={{
                    backgroundColor: "#fafafa",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <td style={{ padding: "10px" }}>{leave.id}</td>
                  <td style={{ padding: "10px" }}>{leave.userName}</td>
                  <td style={{ padding: "10px" }}>{leave.fromDate || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{leave.toDate || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{leave.reason || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{leave.status || "Pending"}</td>
                  <td style={{ padding: "10px" }}>
                    {leave.status !== "Approved" &&
                      leave.status !== "Rejected" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleApprove(leave.id)}
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(leave.id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
};

export default LeavesPage;
