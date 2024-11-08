import React from 'react'
import {Routes, Route} from 'react-router-dom'

import {LoginPage, SignupPage} from './Routes.jsx'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignupPage />}></Route>
        </Routes>

    </div>
  )
}

export default App