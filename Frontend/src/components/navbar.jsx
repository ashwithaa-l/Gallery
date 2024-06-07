/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import { FaChalkboardUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { useEffect, useState } from 'react';

const navbar = () => {
     const [username,setUsername] = useState('Guest');
    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
    }


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

    const getuser = async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsername(res.data.message.username)
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
         getuser();
    },[])



  return (
    <div className='nav-container'>
      <h1><Link to='/reactgallery'>Image Gallery</Link></h1>
      <ul className='nav-group'>
        <li className="upload-button"><Link to='/upload'>Upload</Link></li>  
        <li className='nav-profile'>
          <FaChalkboardUser className='nav-profile-icon'></FaChalkboardUser>
          <span className='nav-username'>{username}</span>
        </li>
        <li className='logout-button'><button onClick={()=>{handleLogout()}}><IoLogOut className='logout'/></button></li>
      </ul>
    </div>
  )
}

export default navbar;
