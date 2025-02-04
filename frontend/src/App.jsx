import React, {useEffect} from 'react'
import { BrowserRouter, Navigate } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoginPage, SignupPage, VerifyemailPage, Homepage, ProductPage, BestSellingPage, EventsPage, 
  FAQPage, ProductDetailsPage, ProfilePage, StoreCreatePage, StoreVerifyemailPage, LoginStorePage  } from './Routes.jsx'

import { loadStore, loadUser } from './redux/actions/user.js';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoutes from './ProtectedRoutes.jsx';
import SellerProtectedRoutes from './SellerProtectedRoute.jsx'
import { StoreHomePage } from './StoreRoutes.jsx'

const App = () => {

  const dispatch = useDispatch()
  const { loading, isAuthenticated } = useSelector((state) => state.user) //state.user is the reducer name
  const { isLoading, isStoreAuthenticated } = useSelector((state) => state.store) //state.store is the reducer name

  

  useEffect(() => {
    // Check if the token exists in the cookies (or wherever it's stored)
    // if(!isAuthenticated) {
    //   // If the user is authenticated, load their user data
     
    // }
    if(!isAuthenticated) {
      dispatch(loadUser())
      // we will have to create protected route for the Store as we do to the user(that only if the seller is authenticated he can access the store homepage)
    }
    dispatch(loadStore())
    
    
    
  }, [isAuthenticated, dispatch]); // This will re-run only when `isAuthenticated` changes

  return (
    <>
      {
        loading || isLoading ?  null : (
          <BrowserRouter>
            <ToastContainer autoClose={5000} hideProgressBar={true}  />
            <Routes>
              <Route path="/" element={<Homepage />}> </Route>
              <Route path="/login" element={<LoginPage />}> </Route>
              <Route path="/sign-up" element={<SignupPage />}> </Route>
              <Route path="/verify-email/:activation_token" element={<VerifyemailPage />}> </Route>
              <Route path='/products' element = {<ProductPage />}> </Route>
              <Route path='/product/:name' element = {<ProductDetailsPage />}> </Route>
              <Route path='/best-selling' element = {<BestSellingPage />}> </Route>
              <Route path='/events' element = {<EventsPage />}> </Route>
              <Route path='/faq' element = {<FAQPage />}> </Route>
              <Route path='/profile' element = {
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoutes>}>
              </Route>
              <Route path='/store-create' element = {<StoreCreatePage />}> </Route>
              <Route path="/store-verify-email/:activation_token" element={<StoreVerifyemailPage />}> </Route>
              <Route path="/login-store" element={<LoginStorePage />}> </Route>
              <Route path='/store/:id' element = {
                <SellerProtectedRoutes isStoreAuthenticated={isStoreAuthenticated}>
                  <StoreHomePage />
                </SellerProtectedRoutes>}>
              </Route>



              
              
            </Routes>
          </BrowserRouter>
        )
      }
    </>
  );
}

export default App