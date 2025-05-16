import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faFlag, faUtensils, faUsers, 
  faDumbbell, faCog, faQuestionCircle,
  faSearch, faBell, faPlay
} from '@fortawesome/free-solid-svg-icons';
import "./home.css"
const Home = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1 className="logo">Vitalsync</h1>
        <div className="profile">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="avatar"
          />
          <div className="profile-info">
            <h2>Madison Wilson</h2>
            <p>Premium Member</p>
          </div>
        </div>
        <nav className="dashboard-links">
          <a href="#" className="active">
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            <span>Dashboard</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faFlag} className="nav-icon" />
            <span>Goals</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faUtensils} className="nav-icon" />
            <span>Meal Plan</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faUsers} className="nav-icon" />
            <span>Communities</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faDumbbell} className="nav-icon" />
            <span>Exercises</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faCog} className="nav-icon" />
            <span>Settings</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
            <span>Help Center</span>
          </a>
        </nav>
      </aside>

      <main className="main">
        <header className="main-header">
          <div>
            <h1>Hi, Madison</h1>
            <p>It's time to challenge your limits.</p>
          </div>
          <div className="main-icons">
            <div className="icon search">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="icon bell">
              <FontAwesomeIcon icon={faBell} />
            </div>
          </div>
        </header>

        <section className="quick-access">
          <div className="quick-item">
            <FontAwesomeIcon icon={faDumbbell} size="2x" />
            <span className="quick-label">Workout</span>
          </div>
          <div className="quick-item">
            <FontAwesomeIcon icon={faUtensils} size="2x" />
            <span className="quick-label">Food</span>
          </div>
          <div className="quick-item">
            <FontAwesomeIcon icon={faUsers} size="2x" />
            <span className="quick-label">Community</span>
          </div>
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
                  <FontAwesomeIcon icon={faPlay} />
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
                  <FontAwesomeIcon icon={faPlay} />
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

        <section className="weekly-challenge">
          <div>
            <h3>Weekly Challenge</h3>
            <p>Plank With Hip Twist</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616803689943-5601631c7fec"
            alt="Weekly Challenge"
            className="challenge-img"
          />
        </section>

        <section className="articles">
          <div className="section-header">
            <h3>Articles & Tips</h3>
            <a href="#">View All</a>
          </div>
          <div className="cards">
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
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
