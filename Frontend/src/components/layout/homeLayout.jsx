
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar'


const HomeLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet/>
    </div>
  )
}

export default HomeLayout;