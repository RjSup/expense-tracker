import React, { useState } from "react";
import Header from "../components/layout/Header";
// import { EchoInput } from "../components/EchoInput";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import styles from './landing.module.css'

const Landing: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <main className={styles.header}>
        <h1 className={styles.title}>Welcome to Ledgerly</h1>
        <p className={styles.p}>Your personal expense tracker.</p>
        {/* <EchoInput /> */}
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}

export default Landing;
