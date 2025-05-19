import React from 'react'
import "./home.css"
import profileIcon from "../images/profile.svg"
import community from "../images/community.svg"
import food from "../images/food.svg"
import Workout from "../images/WorkOut.svg"
import goals from "../images/goals.svg"
import home from "../images/home.svg"
import playB from "../images/Playvideo.svg" 
import vslogo from "../images/vslogo.png"
import { Link } from 'react-router-dom'

const Home = () => {
  const username = localStorage.getItem("username") || "Guest";

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <img src={vslogo} className='logo'></img>
      
        <div className="profile">
          <img
            src= {profileIcon}
            alt="Profile"
            className="avatar"
          />
          <div className="profile-info">
            <h2>{username}</h2>

          </div>
        </div>
        <nav className="dashboard-links">
          
          <Link to="/Home" className="active">
          <img src={home} className="nav-icon"></img>
            <span>Dashboard</span>
            </Link>
          <Link to="/Goals" className="active">
          <img src={goals} className="nav-icon"></img>
            <span>Goals</span>
          </Link>
          
          <Link to="/DietCapture" className="active">
            <img src={food} className="nav-icon"></img>
            <span>Food</span>
          </Link>

          <Link to="/Exercise" className="active">
            <img src={Workout} className="nav-icon"></img>
            <span>Exercises</span>
          </Link> 
          
          <Link to="/GroupsPage" className="active">
            <img src={community} className="nav-icon"></img>
            <span>Communities</span>
          </Link> 
          
        </nav>
      </aside>

      <main className="main">
        <header className="main-header">
          <div>
            <h1>Hi, {username}</h1>
            <p>Let's improve further today!</p>
          </div>
          <Link to="/EditProfilePage" className="active">
          <div className="main-icons">
           <img src={profileIcon} className='profileIcon'></img>
           <label>Edit Profile</label>
          </div>
          </Link>
        </header>

        <section className="quick-access">
        <Link to="/ExerciseHistory" className="active">
          <div className="quick-item">
          
            <img src={Workout} className="quick-image"></img>
            <span className="quick-label">Exercise History</span>
            
          </div>
          </Link>
          <Link to="/DietHistory" className="active">
          <div className="quick-item">
          <img src={food} className="quick-image"></img>
            <span className="quick-label">Food History</span>
          </div>
          </Link>
          <Link to="/GroupsPage" className="active">
          <div className="quick-item">
            <img src={community} className="quick-image"></img>
            <span className="quick-label">Community</span>
          </div>
          </Link>
          <Link to="/Goals" className="active">
          <div className="quick-item">
          <img src={goals} className="quick-image"></img>
            <span className="quick-label">Goals</span>
          </div>
          </Link>
        </section>
        <section className="articles">
          <div className="section-header">
            <h3>Articles & Tips</h3>
            <a href="#">View All</a>
          </div>
          <div className="cards">
            <a
             href="https://www.puregym.com/blog/a-beginners-guide-to-supplements/"
             target="_blank"
             rel="noopener noreferrer"
             className="card-link">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                alt="Supplement Guide"
              />
              <div className="card-info">
                <h4>Supplement Guide For Beginners</h4>
                <p>Essential nutrients to boost your fitness journey</p>
              </div>
            </div>
            </a>
            <a
             href="https://greatist.com/fitness/15-minute-full-body-workout"
             target="_blank"
             rel="noopener noreferrer"
             className="card-link">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
                alt="Daily Routines"
              />
              <div className="card-info">
                <h4>15 Quick & Effective Daily Routines</h4>
                <p>Simple exercises to incorporate into your busy schedule</p>
              </div>
            </div>
            </a>
          </div>
        </section>
        
        <section className="weekly-challenge">
          <div>
            <h3>Weekly Challenge</h3>
            <p><strong>Plank With Hip Twist</strong> – 3 sets of 30 seconds. Focus on form!</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616803689943-5601631c7fec"
            alt="Weekly Challenge"
            className="challenge-img"
          />
        </section>

        <section className="recommendations">
          <div className="section-header">
            <h3>Recommendations</h3>
            <a href="#">See All</a>
          </div>
          <div className="cards">
            <div className="card">
              <div className="card-image-container">
                <img
                  src="https://images.unsplash.com/photo-1517130038641-a774d04afb3c"
                  alt="Squat Exercise"
                />
                <div className="play-button">
                
                </div>
              </div>
              <div className="card-info">
                <h4>Squat Exercise</h4>
                <p>
                  <span>12 Minutes</span>
                  <span className="dot">•</span>
                  <span>120 Kcal</span>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-image-container">
                <img
                  src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0"
                  alt="Full Body Stretching"
                />
                <div className="play-button">

                </div>
              </div>
              <div className="card-info">
                <h4>Full Body Stretching</h4>
                <p>
                  <span>12 Minutes</span>
                  <span className="dot">•</span>
                  <span>120 Kcal</span>
                </p>
              </div>
            </div>
          </div>
        </section>

    

      </main>
    </div>
  )
}

export default Home
