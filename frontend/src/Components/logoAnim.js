import React from 'react'
import vsPurple from "../images/logo/vsPurple.png"
import vsRed from "../images/logo/vsRed.png"
import runningMan from "../images/logo/runnerTransp.png"
import './logoAnim.css';

const LogoAnim = () => {
  return (
    <div>
        <img src={vsPurple} alt='vsPurple' id='vsPurple'></img>
        <img src={vsRed} alt='vsRed' id='vsRed'></img>
        <img src={runningMan} alt='runningMan'id='runner' ></img>

      
    </div>
  )
}

export default LogoAnim;
