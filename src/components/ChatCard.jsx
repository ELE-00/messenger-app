//Chatcard.jsx
import React from 'react';
import '../styles/chatCard.css'
import profilePicMock from "../assets/profilepic.jpg";



function ChatCard({ onClick, item }) {
  return (
    <div className="chatCardWrapper" onClick={onClick}>
      <div className="profilPicSection">
        {item.isGroup ? (
          <img
            className="CCProfilPic"
            src={item.avatar || profilePicMock}
            alt="group avatar"
          />
        ) : (
          <img
            className="CCProfilPic"
            src={item.user.profilepic || profilePicMock}
            alt="profilepic"
          />
        )}
      </div>

      <div className="infoSection">
        {item.isGroup ? item.name : item.user.name}
      </div>
    </div>
  );
}


export default ChatCard;
