import React, { useState } from 'react';
import styles from './modal.module.css';
import { login } from '../../api/authService';
import { useNavigate } from 'react-router-dom';

// props passed from parent component
interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {
  // get and set state for email, password, error, success
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // async when form is submitted
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          // send data to api -> backend
          const data = await login(email, password);
          localStorage.setItem('token', data.token);
          setSuccess(data.message);
          setError('');

          navigate('/dashboard');
          onClose();
        } catch (err: any) {
          setError(err.message);
          setSuccess('');
        }
    };

    return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
        {/* Display error or success message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
    )
}

export default LoginModal;