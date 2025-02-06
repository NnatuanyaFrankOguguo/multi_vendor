//protected routes in the sense if users are not signed in there is no way there can access it on the frontend

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//so we have to protect the routes
const ProtectedRoutes = ({ children}) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user) //state.user is the reducer name
    if(loading === false){
        if(!isAuthenticated){
            return <Navigate to='/login' replace />
        }
        return children
    }
   
};

export default ProtectedRoutes;

//going to import the route in the app.jsx