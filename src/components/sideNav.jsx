//sideNav.jsx
import React, {useEffect, useState} from 'react';
import '../styles/sideNav.css'
import backArrow from "../assets/backarrow.png";
import profilePicMock from "../assets/profilepic.jpg";
import {getUserData as getUserDataAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';


function SideNav ({isOpen, item, handleSideNavClose, handleOpenProfile, handleNewGroupChat}) {

    const {logout} = useAuth();

        const [userData, setUserData] = useState({
            name:"",
            profilepic: ""
        });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await getUserDataAPI(item);
                setUserData({
                name: res.data.name,
                profilepic: res.data.profilepic
                })
                console.log("User fetched: ", res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [item]);

    return (
        <div className={`sideNavWrapper ${isOpen ? "open" : ""}`}>
            <div className="sideNavHeader">

                <div className="backButton">
                    <img className="headerIcons" src={backArrow} alt="backArrow.png" id="backArrow" onClick={() => handleSideNavClose(false)} ></img> 
                </div>

                <div className="profileInfo">
                    {userData.profilepic? (
                    <img className="SNProfilPic" src={userData.profilepic} alt="profilepic"></img>
                    ): (
                    <img className="SNProfilPic" src={profilePicMock} alt="profilepic.jpg"></img>    
                    )}
                    {userData.name}               

                </div>           
            </div>
            
            <div className="sideNavOptions">
                <div className="profleLink">
                <p onClick={handleOpenProfile}>My Profile</p>
                </div>
                <p onClick={handleNewGroupChat}>New group chat</p>
                <p onClick={logout}>Logout</p>
            </div>
        </div>
    )
}

export default SideNav;