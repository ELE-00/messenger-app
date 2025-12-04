//Chatcard.jsx
import React from 'react';
import '../styles/chatCard.css'
import profilePic from "../assets/profilepic.jpg";





function UserCard({item}) {

    console.log(item)

    return  (
        <div className="chatCardWrapper">
            <div className="profilPicSection">
                <img className="CCProfilPic" src={profilePic} alt="profilepic.jpg" id="profileicon2" ></img>
            </div>

            <div className="infoSection" >
                {item.name}
                
            </div>
            
        </div>
    )
};

export default UserCard;
