//sideNav.jsx
import React, {useEffect, useState} from 'react';
import '../styles/sideNav.css'
import backArrow from "../assets/backarrow.png";
import profilePic from "../assets/profilepic.jpg";


function SideNav ({isOpen, item, handleClose, handleOpenProfile}) {

    console.log(item)

    return (
        <div className={`sideNavWrapper ${isOpen ? "open" : ""}`}>
            <div className="sideNavHeader">

                <div className="backButton">
                    <img className="headerIcons" src={backArrow} alt="backArrow.png" id="backArrow" onClick={() => handleClose(false)} ></img> 
                </div>

                <div className="profileInfo">
                    <img className="SNProfilPic" src={profilePic} alt="profilepic.jpg" id="profileicon2" ></img>
                    {item.username}               

                </div>           
            </div>
            
            <div className="sideNavOptions">
                <div className="profleLink">
                <p onClick={handleOpenProfile}>My Profile</p>
                </div>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default SideNav;