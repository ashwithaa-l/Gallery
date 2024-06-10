
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../navbar'


const HomeLayout = () => {
  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
  }

  const token = getCookieValue('token');
  const navigate = useNavigate();

  if (token == undefined) {
    navigate('/login');
  }
  return (
    <div>
        <Navbar></Navbar>
        <Outlet/>
    </div>
  )
}

export default HomeLayout;