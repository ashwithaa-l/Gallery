import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Reactgallery from './components/gallery/Reactgallery.jsx'
const router=createBrowserRouter([
{
  path:'/Login',
  element:<Login/>
},{
  path:'/Signup',
  element:<Signup/>
},{
  path:'/Reactgallery',
  element:<Reactgallery/>
}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
