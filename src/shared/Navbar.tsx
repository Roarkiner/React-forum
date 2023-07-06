import { Link } from "react-router-dom";
import { disconnectUser } from "../services/AuthService";

interface NavBarComponentProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavBarComponentProps> = ({ isAuthenticated }) => {

  const handleLogout = () => {
    disconnectUser();
  };

  return (
    <>
      <nav className="main-navbar">
        <ul>
          <li><Link to="/"><h3>Accueil</h3></Link></li>
          {isAuthenticated &&
            <li><Link to="/my-topics"><h3>Mes sujets</h3></Link></li>
          }
        </ul>
        {isAuthenticated ?
          <div onClick={handleLogout} className="disconnect-button d-flex align-items-center">
            <i className="h4 bi bi-box-arrow-right" />
            <h4 className="ms-2">Déconnexion</h4>
          </div>
          :
          <Link to="/login">
            <h4>Se connecter</h4>
          </Link>
        }
      </nav>
    </>
  );
}

export default Navbar;
