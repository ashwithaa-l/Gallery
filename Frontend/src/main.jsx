import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.jsx'
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
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

