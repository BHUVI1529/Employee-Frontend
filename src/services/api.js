// src/api.js
import axios from 'axios';

const api = axios.create({
     baseURL: `https://employee-attendance-nkz6.onrender.com/api/auth`, // Your backend API base URL
    //baseURL: 'http://localhost:8080/api/auth',
    headers: {
       'Content-Type': 'application/json',
   },
   withCredentials: true  // ✅ important for cookies/session/cors
});

export default api;



