//profilecard.jsx
import React, {useEffect, useState} from 'react';
import '../styles/profilecard.css'
import profilePicMock from "../assets/profilepic.jpg";
import {getUserData as getUserDataAPI } from '../api/auth';
import {sendUserData as sendUserDataAPI } from '../api/auth';
import { uploadProfilePic } from '../api/auth';

import { useAuth } from '../context/AuthContext';

function ProfileCard ({handleCloseProfile}) {

    const {user, updateUser} = useAuth();
    const [formData, setFormData] = useState({
        username:"",
        name:"",
        bio:"",
        profilepic: ""
    });

     useEffect(() => {
         const fetchData = async () => {

             try {
                 const res = await getUserDataAPI(user);
                 setFormData({
                    username: res.data.username,
                    name: res.data.name,
                    bio: res.data.bio,
                    profilepic: res.data.profilepic
                 })
             } catch (err) {
                 // fetch failed - form stays empty
             }
         }
         fetchData();
     }, [user]);


    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });   
    }


    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try{
            await sendUserDataAPI({
                username: formData.username,
                name: formData.name,
                bio: formData.bio
            });
            updateUser({ username: formData.username });
            handleCloseProfile();
        } catch (err) {
            // update failed
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formDataImage = new FormData();
            formDataImage.append("profilepic", file); // MUST MATCH multer name

            const res = await uploadProfilePic(formDataImage);

            // Update local UI immediately
            setFormData(prev => ({ ...prev, profilepic: res.data.profilepic }));

        } catch (err) {
            // upload failed
        }
    };

    return (
        <div className="ProfileCardWrapper">
            <div className="dialogHeader">

                {formData.profilepic? (
                <img className="PCProfilPic" src={formData.profilepic} alt="profilepic"></img>
                ): (
                <img className="PCProfilPic" src={profilePicMock} alt="profilepic.jpg"></img>    
                )}

            <input
                type="file"
                id="fileInput"
                name="profilepic"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />

            <button
                type="button"
                className="profileEditBtn"
                onClick={() => document.getElementById("fileInput").click()}
            >
                Upload
            </button>               



                <p>{formData.username}</p>
            </div>

            <div className="formSection">

                <div className="formField">
                    
                                     
                </div>
                <form className="form" onSubmit={handleProfileUpdate}>

                    <div className="formSections">

                        <div className="formLabels">
                            <label>Name:</label>
                            <label>Bio:</label>   
                        </div>

                        <div className="formField">                          
                            <input className="inputField"  type="text" name="name" value={formData.name} onChange={handleChange}></input>                            
                            <input className="inputField"  type="text" name="bio" value={formData.bio} onChange={handleChange}></input>
                        </div>
                    </div>

                        <div className="formBtn">
                            <button className="bioBtn" type="submit" >Save</button>  
                            <button className="bioBtn" type="button" onClick={handleCloseProfile}>Close</button>
                        </div>
                    
                </form>
                

            </div>       
        </div>
    )
}

export default ProfileCard;