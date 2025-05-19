
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import SetUp from './pages/setUp';
import Launch from './pages/launch';
import AuthPage from './pages/AuthPage';
import EditProfilePage from './pages/EditProfilePage';
import DietCapture from './pages/DietCapture'
import RegisterPage from './pages/RegisterPage';
import Goals from './pages/Goals';
import GroupsPage from './pages/GroupsPage';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import ExerciseHistory from './pages/ExerciseHistory';
import DietHistory from './pages/DietHistory';


function App() {
  return (
    <div className="App">
      <Navbar /> {/* Include the Navbar at the top */}
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/setUp" element={<SetUp />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/DietCapture" element={<DietCapture />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Goals" element={<Goals />} />
        <Route path="/GroupsPage" element={<GroupsPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Exercise" element={<Exercise />} />
        <Route path="/ExerciseHistory" element={<ExerciseHistory />} />
        <Route path="/DietHistory" element={<DietHistory />} />



      </Routes>
    </div>
  );
}

export default App;
