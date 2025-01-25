//protected routes in the sense if users are not signed in there is no way there can access it on the frontend

import { Navigate } from "react-router-dom";

//so we have to protect the routes
const ProtectedRoutes = ({isAuthenticated, children}) => {
    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }
    return children
};

export default ProtectedRoutes;

//going to import the route in the app.jsx