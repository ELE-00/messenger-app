//Sidebar.jsx
import React, {useEffect, useState} from 'react';
import '../styles/sidebar.css'
import { useAuth } from '../context/AuthContext';
import {getConversations as getConversationsAPI } from '../api/auth';
import {createConversation as createConversationAPI } from '../api/auth';
import ChatCard from './ChatCard';
import UserCard from './UserCard';
import newchatIcon from "../assets/newchat.png";
import backArrow from "../assets/backarrow.png";
import optionsIcon from "../assets/options.png";
import SideNav from './sideNav';


function Sidebar({onSelectChat, handleOpenProfile, handleNewGroupChat, allUsers}) {

    const {user} = useAuth();
    const [newChatMode, setNewChatMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [conversations, setConverations] = useState([]);


    //Fetch Conversations 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getConversationsAPI(user);
                setConverations(res.data)
            } catch (err) {
                // fetch failed - sidebar shows empty
            }
        }

        fetchData();
    }, []);

    //Filtering other participant
    const sidebarPeople = conversations.map(convo => {
        if (convo.type === "GROUP") {
            // For group chats, use conversation info
            return {
                conversationId: convo.id,
                isGroup: true,
                name: convo.name,
                avatar: convo.avatar
            };
        } else {
            // Direct chat: find the other participant
            const other = convo.participants.find(p => p.userId !== user.id);
            return {
                conversationId: convo.id,
                isGroup: false,
                user: other.user
            };
        }
    });




    //Dropdown menu
    function handleSideNavClose() {
        setOpen(false)
    }


    if(open){
        return (
            <div className="sidebarWrapper">
                <SideNav key={user.id} item={user} isOpen={open} handleSideNavClose={handleSideNavClose} handleOpenProfile={handleOpenProfile} handleNewGroupChat={handleNewGroupChat}></SideNav>  
            </div>
        )
    }


    //Create new conversation
    async function handleStartChat(targetUserId) {
        const exists = sidebarPeople.some(p => p.user.id === targetUserId);
        const recipientUser = allUsers.find(p => p.id === targetUserId);

        // CASE 1: Conversation exists
        if (exists) {
            const convo = conversations.find(c =>
                c.participants.some(p => p.userId === targetUserId)
            );

            onSelectChat(convo.id, recipientUser.name, targetUserId);
            setNewChatMode(false);
            return;
        }

        // CASE 2: Create a new one
        const formData = new FormData();
        formData.append("participants", JSON.stringify([targetUserId]));
        const newCovo = await createConversationAPI(formData);
        const res = await getConversationsAPI(user);
        setConverations(res.data);

        onSelectChat(newCovo.data.conversationId, recipientUser.name, targetUserId);
        setNewChatMode(false);
    }





    return (
        <div className="sidebarWrapper">

            
            <div className="headerSection">
                {newChatMode ? (
                    <img className="headerIcons" src={backArrow} alt="backArrow.png" id="backArrow" onClick={() => setNewChatMode(false)} ></img>  
                ) : (
                    <img className="headerIcons" src={optionsIcon} alt="options.png" id="optionsIcon" onClick={() => setOpen(true)}></img>                      
                )}   

                {newChatMode? (
                    <p>Create new chat</p>
                ) : (
                    <p>Whispr</p>    
                )}


                <img className="headerIcons" src={newchatIcon} alt="newchat.png" id="newchatIcon" onClick={() => setNewChatMode(true)}></img>    

            </div>

                <div className="contentSection">
                    {newChatMode ? (
                        // Show list of all users to start a new chat
                        allUsers.map(user => (
                        <UserCard key={user.id} item={user} onClick={() => handleStartChat(user.id)} />                       
                        ))
                    ) : (
                        // Show list of existing conversations
                        sidebarPeople.map(item => (
                        <ChatCard
                            key={item.isGroup ? item.conversationId : item.user.id}
                            item={item}
                            onClick={() =>
                            onSelectChat(
                                item.conversationId,
                                item.isGroup ? item.name : item.user.name,
                                item.isGroup ? null : item.user.id
                            )
                            }
                        />
                        ))                   
                    )}
                </div>
        </div>
    )
}



export default Sidebar;