import React, { useState } from 'react';
import UserDetails from './UserDetails';
import AccountCreation from './AccountCreation';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('userDetails');
  const [users, setUsers] = useState([]);

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'userDetails' ? 'active' : ''}
          onClick={() => setActiveTab('userDetails')}
        >
          User Details
        </button>
        <button
          className={activeTab === 'accountCreation' ? 'active' : ''}
          onClick={() => setActiveTab('accountCreation')}
        >
          Account Creation
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'userDetails' ? <UserDetails users={users} /> : null}
        {activeTab === 'accountCreation' ? (
          <AccountCreation onUserCreated={handleUserCreated} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;








