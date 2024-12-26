import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import Store from './redux/store.js'

const root = ReactDOM.createRoot(document.getElementById("root")); // React 18

root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

//after setting up the Redux in our main.jsx we go to app.jsx

// no longer the one below again cause of redux
// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// )
