import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import Header from "../components/layout/Header";
import { fetchDashboard } from "../api/authService";

import styles from './dashboard.module.css'

const Dashboard: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // redirect to home/login if no token
        return;
      }

      try {
        const data = await fetchDashboard();
        setMessage(data.message);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard");
        localStorage.removeItem("token"); // remove invalid token
        navigate("/"); // redirect to login
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  return (
    <>
      <main className={styles.header}>
        <Header
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        />
        <h1>Dashboard Page</h1>
      </main>

      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <p>{message}</p>}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Dashboard;
