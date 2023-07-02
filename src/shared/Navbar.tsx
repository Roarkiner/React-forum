import { Link } from "react-router-dom";

interface NavBarComponentProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavBarComponentProps> = ({ isAuthenticated }) => {
  
  return (
    <>
        <nav className="main-navbar">
            <ul>
                <li><Link to="/"><h3>Accueil</h3></Link></li>
            </ul>
            { isAuthenticated ?
              <Link to="/account" className="d-flex align-items-center">
                <i className="h4 bi bi-person-circle m-0" />
                <h4 className="ms-2">Mon compte</h4>
              </Link>
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
