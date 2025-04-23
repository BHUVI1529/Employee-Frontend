// src/App.js
import './App.css';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider

import Dashboard from './components/Dashboard';
import Header from './components/Header';
import StatCard from './components/StatCard';
//import CandidatesPage from './pages/CandidatesPage';
//import AttendancePage from './pages/ViewAttendancePage';
import AbsenteesPage from './pages/AbsenteesPage';
import LeavesPage from './pages/LeavesPage';

// Public Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import QRCodeScanner from './components/QRCodeScanner';
import UserDashboard from './components/UserDashboard';
import RemarkPage from './components/RemarkPage';
import LoginSuccess from './components/LoginSuccess';
import LogoutSuccess from './components/LogoutSuccess';
import Forgotpassword from './components/Forgotpassword';

import ResetPassword from './components/ResetPassword';
import Candidates from './components/Candidates';
import ApplyLeave from './components/ApplyLeave';
import ViewAttendance from './components/ViewAttendance';
// import ToolTip from './components/ToolTip';

function App() {
  return (
    <UserProvider> {/* Wrap your Routes with UserProvider */}

    <Router>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/view-attendance" element={<ViewAttendance />} /> 
        {/* <Route path="/tooltip" element={<ToolTip />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/qr-scanner" element={<QRCodeScanner />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/logout-success" element={<LogoutSuccess />} />
        
        <Route path="/remark/:userId/:instituteId" element={<RemarkPage />} />
       
        <Route path="/forgotpassword" element={<Forgotpassword />} /> 
        
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        <Route path="/applyleave" element={<ApplyLeave />} />
        <Route path="/absentees" element={<AbsenteesPage />} />
        <Route path="/leaves" element={<LeavesPage />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
