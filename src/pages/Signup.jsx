//Signup.jsx
import React, {useState} from 'react';
import '../styles/signup.css'
import {signup as signupAPI} from '../api/auth';
import background from '../assets/background.jpg';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }


    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const res = await signupAPI({
                username: formData.username,
                name: formData.name,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm
            })

            alert("Signup successful! You can now login.");

        } catch (err) {
            alert("Signup failed. Please try again.")
        }


    }

    return(
        <div className="signupWrapper">
            
            <img className="bg" src={background} alt="" />

            <div className="formWrapper">
            <h2>Welcome to Whispr</h2>
            <h3>Please signup</h3>
            
            <form className="signupForm"  onSubmit={handleSignup}>

                <label className="loginLabel" >Username:</label>
                <input className="signupInput" type="text" placeholder="Jack1993" name="username" required value={formData.username} onChange={handleChange}></input>

                <label className="loginLabel">Name:</label>
                <input className="signupInput" type="text" placeholder="Jack Black" name="name" required value={formData.name} onChange={handleChange}></input>

                <label className="loginLabel">Password:</label>
                <input className="signupInput" type="password" name="password" required value={formData.password} onChange={handleChange}></input>

                <label className="loginLabel">Confirm Password:</label>
                <input className="signupInput" type="password" name="passwordConfirm" required value={formData.passwordConfirm} onChange={handleChange}></input>

                <button className="signupBtn" type="Submit">Submit</button>

                <p>Already have an account? Log-in <a className="msgFormLink" href="/login">here</a></p>
            </form>

            </div>

        </div>
    );
};


export default Signup;