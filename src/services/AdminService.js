

import axios from "axios";

   const API_URL = "https://employee-attendance-nkz6.onrender.com/admin"; // Update with your backend URL
 //const API_URL = "http://localhost:8080/admin"; 
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getAbsentees = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/absentees?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching absentees:", error);
    throw error;
  }
};

export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaves`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};

