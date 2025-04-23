import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [editCandidate, setEditCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  // Fetch candidates from the backend
  const fetchCandidates = () => {
    setIsLoading(true);
    axios
      .get('https://employee-attendance-nkz6.onrender.com/api/auth/employees')
    //  .get('http://localhost:8080/api/auth/employees')
      .then(response => {
        setCandidates(response.data);
        setFilteredCandidates(response.data);
        setIsFetched(true);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch candidate data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Search candidates by email
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
    if (value) {
      const filtered = candidates.filter(candidate =>
        candidate.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  };

  // Handle the edit functionality
  const handleEdit = (candidate) => {
    setEditCandidate({ ...candidate });
    setShowModal(true);
  };

  // Handle delete functionality
  const handleDelete = (employeeId) => {
    axios
      .delete(`https://employee-attendance-nkz6.onrender.com/api/auth/delete/${employeeId}`)
    //  .delete(`http://localhost:8080/api/auth/delete/${employeeId}`)
      .then(() => {
        alert('Candidate deleted successfully');
        const updatedList = candidates.filter(candidate => candidate.employeeId !== employeeId);
        setCandidates(updatedList);
        setFilteredCandidates(updatedList);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete candidate');
      });
  };

  // Handle saving the edited candidate
  const handleSave = () => {
    axios
      .put(`https://employee-attendance-nkz6.onrender.com/api/auth/update/${editCandidate.employeeId}`, editCandidate)
    //  .put(`http://localhost:8080/api/auth/update/${editCandidate.employeeId}`, editCandidate)
      .then(() => {
        alert('Candidate updated successfully');
        const updatedList = candidates.map(candidate =>
          candidate.employeeId === editCandidate.employeeId ? editCandidate : candidate
        );
        setCandidates(updatedList);
        setFilteredCandidates(updatedList);
        setEditCandidate(null);
        setShowModal(false);
      })
      .catch(error => {
       console.error('Error updating user:', error);
        alert('Failed to update candidate');
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />

      <h2 className="text-center text-gray-800 text-2xl font-semibold mb-6">Candidates Report</h2>

      {!isFetched && (
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchCandidates}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Load Candidates
          </button>
        </div>
      )}

      {isFetched && (
        <>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search by email"
              value={searchEmail}
              onChange={handleSearch}
              className="p-3 w-full max-w-md text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Edit Candidate</h3>
                <form className="space-y-4">
                  {['fullName', 'email', 'role', 'designation', 'phoneNumber', 'workLocation', 'shiftTimings'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={editCandidate[field]}
                        onChange={(e) =>
                          setEditCandidate({ ...editCandidate, [field]: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-600 text-lg p-6">Loading candidates...</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg mx-4">
              <table className="w-full text-left border-collapse">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="p-3">SNO</th>
                    <th className="p-3">EmployeeID</th>
                    <th className="p-3">FullName</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Phone Number</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">WorkLocation</th>
                    <th className="p-3">ShiftTimings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                      <tr key={candidate.employeeId} className="odd:bg-gray-100 even:bg-gray-50">
                        <td className="p-3 border-t">{index + 1}</td>
                        <td className="p-3 border-t">{candidate.employeeId}</td>
                        <td className="p-3 border-t">{candidate.fullName}</td>
                        <td className="p-3 border-t">{candidate.email}</td>
                        <td className="p-3 border-t">{candidate.username}</td>
                        <td className="p-3 border-t">{candidate.phoneNumber}</td>
                        <td className="p-3 border-t">{candidate.role}</td>
                        <td className="p-3 border-t">{candidate.designation}</td>
                        <td className="p-3 border-t">{candidate.workLocation}</td>
                        <td className="p-3 border-t">{candidate.shiftTimings}</td>
                        <td className="p-3 border-t">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(candidate)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(candidate.employeeId)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-6">No candidates found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <footer className="bg-gray-700 text-white text-center py-4 mt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
        </p>
        <p className="text-sm">Designed and developed by GRID R&D</p>
      </footer>
    </div>
  );
};

export default Candidates;
