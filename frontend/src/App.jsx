import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {LoginPage, SignupPage, VerifyemailPage} from './Routes.jsx'

const App = () => {
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