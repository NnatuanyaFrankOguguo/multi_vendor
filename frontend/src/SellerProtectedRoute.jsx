//protected routes in the sense if sellers are not signed in there is no way there can access the homepage on the frontend

import { Navigate } from "react-router-dom";

//so we have to protect the routes
const SellerProtectedRoutes = ({isStoreAuthenticated, children}) => {
    if(!isStoreAuthenticated){
        return <Navigate to='/login-store' replace />
    }
    return children
};

export default SellerProtectedRoutes;

//going to import the route in the app.jsx