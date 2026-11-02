import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";
import CustomHeader from '../components/Header.jsx'
import GlassButton from '../components/GlassButton.jsx'
import { useNavigate } from "react-router-dom";
import OnlineUsers from '../components/OnlineUsers.jsx';

function Home() {

  return (
    <>
      <div className="app-background">
        <CustomHeader></CustomHeader>
        <div className='subtitel' style={{marginTop:"2%"}}>THE #1 PLATFORM FOR CONNECTING MUSICIANS</div>
        <OnlineUsers></OnlineUsers>
        <div className='titel'>Jam with Others</div>
        <div className='titel'>Find. Play. Unite.</div>
        <div className='buttons-container' style={{marginTop:"1%"}}>
          <Link to='/Create-bands' className='buttonlink'>🎸 Start a Band</Link> 
          <Link to='/Find-bands' className='buttonlink'>🔍 Discover Bands</Link>
        </div>
        
      </div>
    </>
  );
}

export default Home;
