import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoginPage, SignupPage, VerifyemailPage, Homepage} from './Routes.jsx'
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
        <Route path="/" element={<Homepage />}> </Route>
        <Route path="/login" element={<LoginPage />}> </Route>
        <Route path="/sign-up" element={<SignupPage />}> </Route>
        <Route path="/verify-email/:activation_token" element={<VerifyemailPage />}> </Route>
      </Routes>
    </div>
  );
}

export default App