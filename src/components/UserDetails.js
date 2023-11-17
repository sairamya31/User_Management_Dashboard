import React, { useState, useEffect } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openReportModal = (user) => {
    setSelectedUser(user);
  };

  const closeReportModal = () => {
    setSelectedUser(null);
  };

  const generateAndDownloadReport = () => {
    const user = selectedUser;
    const reportText = `User Information Report\n\nID: ${user.id}\nUsername: ${user.username}\nEmail: ${user.email}\nPhone: ${user.phone}\n`;
    const fileName = 'user_report.txt';

    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(term)
      )
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h2>User Details</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => openReportModal(user)}>
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Generate Report for {selectedUser.username}</h2>
              <button className="close-button" onClick={closeReportModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              <button className="download-button" onClick={generateAndDownloadReport}>
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;