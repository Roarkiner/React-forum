import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerUser } from '../services/AuthService';
import { UserSaveModel } from '../models/UserSaveModel';
import { toast } from 'react-toastify';

const Register: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Addresse email invalide',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Le mot de passe doit être long de 8 caractères',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'La confirmation est différente du mot de passe.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (errors.email !== "" || errors.password !== "" || errors.confirmPassword !== "") {
      setIsLoading(false);
      return;
    }

    try {
      const result = await registerUser(new UserSaveModel(email, password));
      if (result) {
        onLogin();
        navigate('/');
      }
      else
        toast.error("Un problème est survenu, veuillez rafraichir la page.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false
        });
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="register-form">
      <h2>Créer un compte</h2>
      <div className="input-group">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
      </div>
      <button disabled={isLoading} className="btn btn-primary" onClick={handleRegister}>
        Créer mon compte
      </button>
    </div>
  );
};

export default Register;