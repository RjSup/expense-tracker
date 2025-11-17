import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBurger } from './NavBurger';
import styles from '../layout/header.module.css';
import { LoginModal } from '../auth/LoginModal';
import { SignupModal } from '../auth/SignupModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick, onLogoutClick }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    if (onLoginClick) onLoginClick();
    else setShowLogin(true);
  };

  const handleSignup = () => {
    if (onSignupClick) onSignupClick();
    else setShowSignup(true);
  };
  
  const handleLogout = () => {

    if(onLogoutClick) onLogoutClick(); 
    else {
       logout();
       navigate("/");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.title}>Ledgerly</Link>
      </div>

      <NavBurger isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <nav className={`${styles.nav} ${isMenuOpen ? styles.open: ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>

        {/* dont wanna show dashboard if nto logged in */}
        {isLoggedIn && (
          <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>

          </>
        )}

        {/* show login signup on not logged in */}
        {!isLoggedIn && (
        <>
        <span className={styles.link} onClick={handleLogin}>Login</span>
        <span className={styles.link} onClick={handleSignup}>Signup</span>
        </>
        )}

        {/* only show logout if logged in */}
        {isLoggedIn && (
        <span className={styles.link} onClick={handleLogout}>Logout</span>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </header>
  );
};

export default Header;
