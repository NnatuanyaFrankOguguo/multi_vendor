import React from 'react'
import {Routes, Route} from 'react-router-dom'

import {LoginPage, SignupPage, VerifyemailPage} from './Routes.jsx'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignupPage />}></Route>
          <Route path='/verify-email/:activation_token' element={<VerifyemailPage />}></Route>
        </Routes>

    </div>
  )
}

export default App