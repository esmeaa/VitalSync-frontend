import React from 'react';
import profilePic from '../images/profile_pic.jpg';
import editIcon from '../images/edit_icon.png'; 
import homeIcon from '../images/Home.png';
import fileIcon from '../images/exercise.png';
import starIcon from '../images/favourites.png';
import supportIcon from '../images/help.png';


const EditProfile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>My Profile</h2>
      </header>

      <div className="profile-top">
        <div className="edit-pic-wrapper">
          <img src={profilePic} alt="Profile" className="profile-image" />
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </div>
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

      <form className="edit-form">
        <label>Full name</label>
        <input type="text" defaultValue="Madison Smith" />

        <label>Email</label>
        <input type="email" defaultValue="madisons@example.com" />

        <label>Mobile Number</label>
        <input type="text" defaultValue="+123 567 89000" />

        <label>Date of birth</label>
        <input type="text" defaultValue="01 / 04 / 199X" />

        <label>Weight</label>
        <input type="text" defaultValue="75 Kg" />

        <label>Height</label>
        <input type="text" defaultValue="1.65 CM" />

        <button type="submit">Update Profile</button>
      </form>

      <footer className="profile-footer">
        <div className="footer-icon">
            <img src={homeIcon} alt="Home" className="icon-img"/>
          </div>
          <div className="footer-icon">
            <img src={fileIcon} alt="File" className="icon-img"/>
          </div>
          <div className="footer-icon">
            <img src={starIcon} alt="Star" className="icon-img"/>
          </div>
          <div className="footer-icon">
            <img src={supportIcon} alt="Support" className="icon-img"/>
        </div>
      </footer>
      </div>
  );
};

export default EditProfile;
