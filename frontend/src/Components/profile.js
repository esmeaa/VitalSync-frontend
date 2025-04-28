import React from 'react';

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>My Profile</h2>
      </header>

      <div className="profile-top">
        <img 
          src="https://via.placeholder.com/100" 
          alt="Profile" 
          className="profile-image" 
        />
        <h3>Madison Smith</h3>
        <p className="profile-email">madisons@example.com</p>
        <p className="profile-birthday">Birthday: April 1st</p>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <h4>75 Kg</h4>
          <p>Weight</p>
        </div>
        <div className="stat-item">
          <h4>28</h4>
          <p>Years Old</p>
        </div>
        <div className="stat-item">
          <h4>1.65 CM</h4>
          <p>Height</p>
        </div>
      </div>

      <div className="profile-menu">
        <div className="menu-item">Profile ➔</div>
        <div className="menu-item">Favorite ➔</div>
        <div className="menu-item">Privacy Policy ➔</div>
        <div className="menu-item">Settings ➔</div>
        <div className="menu-item">Help ➔</div>
        <div className="menu-item">Logout ➔</div>
      </div>

      <footer className="profile-footer">
        <div className="footer-icon">🏠</div>
        <div className="footer-icon">📄</div>
        <div className="footer-icon">⭐</div>
        <div className="footer-icon">🔔</div>
      </footer>
    </div>
  );
};

export default Profile;
