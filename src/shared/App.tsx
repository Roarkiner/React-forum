import '../assets/style/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isUserAuthenticated } from '../services/AuthService';
import { useRoutes } from 'react-router-dom';


const App: React.FC = () => {
  const isAuthenticatedQuery = useQuery(["authentication"], isUserAuthenticated);
  const queryClient = useQueryClient()
  
  function refreshIsAuthenticated(): void {
    queryClient.invalidateQueries({ queryKey: ["authentication"] });
  }

  const routing = useRoutes([
      { path: "/*", element: <Layout element={<Home onLogout={refreshIsAuthenticated} />} isAuthenticated={isAuthenticatedQuery.data!} /> },
      { path: "/", element: <Layout element={<Home onLogout={refreshIsAuthenticated} />} isAuthenticated={isAuthenticatedQuery.data!} /> },
      { path: "/login", element: <Auth onLogin={ refreshIsAuthenticated } /> },
      { path: "/account", element: <PrivateRoute element={<Layout element={<Account />} isAuthenticated={isAuthenticatedQuery.data!} />} isAuthenticated={isAuthenticatedQuery.data!} /> }
  ]);
  
  return routing;
};

export default App;
