//MessageItem.jsx
import React, {useEffect, useState} from 'react';
import '../styles/messageItem.css'
import { useAuth } from '../context/AuthContext';
import profilePicMock from "../assets/profilepic.jpg";
import {getUserData as getUserDataAPI } from '../api/auth';


function MessageItem({item, sender}) {


    //Converting date to time only
    const date = new Date(item.createdAt);
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})


    const {user} = useAuth();

    return  (
        <div className="messageItemWrapper">
            <div className="msgProfilPicSection">
                <img 
                    className="msgProfilPic" 
                    src={sender?.profilepic || profilePicMock} 
                    alt="profilepic" 
                />
            </div>

            <div className={`messageSection ${item.senderId === user.id ? "myMessage" : "otherMessage"}`}>
                <div> {item.content} </div>
                <div className="time"> {timeString} </div>                 
            </div>
        </div>
    )
};


export default MessageItem;
