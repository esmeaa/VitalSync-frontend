import './App.css';
import { Routes, Route, Link} from 'react-router-dom';
import SetUp from './pages/setUp';
import Launch from './pages/launch';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/profilepage';

function App() {
  return (
    <div className="App">
       {/* Navigation */}
       <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
          <li><Link to="/setUp" className="nav-link">Go to SetUp</Link></li>
          <li><Link to="/launch" className="nav-link">Go to Launch</Link></li>
          <li><Link to="/AuthPage" className="nav-link">Go to AuthPage</Link></li>
          <li><Link to="/ProfilePage" className="nav-link">Go to ProfilePage</Link></li>

        </ul>

      </nav>

      <Routes>
	     <Route path="/setUp" element={<SetUp />} />
	     <Route path="/launch" element={<Launch /> }/>
       <Route path="/AuthPage" element={<AuthPage /> }/>
       <Route path="/ProfilePage" element={<ProfilePage /> }/>
	    </Routes>
      
    </div>
  );
}

export default App;
