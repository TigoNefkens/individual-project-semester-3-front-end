
import './Header.css';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import userPNG from "../assets/user.png"


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const now = Date.now() / 1000;
      setIsLoggedIn(decoded.exp > now);
    } catch (err) {
      setIsLoggedIn(false);
    }
  } 

  useEffect(() => {
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID")
    localStorage.removeItem("username")
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div className='header'>
      <img src={logo} className='logo' alt="Logo"/>
      <Link className='webname' to='/'>StageScout</Link>
      <div className='button-container'>
        {!isLoggedIn && (
          <>
            <Link className='buttons' to='/Register' style={{color:"grey"}}>Sign up</Link>
            <Link className='buttons' to='/Login' style={{color:"grey"}}>Login</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <h2>{localStorage.getItem("username")}</h2>
            <Link  to='/Profile' className='profileButton'><img src={userPNG} className='profileImage'></img></Link>
            <button id='logout' onClick={handleLogout} style={{color:"grey"}}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;