//MessageItem.jsx
import React from 'react';
import '../styles/messageItem.css'
import { useAuth } from '../context/AuthContext';
import profilePic from "../assets/profilepic.jpg";



function MessageItem({item}) {

    //Converting date to time only
    const date = new Date(item.createdAt);
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})


    const {user} = useAuth();

    return  (
        <div className="messageItemWrapper">
            <div className="msgProfilPicSection">
                <img className="msgProfilPic" src={profilePic} alt="profilepic.jpg" id="profileicon2" ></img>
            </div>

            <div className={`messageSection ${item.senderId === user.id ? "myMessage" : "otherMessage"}`}>
                <div> {item.content} </div>
                <div className="time"> {timeString} </div>                 
            </div>
        </div>
    )
};


export default MessageItem;
