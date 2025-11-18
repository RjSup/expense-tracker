import React, { useState } from "react";
import { signup } from "../../api/authService";
import styles from './modal.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await signup(name, email, password);
      loginUser(data.token);
      onClose();
      navigate('/dashboard');
    } catch (err: unknown) {
      if(err instanceof Error) {
        setError(err.message);
      } else {
        console.error('Unknown error during signup', err);
        setError('Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignupModal;
