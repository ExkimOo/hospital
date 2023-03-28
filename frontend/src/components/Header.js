import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Hospital</div>
      <div className="buttons">
        <button className="profile-button">Profile</button>
        <button className="sign-out-button">Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
