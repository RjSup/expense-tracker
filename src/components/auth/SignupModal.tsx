// auth/SignupModal -> api/authService.ts
import React, { useState } from "react";
import styles from './modal.module.css';


interface SignupModalProps {
    onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({onClose}) => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // handle login logic here
            console.log('Logging in with', { email, password });
            onClose();
        };

        return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
      </div>
    </div>
  );
};

export default SignupModal;