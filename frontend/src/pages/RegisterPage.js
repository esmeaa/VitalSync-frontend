

import React, { useState } from "react";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";

const calculateStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 4) strength += 25;
    if (password.length >= 8) strength += 35;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    return strength > 100 ? 100 : strength;
};

const getStrengthColor = (password) => {
    const strength = calculateStrength(password);
    if (strength < 25) return "#e74c3c"; // red
    if (strength < 35) return "#f39c12"; // orange
    return "#27ae60"; // green
};

const PasswordStrength = ({ password }) => {
    const strength = calculateStrength(password);
    const color = getStrengthColor(password);

    return (
        <div className="password-strength">
            <div className="strength-bar">
                <div
                    className="strength-fill"
                    style={{
                        width: `${strength}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
            <p className="strength-text">Password must be at least 4 characters</p>
        </div>
    );
};

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();


    const validateForm = () => {
        if (formData.password.length < 4) {
            setError("Password must be at least 4 characters");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:3001/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Registration failed");
            }

            const data = await response.json();
            alert(data.message || `Account created for ${formData.username}`);
            navigate("/setUp");// Redirect to login page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-column form-column">
                <div className="logo-container">
                    <h1 className="app-title">VitalSync</h1>
                    <p className="app-subtitle">Join the community</p>
                </div>

                <div className="auth-card">
                    <h2 className="auth-heading">Create an Account</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <PasswordStrength password={formData.password} />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="submit-button">
                            Register
                        </button>
                    </form>

                    <p className="help-footer">
                        Already have an account? <a href="/AuthPage">Log in here</a>
                    </p>
                </div>
            </div>

            <div className="auth-column hero-column">
                <h1>Welcome to VitalSync</h1>
                <p>An app made for students by students!</p>
            </div>
        </div>
    );
};

export default RegisterPage;
