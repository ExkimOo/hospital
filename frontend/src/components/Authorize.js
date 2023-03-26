import React, { useState } from 'react';
import './Authorize.css';

const Authorize = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignInClick = () => {
    setIsSignIn(true);
  };

  const handleSignUpClick = () => {
    setIsSignIn(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, password, role });
  };

  return (
    <div className="authorize-container">
      <div className="authorize-form">
        <div className="authorize-options">
          <div
            className={`authorize-option ${isSignIn ? 'selected' : ''}`}
            onClick={handleSignInClick}
          >
            SIGN IN
          </div>
          <div
            className={`authorize-option ${!isSignIn ? 'selected' : ''}`}
            onClick={handleSignUpClick}
          >
            SIGN UP
          </div>
        </div>
        {isSignIn ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="authorize-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="authorize-input"
            />
            <button type="submit" className="authorize-button">
              SIGN IN
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="authorize-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="authorize-input"
            />
            <select value={role} onChange={handleRoleChange} className="authorize-input">
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
            <button type="submit" className="authorize-button">
              SIGN UP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Authorize;