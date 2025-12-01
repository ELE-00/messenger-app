//Login.jsx
import React, {useState} from 'react';
import '../styles/login.css'
import {login as loginAPI} from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handlelogin = async (e) => {
        e.preventDefault();

        try{
            const res = await loginAPI({
                username: formData.username,
                password: formData.password,
            })

            console.log(res.data);
            
            //Set logged in user to local storage
            setUser({
                id: res.data.user.id,
                username: res.data.username,
                token: res.data.token
            })

            //Redirect to home
            navigate("/");
        } catch (err) {
            console.log(err)
            alert("Login failed. Please try again.")
        }
    }



    return(
        <div className="loginWrapper">

            <div className="formWrapper">
            <h2>Welcome to Messenger</h2>
            <h3>Please login</h3>
            
            <form className="loginForm" onSubmit={handlelogin}>
                <label className="loginLabel" for="username">Username:</label>
                <input id="username" name="username" placeholder="username" type="text" value={formData.username} onChange={handleChange}/>
                <label className="loginLabel" for="password">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}/>
                <button className="loginBn" type="submit">Log In</button>
            </form>
            <p className="msgFormText">New account? <a className="Link" href="/signup">Sign up here</a></p>


            </div>

        </div>
    );
};


export default Login;