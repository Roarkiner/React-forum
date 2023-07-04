import '../assets/style/layout.css'
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutComponentProps {
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const Layout: React.FC<LayoutComponentProps> = ({ element, isAuthenticated }) => {
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
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
