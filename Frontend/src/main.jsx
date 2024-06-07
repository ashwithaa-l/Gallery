import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Reactgallery from './components/gallery/Reactgallery.jsx'
import Upload from './components/upload/Upload.jsx'
import HomeLayout from './components/layout/homeLayout.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    children:[
    {
      path:'/reactgallery',
      element:<Reactgallery/>
    },{
      path:'/upload',
      element:<Upload></Upload>
    }]
  },
{
  path:'/login',
  element:<Login/>
},{
  path:'/signup',
  element:<Signup/>
}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

