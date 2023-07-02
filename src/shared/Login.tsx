import { useState } from 'react';
import { loginUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { token } = await loginUser(email, password);
    if (token !== undefined && token.length > 1) {
      onLogin();
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect.');
    }
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
      <button className="btn btn-primary" onClick={handleLogin}>
        Me connecter
      </button>
    </>
  );
};

export default Login;