import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="main-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-content">
          <h1 className="logo">HealthSync</h1>
          <div className="mobile-header-actions">
            
          </div>
        </div>
      </header>

      <div className="layout-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">HealthSync</h1>
          </div>
          <div className="sidebar-user">
            
            <h2 className="user-name">user name</h2>
            <p className="user-membership"> Member</p>
          </div>
          <nav className="nav-menu">
            <ul>
              
            </ul>
          </nav>
          <div className="sidebar-footer">
            
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Mobile User Overview */}
          <div className="mobile-user-info">
            
            <h2 className="user-name"></h2>
            <p className="user-membership"> Member</p>
          </div>

      
        </main>
      </div>

         
      
    </div>
    </div>
  )
}

export default Home
