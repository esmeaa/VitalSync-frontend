// import './App.css';
// import { Routes, Route, Link} from 'react-router-dom';
// import SetUp from './pages/setUp';
// import Launch from './pages/launch';
// import AuthPage from './pages/AuthPage';
// import ProfilePage from './pages/profilepage';
// import EditProfilePage from './pages/EditProfilePage';
// import MealPlans from './pages/MealPlans';
//import GroupsPage from './pages/GroupsPage'; 
// function App() {
//   return (
//     <div className="App">

//        {/* Navigation */}
//        <nav>
//         <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
//           <li><Link to="/setUp" className="nav-link">Go to SetUp</Link></li>
//           <li><Link to="/launch" className="nav-link">Go to Launch</Link></li>
//           <li><Link to="/AuthPage" className="nav-link">Go to AuthPage</Link></li>
//           <li><Link to="/ProfilePage" className="nav-link">Go to ProfilePage</Link></li>
//           <li><Link to="/EditProfilePage" className="nav-link">Go to EditProfilePage</Link></li>
//           <li><Link to="/MealPlans" className="nav-link">Go to MealPlans</Link></li>
//          <li><Link to="/GroupsPage" className="nav-link">Go to Groups</Link></li>

//         </ul>

//       </nav>

//       <Routes>
// 	     <Route path="/setUp" element={<SetUp />} />
// 	     <Route path="/launch" element={<Launch /> }/>
//        <Route path="/AuthPage" element={<AuthPage /> }/>
//        <Route path="/ProfilePage" element={<ProfilePage /> }/>
//        <Route path="/EditProfilePage" element={<EditProfilePage /> }/>
//        <Route path="/MealPlans" element={<MealPlans /> }/>
//        <Route path="/GroupsPage" element={<GroupsPage />} /> 
// 	    </Routes>

//     </div>
//   );
// }

// export default App;

// src/App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar
import SetUp from './pages/setUp';
import Launch from './pages/launch';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import MealPlans from './pages/MealPlans';
import DietCapture from './pages/DietCapture';
import { Link } from 'react-router-dom';


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
          <li><Link to="/EditProfilePage" className="nav-link">Go to EditProfilePage</Link></li>
          <li><Link to="/MealPlans" className="nav-link">Go to MealPlans</Link></li>
          <li><Link to="/DietCapture" className="nav-link">Go to DietCapture</Link></li>


        </ul>

      </nav>

      <Routes>
	     <Route path="/setUp" element={<SetUp />} />
	     <Route path="/launch" element={<Launch /> }/>
       <Route path="/AuthPage" element={<AuthPage /> }/>
       <Route path="/ProfilePage" element={<ProfilePage /> }/>
       <Route path="/EditProfilePage" element={<EditProfilePage /> }/>
       <Route path="/MealPlans" element={<MealPlans /> }/>
       <Route path="/DietCapture" element={<DietCapture /> }/>
	    </Routes>
      
    </div>
  );
}

export default App;
