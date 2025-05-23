// Profile.js - Dynamically pulls from localStorage
import React, { useEffect, useState } from 'react';
import homeIcon from '../images/Home.png';
import fileIcon from '../images/Nutrition.png';
import starIcon from '../images/Resources Icon.png';
import supportIcon from '../images/Support & Help.png';
import profileIcon from '../images/profile.png';
import favouriteIcon from '../images/favourites.png';
import privacyIcon from '../images/privacy.png';
import settingsIcon from '../images/settings.png';
import helpIcon from '../images/help.png';
import logoutIcon from '../images/logout.png';
import profilePicture from '../images/profile_pic.jpg';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: '',
    birthday: '',
    weight: '---',
    age: '---',
    height: '---'
  });

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>My Profile</h2>
      </header>

      <div className="profile-top">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <h3>{profile.name}</h3>
        {profile.email && <p className="profile-email">{profile.email}</p>}
        {profile.birthday && <p className="profile-birthday">Birthday: {profile.birthday}</p>}
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <h4>{profile.weight}</h4>
          <p>Weight</p>
        </div>
        <div className="stat-item">
          <h4>{profile.age}</h4>
          <p>Years Old</p>
        </div>
        <div className="stat-item">
          <h4>{profile.height}</h4>
          <p>Height</p>
        </div>
      </div>

      <div className="profile-menu">
        <div className="menu-item">
          <div className="menu-left">
            <img src={profileIcon} alt="Profile" className="menu-icon" />
            <span>Profile</span>
          </div>
          <span className="arrow">➔</span>
        </div>
        <div className="menu-item">
          <div className="menu-left">
            <img src={favouriteIcon} alt="Favourite" className="menu-icon" />
            <span>Favourite</span>
          </div>
          <span className="arrow">➔</span>
        </div>
        <div className="menu-item">
          <div className="menu-left">
            <img src={privacyIcon} alt="Privacy" className="menu-icon" />
            <span>Privacy Policy</span>
          </div>
          <span className="arrow">➔</span>
        </div>
        <div className="menu-item">
          <div className="menu-left">
            <img src={settingsIcon} alt="Settings" className="menu-icon" />
            <span>Settings</span>
          </div>
          <span className="arrow">➔</span>
        </div>
        <div className="menu-item">
          <div className="menu-left">
            <img src={helpIcon} alt="Help" className="menu-icon" />
            <span>Help</span>
          </div>
          <span className="arrow">➔</span>
        </div>
        <div className="menu-item">
          <div className="menu-left">
            <img src={logoutIcon} alt="Logout" className="menu-icon" />
            <span>Logout</span>
          </div>
          <span className="arrow">➔</span>
        </div>
      </div>

      <footer className="profile-footer">
        <div className="footer-icon">
          <img src={homeIcon} alt="Home" className="icon-img" />
        </div>
        <div className="footer-icon">
          <img src={fileIcon} alt="File" className="icon-img" />
        </div>
        <div className="footer-icon">
          <img src={starIcon} alt="Star" className="icon-img" />
        </div>
        <div className="footer-icon">
          <img src={supportIcon} alt="Support" className="icon-img" />
        </div>
      </footer>
    </div>
  );
};

export default Profile;
