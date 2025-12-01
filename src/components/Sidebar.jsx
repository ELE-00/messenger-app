//Sidebar.jsx
import React, {useEffect, useState} from 'react';
import '../styles/sidebar.css'
import { useAuth } from '../context/AuthContext';
import {getConversations as getConversationsAPI } from '../api/auth';
import {getAllUsers as getAllUsersAPI } from '../api/auth';
import ChatCard from './ChatCard';
import UserCard from './UserCard';
import newchatIcon from "../assets/newchat.png";
import backArrow from "../assets/backarrow.png";
import optionsIcon from "../assets/options.png";
import SideNav from './sideNav';


function Sidebar({onSelectChat, handleOpenProfile}) {

    const {user} = useAuth();
    const [newChatMode, setNewChatMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [conversations, setConverations] = useState([]);


    //Fetch Conversations 
    useEffect(() => {
        const fetchData = async () => {
            console.log("Logged in user: " + user.id)
            try {
                const res = await getConversationsAPI(user);
                setConverations(res.data)
                console.log(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, []);

    //Filtering other participant
    const sidebarPeople = conversations.map(convo => {
        const other = convo.participants.find(p => p.userId !== user.id);

        return {
            conversationId: convo.id,
            user: other.user,
        }
    });


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



    //Dropdown menu
    function handleClose() {
        setOpen(false)
    }


    if(open){
        return (
            <div className="sidebarWrapper">
                <SideNav key={user.id} item={user} isOpen={open} handleClose={handleClose} handleOpenProfile={handleOpenProfile}></SideNav>  
            </div>
        )
    }

    return (
        <div className="sidebarWrapper">

            
            <div className="headerSection">
                {newChatMode ? (
                    <img className="headerIcons" src={backArrow} alt="backArrow.png" id="backArrow" onClick={() => setNewChatMode(false)} ></img>  
                ) : (
                    <img className="headerIcons" src={optionsIcon} alt="options.png" id="optionsIcon" onClick={() => setOpen(true)}></img>                      
                )}   

                <p>Messenger</p>

                <img className="headerIcons" src={newchatIcon} alt="newchat.png" id="newchatIcon" onClick={() => setNewChatMode(true)}></img>    

            </div>

            <div className="contentSection">
                {newChatMode ? (
                        //Show list of all users to start a new chat
                        allUsers.map(user => (
                            <UserCard key={user.id} item={user}/>                       
                        ))
                    ) : (
                        //Show list of existing conversations
                        sidebarPeople.map(item => (
                            <ChatCard key={item.user.id} item={item} onClick={() => onSelectChat(item.conversationId, item.user.name, item.user.id)}/>                       
                        ))                   
                    )
                }

            </div>
        </div>
    )
}



export default Sidebar;