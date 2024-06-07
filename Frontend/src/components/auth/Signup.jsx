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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            return toast.error('Please fill in all fields');
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, {
                username,
                password
            });

            if (res.status === 201) {
                toast.success('Signup Successful');
                navigate('/login');
            } else {
                toast.error('Signup Failed');
            }
        } catch (err) {
            toast.error('Signup Failed');
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
                <div className="form" onSubmit={handleSignup}>
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
                        id="password"
                        name="password"
                        type="password"
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
                    <input value="Sign Up" type="submit" className="login-button" />
                </div>
                <span className="agreement">Already have an account? <button className="toRegister" onClick={toLogin}>Login</button></span>
                <Toaster />
            </div>
        </div>
    );
}

export default Signup;
