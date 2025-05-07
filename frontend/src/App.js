import './App.css';
import { Routes, Route, Link} from 'react-router-dom';
import SetUp from './pages/setUp';
import Launch from './pages/launch';
import AuthPage from './pages/AuthPage';
<<<<<<< HEAD
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
=======
import ProfilePage from './pages/profilepage';
>>>>>>> b6d461940be1b9a88a87fe08bd5420d7eeed5d5a

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <EditProfilePage />
=======
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
>>>>>>> b6d461940be1b9a88a87fe08bd5420d7eeed5d5a
      
    </div>
  );
}

export default App;
