
//Messenger.jsx
import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar.jsx'
import ChatWindow from '../components/ChatWindow.jsx'
import '../styles/messenger.css'
import ProfileCard from '../components/ProfileCard';
import NewGroupCard from '../components/NewGroupCard.jsx';
import { useAuth } from '../context/AuthContext';
import {getAllUsers as getAllUsersAPI } from '../api/auth';

const Messenger = () => {
const {user} = useAuth();

const [allUsers, setAllUsers] = useState([]);
const [openProfile, setOpenProfile] = useState(false);
const [newGroupChat, setNewGroupChat] = useState(false);
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

    //Fetch all users 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsersAPI();
                setAllUsers(res.data)
                console.log("All users: ", res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);




    //Profile card
    function handleOpenProfile() {
        setOpenProfile(true)
    }

    function handleCloseProfile() {
        setOpenProfile(false)
    }

    function handleNewGroupChat() {
        setNewGroupChat(true)
    }

    function handleCloseNewGroupForm() {
        setNewGroupChat(false)
    }


    return(
        <div className="bodyWrapper">

            <div className="contentWrapper">
                <div className="">
                    <Sidebar onSelectChat={onSelectChat} handleOpenProfile={handleOpenProfile} handleNewGroupChat={handleNewGroupChat} allUsers={allUsers}/>
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

            {/* Group chat dialog overlays main UI */}
            {newGroupChat && (
                <dialog open className="profileDialog">
                <NewGroupCard handleCloseNewGroupForm={handleCloseNewGroupForm} allUsers={allUsers}></NewGroupCard>  
                </dialog>
            )}
    
        </div>
    );
};


export default Messenger;
