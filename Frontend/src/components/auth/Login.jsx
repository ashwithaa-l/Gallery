/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            return toast.error('Please fill in all fields');
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}users/login`, {
                username,
                password
            });

            if (res.status === 200) {
                console.log(res.data);
                document.cookie = `token=${res.data.message.token}`;
                toast.success('Login Successful');
                navigate('/reactgallery');
            } else {
                toast.error('Login Failed');
            }
        } catch (err) {
            toast.error('Login Failed');
            console.error(err.message);
        }
    };

    const toSignup = () => {
        navigate('/signup');
    };

    return (
       <div className='login-page'>
         <div className="container">
  <div className="heading">Sign In</div>
  <form className="form" onSubmit={handleLogin}>
    <input
      placeholder="Username"
      id="username"
      name="username"
      type="text"
      className="input"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      placeholder="Password"
      id="password"
      name="password"
      type="password"
      className="input"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
   
    <input value="Sign In" type="submit" className="login-button" />
  </form>
  <span className="agreement">Don't have an account ?<button className="toRegister" onClick={toSignup}>Register</button></span>
  <Toaster />
</div>
       </div>
    );
}

export default Login;
