import { useState } from 'react';
import { loginUser } from '../services/AuthService';
import { AxiosError } from 'axios';
import { displayDefaultToastError } from '../services/ToastHelper';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(email, password);
      window.location.href = "/";
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401)
        setError('Email ou mot de passe incorrect.');
      else {
        displayDefaultToastError();
        throw error;
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2>Se connecter</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button disabled={isLoading} className="btn btn-primary" onClick={handleLogin}>
        Me connecter
      </button>
    </>
  );
};

export default Login;