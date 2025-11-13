import React, { useState } from "react";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import Header from "../components/layout/Header";

const Dashboard: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return(
       <>
        <Header
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
        <h1>Dashboard Page</h1>
        
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
              {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
       </>
    );
};

export default Dashboard;