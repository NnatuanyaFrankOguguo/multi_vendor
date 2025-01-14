import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoginPage, SignupPage, VerifyemailPage, Homepage, 
  ProductPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage } from './Routes.jsx'
import Store from './redux/store.js';
import { loadUser } from './redux/actions/user.js';
import { useSelector } from 'react-redux'

const App = () => {

  const { loading, isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    // Check if the token exists in the cookies (or wherever it's stored)
    // if(!isAuthenticated) {
    //   // If the user is authenticated, load their user data
     
    // }
    Store.dispatch(loadUser());
    
    
  }, [isAuthenticated]);

  return (
    <>
      {
        loading ?  null : (
          <div>
            <ToastContainer autoClose={5000} hideProgressBar={true}  />
            <Routes>
              <Route path="/" element={<Homepage />}> </Route>
              <Route path="/login" element={<LoginPage />}> </Route>
              <Route path="/sign-up" element={<SignupPage />}> </Route>
              <Route path="/verify-email/:activation_token" element={<VerifyemailPage />}> </Route>
              <Route path='/products' element = {<ProductPage />}> </Route>
              <Route path='/product/:id' element = {<ProductDetailsPage />}> </Route>

              <Route path='/best-selling' element = {<BestSellingPage />}> </Route>
              <Route path='/events' element = {<EventsPage />}> </Route>
              <Route path='/faq' element = {<FAQPage />}> </Route>
              
              
            </Routes>
          </div>
        )
      }
    </>
  );
}

export default App