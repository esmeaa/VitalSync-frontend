// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // We'll define styles here

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                {/* <li><NavLink to="/setUp" className="nav-link">SetUp</NavLink></li> */}
                {/* <li><NavLink to="/launch" className="nav-link">Launch</NavLink></li> */}
                <li><NavLink to="/Register" className="nav-link">Register</NavLink></li>
                <li><NavLink to="/AuthPage" className="nav-link">Login</NavLink></li>
                <li><NavLink to="/ProfilePage" className="nav-link">MyProfilePage</NavLink></li>
                <li><NavLink to="/EditProfilePage" className="nav-link">EditProfilePage</NavLink></li>
                <li><NavLink to="/MealPlans" className="nav-link">Food</NavLink></li>
                <li><NavLink to="/MealPlans" className="nav-link">Exercise</NavLink></li>
                <li><NavLink to="/Home" className="nav-link">Home</NavLink></li>

            </ul>
        </nav>
    );
};

export default Navbar;
