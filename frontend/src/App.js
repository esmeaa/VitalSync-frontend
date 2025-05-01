import './App.css';
import { BrowserRouter, Router } from 'react-router-dom';
import SetUp from './pages/setUp';
import Launch from './pages/launch';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/profilepage';

function App() {
  return (
    <div className="App">
      <AuthPage/>
      
    </div>
  );
}

export default App;
