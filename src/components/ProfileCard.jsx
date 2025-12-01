//profilecard.jsx
import React, {useEffect, useReducer, useState} from 'react';
import '../styles/profilecard.css'
import profilePic from "../assets/profilepic.jpg";
import {getUserData as getUserDataAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function ProfileCard ({handleCloseProfile}) {

    const {user} = useAuth();
    const [formData, setFromData] = useState({
        username:"",
        name:"",
        bio:""
    });

     useEffect(() => {
         const fetchData = async () => {
            
             try {
                 const res = await getUserDataAPI(user);
                 setFromData({
                    username: res.data.username,
                    name: res.data.name,
                    bio: res.data.bio,
                 })
                 console.log("User fetched: ", res.data);
             } catch (err) {
                 console.log(err)
             }
         }
         fetchData();
     }, [user]);


    return (
        <div className="ProfileCardWrapper">
            <div className="dialogHeader">
                <img className="PCProfilPic" src={profilePic} alt="profilepic.jpg" id="profileicon2" ></img>
                <p>{formData.username}</p>
            </div>

            <div className="formSection">
                <form className="form">
                    <div className="formField">
                        <label>Name:</label>
                        <label>Bio:</label>
                        
                    </div>

                    <div className="formField">
                        <input className="inputField"  type="text" value={formData.name}></input>
                        <input className="inputField"  type="text" value={formData.bio}></input>
                    </div>
                </form>
                
                <div className="formBtn">
                    <button onClick={handleCloseProfile}>Save</button>  
                    <button onClick={handleCloseProfile}>Close</button>   
                </div>
            </div>       
        </div>
    )
}

export default ProfileCard;