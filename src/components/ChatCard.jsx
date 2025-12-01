//Chatcard.jsx
import React from 'react';
import '../styles/chatCard.css'
import profilePic from "../assets/profilepic.jpg";



function ChatCard({onClick, item}) {

    return  (
        <div className="chatCardWrapper" onClick={onClick}>
            <div className="profilPicSection">
                <img className="CCProfilPic" src={profilePic} alt="profilepic.jpg" id="profileicon2" ></img>
            </div>

            <div className="infoSection" >
                {item.user.name}
                
            </div>
            
        </div>
    )
};

export default ChatCard;
