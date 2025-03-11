import React, {useEffect} from 'react'
import { BrowserRouter, Navigate } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoginPage, SignupPage, VerifyemailPage, Homepage, ProductPage, BestSellingPage, EventsPage, 
  FAQPage, ProductDetailsPage, ProfilePage, StoreCreatePage, StoreVerifyemailPage, LoginStorePage  } from '../src/Routes/Routes.jsx'

import {StoreDashboardPage, StoreCreateProduct, StoreAllProducts, StoreCreateEvent} from '../src/Routes/StoreRoutes.jsx'
import { loadUser } from './redux/actions/user.js';
import { loadStore } from './redux/actions/store.jsx';
import { useDispatch} from 'react-redux'
import ProtectedRoutes from '../src/Routes/ProtectedRoutes.jsx';
import SellerProtectedRoutes from '../src/Routes/SellerProtectedRoute.jsx'
import { StoreHomePage } from './StoreRoutes.jsx'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
  
    dispatch(loadUser())
    // we will have to create protected route for the Store as we do to the user(that only if the seller is authenticated he can access the store homepage)
    dispatch(loadStore())
    
    
  }, [ dispatch]); // This will re-run only when `isAuthenticated` changes

  return (
    
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
          <ProtectedRoutes >
            <ProfilePage />
          </ProtectedRoutes>}>
        </Route>
        <Route path='/store-create' element = {<StoreCreatePage />}> </Route>
        <Route path="/store-verify-email/:activation_token" element={<StoreVerifyemailPage />}> </Route>
        <Route path="/login-store" element={<LoginStorePage />}> </Route>
        <Route path='/store/:id' element = {
          <SellerProtectedRoutes >
            <StoreHomePage />
          </SellerProtectedRoutes>}>
        </Route>
        <Route path='/dashboard' element = {
          <SellerProtectedRoutes >
            <StoreDashboardPage />
          </SellerProtectedRoutes>}>
        </Route>
        <Route path='/dashboard-create-product' element = {
          <SellerProtectedRoutes >
            <StoreCreateProduct />
          </SellerProtectedRoutes>}>
        </Route>
        <Route path='/dashboard-all-products' element = {
          <SellerProtectedRoutes >
            <StoreAllProducts />
          </SellerProtectedRoutes>}>
        </Route>
        <Route path='/dashboard-create-event' element = {
          <SellerProtectedRoutes >
            <StoreCreateEvent />
          </SellerProtectedRoutes>}>
        </Route>



        
        
      </Routes>
    </BrowserRouter>
        
  );
}

export default App