//Chatcard.jsx
import React from 'react';
import '../styles/chatCard.css'
import profilePicMock from "../assets/profilepic.jpg";



function ChatCard({onClick, item}) {

    return  (
        <div className="chatCardWrapper" onClick={onClick}>
            <div className="profilPicSection">

                {item.user.profilepic? (
                <img className="CCProfilPic" src={item.user.profilepic} alt="profilepic"></img>
                ): (
                <img className="CCProfilPic" src={profilePicMock} alt="profilepic.jpg"></img>    
                )}
                
            </div>

            <div className="infoSection" >
                {item.user.name}
                
            </div>
            
        </div>
    )
};

export default ChatCard;
0