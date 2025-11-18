import React, { useState } from "react";
import Header from "../components/layout/Header";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import pic from '../assets/img.png'
import styles from "./landing.module.css";

const Landing: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {/* Main landing */}
      <main className={styles.container}>

        {/* HEADER */}
        <div className={styles.headerWrapper}>
          <Header
            onLoginClick={() => setShowLogin(true)}
            onSignupClick={() => setShowSignup(true)}
          />
        </div>

        {/* HERO SECTION */}
        <div className={styles.content}>
          {/* LEFT TEXT */}
          <div className={styles.left}>
            <h1 className={styles.title}>Manage Your Money Smarter</h1>
            <h2 className={styles.subtitle}>Track. Analyze. Improve.</h2>
            <p className={styles.paragraph}>
              Ledgerly helps you stay in full control of your finances with
              simple tools designed for clarity and peace of mind.
            </p>

            <button
              className={styles.cta}
              onClick={() => setShowSignup(true)}
            >
              Get Started
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className={styles.right}>
            <img
              src={pic}
              alt="Ledgerly Preview"
              className={styles.image}
            />
          </div>
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Landing;
