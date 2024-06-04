/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
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
        <div className='form-container'>
            <div className="first">
                <form onSubmit={handleLogin}>
                    <h1>LOGIN</h1>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input'>
                        <input
                            type="password"
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                    </div>

                    <button type='submit'>Login</button>
                    <div className='register'>
                        <p>Don't have an account? <button type="button" onClick={toSignup}>Register</button></p>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
