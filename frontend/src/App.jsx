import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {LoginPage, SignupPage, VerifyemailPage} from './Routes.jsx'
import server from './server.js';
import Store from './redux/store.js';
import { loadUser } from './redux/actions/user.js';

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    
  }, []);

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar={true}  />
      <Routes>
        <Route path="/login" element={<LoginPage />}> </Route>
        <Route path="/sign-up" element={<SignupPage />}> </Route>
        <Route path="/verify-email/:activation_token" element={<VerifyemailPage />}> </Route>
      </Routes>
    </div>
  );
}

export default App