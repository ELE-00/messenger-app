
//Messenger.jsx
import React, {useState} from 'react';
import Sidebar from '../components/Sidebar.jsx'
import ChatWindow from '../components/ChatWindow.jsx'
import '../styles/messenger.css'
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';

const Messenger = () => {
const {user} = useAuth();

const [openProfile, setOpenProfile] = useState(false);
const [selectedConvo, setSelectedConvo] = useState({
    recipientId: "",
    recipientName: "",
    chatId: ""
});


//Handle getting messages
function onSelectChat(chatId, recipientName, recipientId){
    console.log("Received chat Id: " + chatId)
    console.log("Received recipientId: " + recipientId)
    console.log("Received recipientName: " + recipientName)

    setSelectedConvo({
        recipientId: recipientId,
        recipientName: recipientName,
        chatId: chatId
    })

    
}


    //Profile card
    function handleOpenProfile() {
        setOpenProfile(true)
    }

    function handleCloseProfile() {
        setOpenProfile(false)
    }


    return(
        <div className="bodyWrapper">

            <div className="contentWrapper">
                <div className="">
                    <Sidebar onSelectChat={onSelectChat} handleOpenProfile={handleOpenProfile}/>
                </div>

                <div className="chatWindowWrapper">
                    <ChatWindow item={selectedConvo}/>
                </div>
            </div>

            {/* Profile dialog overlays main UI */}
            {openProfile && (
                <dialog open className="profileDialog">
                <ProfileCard handleCloseProfile={handleCloseProfile}></ProfileCard>  
                </dialog>
            )}
    
        </div>
    );
};


export default Messenger;
