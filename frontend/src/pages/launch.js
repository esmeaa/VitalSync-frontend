import React from 'react'
import { useNavigate } from 'react-router-dom';
import LogoAnim from '../Components/logoAnim'

const Launch = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/AuthPage'); 
  };

  return (
    <div
      onClick={handleClick}
      style={{ width: '100vw', height: '100vh', cursor: 'pointer' }}
    >
      <LogoAnim />
    </div>
  );
};

export default Launch;