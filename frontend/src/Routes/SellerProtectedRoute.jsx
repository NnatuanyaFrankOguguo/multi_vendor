//protected routes in the sense if sellers are not signed in there is no way there can access the homepage on the frontend

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//so we have to protect the routes
const SellerProtectedRoutes = ({children}) => {
    const { isLoading, isStoreAuthenticated } = useSelector((state) => state.store) //state.store is the reducer name
    if(isLoading === false){ //here now check if the isLoading in the reducer is true(meaning not done with the process of getting the data from the cookie) 
    // but if false then check if seller is authenticated to be able to access the stores protected routes that only sellers can access if not send to store login to login and start the process again from store actions to reducers (applies to even users too)
           if(!isStoreAuthenticated){
            return <Navigate to='/login-store' replace />
        }
        return children
    }
    
};

export default SellerProtectedRoutes;

//going to import the route in the app.jsx