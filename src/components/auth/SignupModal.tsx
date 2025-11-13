// auth/SignupModal -> api/authService.ts
import React, { useState } from "react";
import styles from './modal.module.css';
import { signup } from "../../api/authService";

// props passed from parent component
interface SignupModalProps {
    onClose: () => void;
}

// SignupModal component
export const SignupModal: React.FC<SignupModalProps> = ({onClose}) => {
        // get and set state for email, password, error, success
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        // when form is submitted
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            try {
              // send data to api
              const data = await signup(email, password);
              setSuccess(data.message);
              setError('');
            } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              }
              setSuccess('');
              return;
            }
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

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
};

export default SignupModal;