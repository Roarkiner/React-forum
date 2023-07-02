import '../assets/style/layout.css'
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutComponentProps {
  element: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutComponentProps> = ({ element, isAuthenticated, onLogout }) => {
  return (
    <>
        <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <main className='main'>
            <div className='main-content'>
                {element}
            </div>
        </main>
        <Footer />
    </>
  )
}

export default Layout;
