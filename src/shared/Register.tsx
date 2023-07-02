import { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleRegister = () => {
    console.log('Register:', email, password, confirmPassword);
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
      <button className="btn btn-primary" onClick={handleRegister}>
        Créer mon compte
      </button>
    </div>
  );
};

export default Register;