// import React, { useState } from "react";
// import profilePic from '../images/profile_pic.jpg';
// import editIcon from '../images/edit_icon.png'; 
// import homeIcon from '../images/Home.png';
// import fileIcon from '../images/exercise.png';
// import starIcon from '../images/favourites.png';
// import supportIcon from '../images/help.png';
// import "../pages/AuthPage.css";


// function EditProfile() {
//   // State to hold user data in profile form
//   const [formData, setFormData] = useState({
//     first_name: null,
//     last_name: null,
//     user_name: null,
//     gender: null,
//     age: null,
//     height: null,
//     weight: null,
//     ethnicity: null,
//   });

//   // State to hold validation errors
//   const [errors, setErrors] = useState({});

//   //Update profile form data on input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     // Clear error on typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Calculating age from date of brith
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//   }
//   return age;
// };

// // Validates all edit profile form inputs before submission
// const validateForm = () => {
//   const newErrors = {};

//   if (!formData.fullName.trim()) {
//     newErrors.fullName = "Please enter your full name";
//   } else if (/[0-9]/.test(formData.fullName)) {
//     newErrors.fullName = "Name must not include numbers";
//   }

//   if (!formData.email) {
//     newErrors.email = "Email is required";
//   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//     newErrors.email = "Email is invalid";
//   }

//   const age = calculateAge(formData.dob);
//   if (!formData.dob) {
//     newErrors.dob = "Date of birth is required";
//   } else if (age < 18 || age > 22) {
//     newErrors.dob = "Age must be between 18 and 22 years";
//   }

//   if (!/^[0-9]{1,3}$/.test(formData.weight)) {
//     newErrors.weight = "Enter weight in kilograms (numbers only)";
//   }

//   if (!/^\d+(\.\d+)?$/.test(formData.height)) {
//     newErrors.height = "Enter valid height in meters (e.g. 1.65)";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const API_URL = "http://localhost:3001/api/profile";
//       console.log("Sending profile data:", formData);

//       try {
//         const response = await fetch(API_URL, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData)
//         });

//         const data = await response.json();
//         console.log("✅ Profile updated:", data);
//         // Optionally show a success message or redirect

//       } catch (error) {
//         console.error("❌ Error saving profile:", error);
//       }
//     }
//   };

// return (
//   <div className="profile-container">
//     {/* Header Section */}
//     <header className="profile-header">
//       <h2>My Profile</h2>
//     </header>

//     {/* Top Information Section with Picture and Name */}
//     <div className="profile-top">
//         <div className="edit-pic-wrapper">
//           <img src={profilePic} alt="Profile" className="profile-image" />
//           <img src={editIcon} alt="Edit" className="edit-icon" />
//         </div>
//         <h3>{formData.fullName}</h3>
//         <p className="profile-email">{formData.email}</p>
//         <p className="profile-birthday">Birthday: {formData.dob}</p>
//       </div>

//       {/* Stats Section */}
//       <div className="profile-stats">
//         <div className="stat-item">
//           <h4>{formData.weight} Kg</h4>
//           <p>Weight</p>
//         </div>
//         <div className="stat-item">
//           <h4>{calculateAge(formData.dob)}</h4>
//           <p>Years Old</p>
//         </div>
//         <div className="stat-item">
//           <h4>{formData.height} m</h4>
//           <p>Height</p>
//         </div>
//       </div>

//       {/* Editable Profile Form */}
//       <form className="edit-form" onSubmit={handleSubmit}>
//         <label>Full name</label>
//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           className={errors.fullName ? "error" : ""}
//         />
//         {errors.fullName && <p className="error-message">{errors.fullName}</p>}

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className={errors.email ? "error" : ""}
//         />
//         {errors.email && <p className="error-message">{errors.email}</p>}

//         {/* <label>Mobile Number</label>
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className={errors.phone ? "error" : ""}
//         />
//         {errors.phone && <p className="error-message">{errors.phone}</p>} */}

//         {/* <label>Date of birth</label>
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           className={errors.dob ? "error" : ""}
//         />
//         {errors.dob && <p className="error-message">{errors.dob}</p>} */}

//         <label>Weight (kg)</label>
//         <input
//           type="text"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//           className={errors.weight ? "error" : ""}
//         />
//         {errors.weight && <p className="error-message">{errors.weight}</p>}

//         <label>Height (m)</label>
//         <input
//           type="text"
//           name="height"
//           value={formData.height}
//           onChange={handleChange}
//           className={errors.height ? "error" : ""}
//         />
//         {errors.height && <p className="error-message">{errors.height}</p>}

//         <button type="submit">Update Profile</button>
//       </form>

//       {/* Footer Navigation Section */}
//       <footer className="profile-footer">
//         <div className="footer-icon">
//           <img src={homeIcon} alt="Home" className="icon-img" />
//         </div>
//         <div className="footer-icon">
//           <img src={fileIcon} alt="File" className="icon-img" />
//         </div>
//         <div className="footer-icon">
//           <img src={starIcon} alt="Star" className="icon-img" />
//         </div>
//         <div className="footer-icon">
//           <img src={supportIcon} alt="Support" className="icon-img" />
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: username, user_password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        alert("Login successful! You can now update your profile.");
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErrorMessage("Error logging in.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You need to log in first.");
      return;
    }

    const updatedProfile = {
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      ethnicity: ethnicity,
    };

    try {
      const response = await fetch("http://localhost:3001/api/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert(data.message || "Error updating profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Please log in to make changes to your existing profile.</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <h3>{formData.first_name} {formData.last_name}</h3>
        <p className="profile-email">@{formData.user_name}</p>
        <p className="profile-birthday">Age: {formData.age}</p>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={errors.first_name ? "error" : ""}
        />
        {errors.first_name && <p className="error-message">{errors.first_name}</p>}

        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={errors.last_name ? "error" : ""}
        />
        {errors.last_name && <p className="error-message">{errors.last_name}</p>}

        <label>Username</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          className={errors.user_name ? "error" : ""}
        />
        {errors.user_name && <p className="error-message">{errors.user_name}</p>}

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={errors.gender ? "error" : ""}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="error-message">{errors.gender}</p>}

        {/* <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={errors.age ? "error" : ""}
        />
        {errors.age && <p className="error-message">{errors.age}</p>} */}

          <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={errors.age ? "error" : ""}
          min="18"
          max="24"
        />


        <label>Height (cm)</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className={errors.height ? "error" : ""}
        />
        {errors.height && <p className="error-message">{errors.height}</p>}

        <label>Weight (kg)</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className={errors.weight ? "error" : ""}
        />
        {errors.weight && <p className="error-message">{errors.weight}</p>}

        <label>Ethnicity</label>
        <input
          type="text"
          name="ethnicity"
          value={formData.ethnicity}
          onChange={handleChange}
          className={errors.ethnicity ? "error" : ""}
        />
        {errors.ethnicity && <p className="error-message">{errors.ethnicity}</p>}

        <button type="submit">Update Profile</button>
      </form>

      <footer className="profile-footer">
        <div className="footer-icon"><img src={homeIcon} alt="Home" className="icon-img" /></div>
        <div className="footer-icon"><img src={fileIcon} alt="File" className="icon-img" /></div>
        <div className="footer-icon"><img src={starIcon} alt="Star" className="icon-img" /></div>
        <div className="footer-icon"><img src={supportIcon} alt="Support" className="icon-img" /></div>
      </footer>
    </div>
  );
};

export default EditProfile;
