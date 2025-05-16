import React from 'react'
import "./home.css"
import logo from "../images/VS.png"
import gymbg from "../images/gym.png"
const Home = () => {
  return (
    <div className="dashboard">
    <aside className="sidebar">
      <img src = {logo} alt = "logo" ></img>
      <h1 className="logo">VitalSync</h1>
      <div className="profile">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="avatar"
        />
        <div className="profile-info">
          <h2>Emma Wilson</h2>
          <p>premium Member</p>
        </div>
      </div>
      <nav className="dashboard-links">
        <a href="#" className="active">Dashboard</a>
        <a href="#">Goals</a>
        <a href="#">Meal Plan</a>
        <a href="#">Communities</a>
        <a href="#">Exercises</a>
        <a href="#">Settings</a>
        <a href="#">Help Center</a>
      </nav>
    </aside>

    <main className="main">
      <header className="main-header">
        <div>
          <h2>Hi, Emma</h2>
          <p>It's time to challenge your limits.</p>
        </div>
        <div className="main-icons">
          <i className="icon search" />
          <i className="icon bell" />
        </div>
      </header>

      <section className="quick-access">
        <div className="quick-item">Workout</div>
        <div className="quick-item">Progress Tracking</div>
        <div className="quick-item">Nutrition</div>
        <div className="quick-item">Community</div>
      </section>

      <section className="recommendations">
        <div className="section-header">
          <h3>Recommendations</h3>
          <a href="#">See All</a>
        </div>
        <div className="cards">
          <div className="card">
            <img
              src= {gymbg}
              alt="Squat Exercise"
            />
            <div className="card-info">
              <h4>Squat Exercise</h4>
              <p>12 Minutes · 120 Kcal</p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://via.placeholder.com/300x150"
              alt="Full Body Stretching"
            />
            <div className="card-info">
              <h4>Full Body Stretching</h4>
              <p>12 Minutes · 120 Kcal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="weekly-challenge">
        <h3>Weekly Challenge</h3>
        <p>Plank With Hip Twist</p>
        <img
          src="https://via.placeholder.com/150"
          alt="Weekly Challenge"
          className="challenge-img"
        />
      </section>
    </main>
  </div>
  )
}

export default Home
