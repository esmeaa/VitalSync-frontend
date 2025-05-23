// import React, { useState } from "react";
// import "./AuthPage.css";
// import { useNavigate } from "react-router-dom";
// const EXPRESS_SERVER_URL = "http://localhost:3001";
// function AuthPage() {
//   const navigate = useNavigate();
//   const [authView, setAuthView] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form state, just for demonstration ask aysha to change
//   const [formData, setFormData] = useState({
//     username: "aysha@gmail.com",
//     password: "wegotthis",
//     confirmPassword: "wegotthis",
//     firstName: "Aysha",
//     lastName: "Rehman",
//     rememberMe: false
//   });
//   // Error messages
//   const [errors, setErrors] = useState({});
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value
//     });

//     // Clear error for this field when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ""
//       });
//     }
//   };
//   // Password strength calculation
//   const calculateStrength = (password) => {
//     // Simple strength calculation based just on length
//     return Math.min(100, password.length * 25);
//   };
//   // Get color for password strength indicator
//   const getStrengthColor = (password) => {
//     if (password.length < 4) return "red";
//     if (password.length < 6) return "orange";
//     return "green";
//   };
//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     // Email validation
//     if (!formData.username) {
//       newErrors.username = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
//       newErrors.username = "Email is invalid";
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 4) {
//       newErrors.password = "Password must be at least 4 characters";
//     }

//     // Confirm password (only for registration)
//     if (authView === "register") {
//       if (!formData.firstName) {
//         newErrors.firstName = "First name is required";
//       }

//       if (!formData.lastName) {
//         newErrors.lastName = "Last name is required";
//       }

//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";

//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form submission from reloading the page
//     try {
//       const res = await fetch(EXPRESS_SERVER_URL + "/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_name: formData.username, // Use formData here
//           user_password: formData.password, // Use formData here
//         }),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("Login failed:", errorText);
//         alert("Login failed: " + res.statusText);
//         return;
//       }

//       const data = await res.json();
//       if (data.login === "success") {
//         // Redirect to the dashboard or home page
//         navigate("/setUp");
//       }
//       // console.log("Login successful:", data);
//       // alert(`Welcome ${JSON.stringify(data)}!`);
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login.");
//     }
//   };



//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await fetch("http://localhost:3001/api/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             username: formData.username,
//             password: formData.password,
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             confirmPassword: formData.confirmPassword
//           })
//         });

//         // Check if the response is successful
//         if (!response.ok) {
//           const errorText = await response.text(); // Get response as text first
//           throw new Error(errorText || "Registration failed");
//         }

//         // Try parsing the JSON only if the response is successful
//         const result = await response.json();

//         console.log("Registration successful:", result.message);
//         alert(`Account created for ${formData.username}`);
//         setAuthView("login"); // Optionally switch to login after register
//       } catch (error) {
//         console.error("Registration error:", error);
//         setErrors({ register: error.message });
//       }
//     }
//   };


//   // Password strength indicator component
//   const PasswordStrength = ({ password }) => {
//     const strength = calculateStrength(password);
//     const color = getStrengthColor(password);

//     return (
//       <div className="password-strength">
//         <div className="strength-bar">
//           <div
//             className="strength-fill"
//             style={{
//               width: `${strength}%`,
//               backgroundColor: color
//             }}
//           />
//         </div>
//         <p className="strength-text">
//           Password must be at least 4 characters
//         </p>
//       </div>
//     );
//   };
//   // Render login form
//   const renderLoginForm = () => (
//     <form onSubmit={handleLogin} className="auth-form">
//       <div className="form-group">
//         <label htmlFor="username">Email</label>
//         <div className="input-wrapper">
//           <input
//             type="email"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             className={errors.username ? "error" : ""}
//           />
//           <i className="email-icon">✉️</i>
//         </div>
//         {errors.username && <p className="error-message">{errors.username}</p>}
//       </div>

//       <div className="form-group">
//         <div className="label-row">
//           <label htmlFor="password">Password</label>
//           <button
//             type="button"
//             className="forgot-button"
//             onClick={() => alert("Password reset functionality would go here")}
//           >
//             Forgot password?
//           </button>
//         </div>
//         <div className="input-wrapper">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="••••••••"
//             className={errors.password ? "error" : ""}
//           />
//           <i className="password-icon">🔒</i>
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </button>
//         </div>
//         {errors.password && <p className="error-message">{errors.password}</p>}
//       </div>

//       <div className="form-group checkbox-group">
//         <input
//           type="checkbox"
//           id="rememberMe"
//           name="rememberMe"
//           checked={formData.rememberMe}
//           onChange={handleChange}
//         />
//         <label htmlFor="rememberMe" className="checkbox-label">
//           Remember me
//         </label>
//       </div>

//       <button type="submit" className="submit-button">
//         Sign in →
//       </button>
//     </form>
//   );
//   // Render registration form
//   const renderRegisterForm = () => (
//     <form onSubmit={handleRegister} className="auth-form">
//       <div className="name-row">
//         <div className="form-group half">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="John"
//             className={errors.firstName ? "error" : ""}
//           />
//           {errors.firstName && <p className="error-message">{errors.firstName}</p>}
//         </div>

//         <div className="form-group half">
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             placeholder="Doe"
//             className={errors.lastName ? "error" : ""}
//           />
//           {errors.lastName && <p className="error-message">{errors.lastName}</p>}
//         </div>
//       </div>

//       <div className="form-group">
//         <label htmlFor="register-username">Email</label>
//         <div className="input-wrapper">
//           <input
//             type="email"
//             id="register-username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             className={errors.username ? "error" : ""}
//           />
//           <i className="email-icon">✉️</i>
//         </div>
//         {errors.username && <p className="error-message">{errors.username}</p>}
//       </div>

//       <div className="form-group">
//         <label htmlFor="register-password">Password</label>
//         <div className="input-wrapper">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="register-password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="••••••••"
//             className={errors.password ? "error" : ""}
//           />
//           <i className="password-icon">🔒</i>
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </button>
//         </div>
//         <PasswordStrength password={formData.password} />
//         {errors.password && <p className="error-message">{errors.password}</p>}
//       </div>

//       <div className="form-group">
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <div className="input-wrapper">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="••••••••"
//             className={errors.confirmPassword ? "error" : ""}
//           />
//           <i className="password-icon">🔒</i>
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? "🙈" : "👁️"}
//           </button>
//         </div>
//         {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
//       </div>

