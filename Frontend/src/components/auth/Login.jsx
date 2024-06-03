import React from 'react';
import './Login.css';
import { FaUser,FaLock } from "react-icons/fa";
const Login=()=>{
    return (
<>
<div className="first">
    <form action="">
        <h1>LOGIN</h1>
        <div className='input'>
            <input type="text" placeholder='Username' required />
            <FaUser className='icon'/>
        </div>
        <div className='input'>
            <input type="password" placeholder='password' required />
            <FaLock className='icon'/>
        </div>

        <button type='submit'>Login</button>
        <div className='register'>
            <p>Dont't have an accound?<a href="#">Register</a></p>
        </div>
    </form>
</div>
</>
    );
}

export default Login;