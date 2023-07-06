import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ isAuthenticated: boolean, element: React.ReactNode }> = ({ isAuthenticated, element }) => {
    if (isAuthenticated == undefined) {
        return <></>
    } else {
        return (
            <>
                {isAuthenticated ?
                    <>{element}</>
                    :
                    <Navigate to={`/login?redirectUrl=${window.location.pathname}`} />
                }
            </>
        )
    }
};

export default PrivateRoute;