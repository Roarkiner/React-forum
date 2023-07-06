import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { UserSaveModel } from "../models/UserSaveModel";
import { displayCustomToastError, displayDefaultToastError } from "../services/ToastHelper";
import { AxiosError } from "axios";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });

    function validateEmail(): boolean {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return false;
        } else {
            return true;
        }
    }

    function validatePassword(): boolean {
        if (password.length < 8) {
            return false;
        } else {
            return true;
        }
    };

    function validateConfirmPassword(): boolean {
        if (confirmPassword !== password) {
            return false;
        } else {
            return true;
        }
    };

    function validateInputsThenSetErrors(): boolean {
        const isEmailCorrect = validateEmail();
        const isPasswordCorrect = validatePassword();
        const isConfirmPasswordCorrect = validateConfirmPassword();

        setErrors({
            email: !isEmailCorrect,
            password: !isPasswordCorrect,
            confirmPassword: !isConfirmPasswordCorrect
        });

        return isEmailCorrect && isPasswordCorrect && isConfirmPasswordCorrect;
    };

    function handleEmailBlur(): void {
        setErrors({
            email: !validateEmail(),
            password: errors.password,
            confirmPassword: errors.confirmPassword,
        });
    }

    function handlePasswordBlur(): void {
        setErrors({
            email: errors.email,
            password: !validatePassword(),
            confirmPassword: errors.confirmPassword,
        });
    }

    function handleConfirmPasswordBlur(): void {
        setErrors({
            email: errors.email,
            password: errors.password,
            confirmPassword: !validateConfirmPassword(),
        });
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        if (!validateInputsThenSetErrors()) {
            setIsLoading(false);
            return;
        }

        try {
            await registerUser(new UserSaveModel(email, password));
            window.location.href = "/";
        } catch (error) {
            if (error instanceof AxiosError && String(error.response?.data["hydra:description"]).includes("UNIQUE constraint failed: user.email")) {
                displayCustomToastError("Cet email est déjà utilisé.");
            } else {
                displayDefaultToastError();
            }
            setIsLoading(false);
            throw error;
        }
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
                        onBlur={handleEmailBlur}
                    />
                    {errors.email && <p className="error">Addresse email invalide</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                    />
                    {errors.password && <p className="error">Le mot de passe doit être long de 8 caractères</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={handleConfirmPasswordBlur}
                    />
                    {errors.confirmPassword && <p className="error">La confirmation est différente du mot de passe.</p>}
                </div>
            </div>
            <button disabled={isLoading} className="btn btn-primary" onClick={handleRegister}>
                Créer mon compte
            </button>
        </div>
    );
};

export default Register;