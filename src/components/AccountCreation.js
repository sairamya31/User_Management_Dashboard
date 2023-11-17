import React, { useState } from 'react';
import './AccountCreation.css';

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCreateAccount = () => {
    if (isFormValid) {
      
      const newUser = {
        id: Math.floor(Math.random() * 1000) + 1, 
        username,
        email,
        password,
        phone,
        creationDate: new Date().toISOString().split('T')[0], 
      };
  
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User created:', data);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    
    
      setIsSubmitted(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setPhone('');
    } else {
      alert('Please fill all fields.');
    }
  };

  const validateForm = () => {
    setIsFormValid(username !== '' && email !== '' && password !== '' && phone !== '');
  };

  return (
    <div className='Account-Creation'>
      <h2>Account Creation</h2>
      {isSubmitted ? (
        <div className="success-message">
          Account created successfully! 
        </div>
      ) : (
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateForm();
              }}
            />
          </label>
          <label>
            Email:
            <input
            className='email'
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm();
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateForm();
              }}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validateForm();
              }}
            />
          </label>
          <button type="button" onClick={handleCreateAccount} disabled={!isFormValid}>
            Create Account
          </button>
          {(!isFormValid && !isSubmitted) && (
            <div className="error-message">
              Please fill all fields. 
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default AccountCreation;
