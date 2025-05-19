import React, { useState } from "react";
import "./AuthPage.css";
import { useNavigate, Link } from "react-router-dom";

const EXPRESS_SERVER_URL = "http://localhost:3001";

function AuthPage() {
  const navigate = useNavigate();
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
        localStorage.setItem("user_name", formData.username);
        navigate("/Home");
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
              <div className="logo-icon"></div>
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
                  </div>
                  {errors.username && <p className="error-message">{errors.username}</p>}
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={errors.password ? "error" : ""}
                    />
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-button">
                  Sign in
                </button>
              </form>
              <p className="register-text">
                Don't have an account? <Link to="/Register" className="register-link">Register here</Link>
              </p>
            </div>
          </div>

          <div className="help-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
