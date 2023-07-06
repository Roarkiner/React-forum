import "../assets/style/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "../pages/Home";
import Auth from "../pages/Auth";
import MyTopics from "../pages/MyTopics";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/AuthService";
import { useRoutes } from "react-router-dom";
import NewTopic from "../pages/NewTopic";
import TopicDetail from "../pages/TopicDetail";

const App: React.FC = () => {
    const isAuthenticatedQuery = useQuery(["authentication"], isUserAuthenticated);

    const routing = useRoutes([
        { path: "/*", element: <Layout element={<Home />} isAuthenticated={isAuthenticatedQuery.data!} /> },
        { path: "/", element: <Layout element={<Home />} isAuthenticated={isAuthenticatedQuery.data!} /> },
        { path: "/login", element: <Auth /> },
        { path: "/my-topics", element: <PrivateRoute element={<Layout element={<MyTopics />} isAuthenticated={isAuthenticatedQuery.data!} />} isAuthenticated={isAuthenticatedQuery.data!} /> },
        { path: "/add-topic", element: <PrivateRoute element={<Layout element={<NewTopic />} isAuthenticated={isAuthenticatedQuery.data!} />} isAuthenticated={isAuthenticatedQuery.data!} /> },
        { path: "/topic-detail/:id", element: <Layout element={<TopicDetail isAuthenticated={isAuthenticatedQuery.data!} />} isAuthenticated={isAuthenticatedQuery.data!} /> }
    ]);

    return routing;
};

export default App;
