import { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !password ||!email) {
            return toast.error('Please fill in all fields');
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, {
                username,
                password,
                email
            });
    
            if (res.status === 201) {
                console.log(res.data);
                document.cookie = `token=${res.data.message.token}`;
                toast.success('Registered Successful');
                navigate('/reactgallery');
            } else {
                toast.error('Signup Failed');
            }
        } catch (err) {
            toast.error(err.message);
            console.error(err.message);
        }
    };

    const toLogin = () => {
        navigate('/login');
    };

    return (
        <div className='login-page'>
            <div className="container">
                <div className="heading">Sign Up</div>
                <div className="form">
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
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button onClick={()=>handleSignup()} type="submit" className="login-button" >Sign up</button>
                </div>
                <span className="agreement">Already have an account? <button className="toRegister" onClick={toLogin}>Login</button></span>
                <Toaster />
            </div>
        </div>
    );
}

export default Signup;
