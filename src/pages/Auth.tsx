import '../assets/style/auth.css'

import { useState } from "react";
import Login from "../shared/Login";
import Register from "../shared/Register";
import { Link } from 'react-router-dom';

const Auth: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [selectedForm, setSelectedForm] = useState<'login' | 'register'>('login');

    const handleSwitchForm = (formType: 'login' | 'register') => {
        setSelectedForm(formType);
    };

    return (
        <div className="auth-container">
            <div className="return-link">
                <Link to="/" className="return-arrow">
                    <i className="bi bi-arrow-left"></i>
                    Retour à l'accueil
                </Link>
            </div>
            <div className="form-switch-auth">
                <button
                    className={`btn ${selectedForm === 'login' ? 'active' : ''}`}
                    onClick={() => handleSwitchForm('login')}
                >
                    Se connecter
                </button>
                <span className="separator"></span>
                <button
                    className={`btn ${selectedForm === 'register' ? 'active' : ''}`}
                    onClick={() => handleSwitchForm('register')}
                >
                    Créer son compte
                </button>
            </div>
            {selectedForm === 'login' && <Login onLogin={onLogin} />}
            {selectedForm === 'register' && <Register />}
        </div>
    );
};

export default Auth;