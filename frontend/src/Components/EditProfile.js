import React, { useState } from "react";
import profilePic from '../images/profile_pic.jpg';
import editIcon from '../images/edit_icon.png'; 
import homeIcon from '../images/Home.png';
import fileIcon from '../images/exercise.png';
import starIcon from '../images/favourites.png';
import supportIcon from '../images/help.png';
import "../pages/AuthPage.css";

function EditProfile() {
  // State to hold user data in profile form
  const [formData, setFormData] = useState({
    fullName: "Madison Smith",
    email: "madison@example.com",
    phone: "+123 456 78900",
    dob: "01-12-2004",
    weight: "75",
    height: "1.70"
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  //Update profile form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error on typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Calculating age from date of brith
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
};

// Validates all edit profile form inputs before submission
const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Please enter your full name";
  } else if (/[0-9]/.test(formData.fullName)) {
    newErrors.fullName = "Name must not include numbers";
  }

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!formData.phone || !/^\+?[0-9\s]{7,15}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid phone number";
  }

  const age = calculateAge(formData.dob);
  if (!formData.dob) {
    newErrors.dob = "Date of birth is required";
  } else if (age < 18 || age > 22) {
    newErrors.dob = "Age must be between 18 and 22 years";
  }

  if (!/^[0-9]{1,3}$/.test(formData.weight)) {
    newErrors.weight = "Enter weight in kilograms (numbers only)";
  }

  if (!/^\d+(\.\d+)?$/.test(formData.height)) {
    newErrors.height = "Enter valid height in meters (e.g. 1.65)";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Handle profile form submission
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    const API_URL = "localhost:3001/api/editprofile"; // <--- API
    console.log("Sending profile data:", formData);
  }
};

return (
  <div className="profile-container">
    {/* Header Section */}
    <header className="profile-header">
      <h2>My Profile</h2>
    </header>

    {/* Top Information Section with Picture and Name */}
    <div className="profile-top">
        <div className="edit-pic-wrapper">
          <img src={profilePic} alt="Profile" className="profile-image" />
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </div>
        <h3>{formData.fullName}</h3>
        <p className="profile-email">{formData.email}</p>
        <p className="profile-birthday">Birthday: {formData.dob}</p>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div className="stat-item">
          <h4>{formData.weight} Kg</h4>
          <p>Weight</p>
        </div>
        <div className="stat-item">
          <h4>{calculateAge(formData.dob)}</h4>
          <p>Years Old</p>
        </div>
        <div className="stat-item">
          <h4>{formData.height} m</h4>
          <p>Height</p>
        </div>
      </div>

      {/* Editable Profile Form */}
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Full name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? "error" : ""}
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>Mobile Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <label>Date of birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={errors.dob ? "error" : ""}
        />
        {errors.dob && <p className="error-message">{errors.dob}</p>}

        <label>Weight (kg)</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className={errors.weight ? "error" : ""}
        />
        {errors.weight && <p className="error-message">{errors.weight}</p>}

        <label>Height (m)</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className={errors.height ? "error" : ""}
        />
        {errors.height && <p className="error-message">{errors.height}</p>}

        <button type="submit">Update Profile</button>
      </form>

      {/* Footer Navigation Section */}
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
}

export default EditProfile;