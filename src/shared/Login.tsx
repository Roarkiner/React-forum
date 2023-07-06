import { useEffect, useState } from 'react';
import { loginUser } from '../services/AuthService';
import { AxiosError } from 'axios';
import { displayCustomToastError, displayDefaultToastError } from '../services/ToastHelper';
import { useLocation } from "react-router-dom";

const Login: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const displayError: boolean = Boolean(queryParams.get("error")) || false;
  const redirectUrl: string = queryParams.get("redirectUrl") ?? "/";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (displayError) {
      displayCustomToastError("Veuillez vous connecter");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(email, password);
      window.location.href = redirectUrl;
    } catch (error) {
      if (!(error instanceof AxiosError) || (error.response?.data.message !== "Invalid credentials.")) {
        displayDefaultToastError();
      }
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2>Se connecter</h2>
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