//       <button type="submit" className="submit-button">
//         Create account →
//       </button>
//     </form>
//   );
//   return (
//     <div className="auth-container">
//       {/* Left Column: Form */}
//       <div className="auth-column form-column">
//         <div className="auth-form-container">
//           {/* App Logo and Branding */}
//           <div className="logo-container">
//             <div className="app-logo">
//               <div className="logo-icon">
//                 <span>❤️</span>
//                 <span>📊</span>
//               </div>
//             </div>
//             <h1 className="app-title">VitalSync</h1>
//             <p className="app-subtitle">Track, analyze, and optimize your fitness journey</p>
//           </div>
//           {/* Form Card */}
//           <div className="auth-card">
//             {/* Form Navigation Tabs */}
//             <div className="auth-tabs">
//               <button
//                 className={`tab ${authView === 'login' ? 'active' : ''}`}
//                 onClick={() => setAuthView('login')}
//               >
//                 Login
//               </button>
//               <button
//                 className={`tab ${authView === 'register' ? 'active' : ''}`}
//                 onClick={() => setAuthView('register')}
//               >
//                 Create Account
//               </button>
//             </div>

//             {/* Form Content */}
//             <div className="auth-content">
//               <h2 className="auth-heading">
//                 {authView === 'login' ? 'Welcome Back' : 'Create your account'}
//               </h2>

//               {authView === 'login' ? renderLoginForm() : renderRegisterForm()}
//             </div>
//           </div>
//           {/* Help Footer */}
//           <div className="help-footer">
//             <p>
//               {/* Need help? <a href="#" className="help-link">Contact Support</a> */}
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* Right Column: Hero */}
//       <div className="auth-column hero-column">
//         <div className="hero-content">
//           <h2 className="hero-title">Transform Your Fitness Journey</h2>
//           <p className="hero-text">
//             VitalSync helps you track your workouts, monitor health metrics,
//             and achieve your fitness goals with personalized insights and analytics.
//           </p>

//           <div className="feature-grid">
//             <div className="feature">
//               <div className="feature-icon">📊</div>
//               <h3 className="feature-title">Analytics</h3>
//               <p className="feature-text">Detailed insights into your progress</p>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">🏋️</div>
//               <h3 className="feature-title">Workouts</h3>
//               <p className="feature-text">Customized workout plans</p>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">🍎</div>
//               <h3 className="feature-title">Nutrition</h3>
//               <p className="feature-text">Track your diet and calories</p>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">💪</div>
//               <h3 className="feature-title">Goals</h3>
//               <p className="feature-text">Set and achieve fitness targets</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AuthPage;


import React, { useState } from "react";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";

const EXPRESS_SERVER_URL = "http://localhost:3001";

function AuthPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Username is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(EXPRESS_SERVER_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.username,
          user_password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Login failed: " + errorText);
        return;
      }

      const data = await res.json();
      if (data.login === "success") {
        navigate("/setUp");
      }
    } catch (error) {
      alert("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-column form-column">
        <div className="auth-form-container">
          <div className="logo-container">
            <div className="app-logo">
              <div className="logo-icon">
              </div>
            </div>
            <h1 className="app-title">VitalSync</h1>
            <p className="app-subtitle">Your Vitals Synced!</p>
          </div>

          <div className="auth-card">
            <div className="auth-content">
              <h2 className="auth-heading">Glad to have you back!</h2>

              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={errors.username ? "error" : ""}
                    />
                    {/* <i className="email-icon">✉️</i> */}
                  </div>
                  {errors.username && <p className="error-message">{errors.username}</p>}
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="password">Password</label>
                    {/* <button
                      type="button"
                      className="forgot-button"
                      onClick={() => alert("Password reset coming soon!")}
                    >
                      Forgot password?
                    </button> */}
                  </div>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="  ••••••••"
                      className={errors.password ? "error" : ""}
                    />
                    {/* <i className="password-icon">🔒</i> */}
                    {/* <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button> */}
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-button">
                  Sign in →
                </button>
              </form>
            </div>
          </div>

          <div className="help-footer">
            {/* <p>Need help? <a href="#" className="help-link">Contact Support</a></p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
