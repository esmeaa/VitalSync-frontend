
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><NavLink to="/Register" className="nav-link">Register</NavLink></li>
                <li><NavLink to="/AuthPage" className="nav-link">Login</NavLink></li>
                <li><NavLink to="/ProfilePage" className="nav-link">MyProfilePage</NavLink></li>
                <li><NavLink to="/EditProfilePage" className="nav-link">EditProfilePage</NavLink></li>
                <li><NavLink to="/DietCapture" className="nav-link">Food</NavLink></li>
                <li><NavLink to="/Exercise" className="nav-link">Exercise</NavLink></li>
                <li><NavLink to="/ExerciseHistory" className="nav-link">ExerciseHistory</NavLink></li>
                <li><NavLink to="/Goals" className="nav-link">Goals</NavLink></li>
                <li><NavLink to="/Home" className="nav-link">Home</NavLink></li>
                <li><NavLink to="/GroupsPage" className="nav-link">GroupsPage</NavLink></li>

            </ul>
        </nav>
    );
};

export default Navbar;
