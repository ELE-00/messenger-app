//ChatWindow.jsx
import React, {useState, useEffect} from 'react';
import '../styles/chatWindow.css'
import {getMessages as getMessagesAPI } from '../api/auth';
import {sendMessage as sendMessageAPI } from '../api/auth';
import MessageItem from './MessageItem';
import { useAuth } from '../context/AuthContext';


function ChatWindow({item}) {
    const  { recipientId, recipientName, chatId } = item;
    const {user} = useAuth();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");


    //fetch messsages
    useEffect(() => {
    const fetchData = async () => {
        const res = await getMessagesAPI(chatId)
        setMessages(res.data);
        console.log(res.data)
    }
        fetchData();
    }, [chatId]);
    

    const handleSubmit = async (e) => {
    e.preventDefault();



    if (!inputMessage.trim()) return;

    console.log("Sending:", inputMessage);

    try{
        const res = await sendMessageAPI(chatId, {
            senderId: user.id,
            recipientId: recipientId,
            content: inputMessage,
        })

     setMessages(prev => [...prev, res.data]);  
    } catch (err) {
        console.log(err)
    }

    setInputMessage(""); 
};



    return (

        <div className="chatWindowWrapper">
            <div className="infoBarSection">{recipientName}</div>

            <div className="chatSection">
                <ul>
                    {messages.map(msg => (
                        <MessageItem item={msg}></MessageItem>
                    ))}
                </ul>
            </div>

            <div className="footerSection">
                <form onSubmit={handleSubmit}>
                <input className="messageInput" type="text" placeholder='Write a message...' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}></input>
                </form>
            </div>    
            
        </div>
    )
}



export default ChatWindow;