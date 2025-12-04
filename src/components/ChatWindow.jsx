import React, {useState, useEffect} from 'react';
import '../styles/chatWindow.css';
import { getMessages as getMessagesAPI, getAllUsers as getAllUsersAPI, sendMessage as sendMessageAPI } from '../api/auth';
import MessageItem from './MessageItem';
import { useAuth } from '../context/AuthContext';

function ChatWindow({item}) {
    const { recipientId, recipientName, chatId } = item;
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [users, setUsers] = useState({}); // store all users in a map { id: user }

    // Fetch messages
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMessagesAPI(chatId);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [chatId]);

    // Fetch all users once
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUsersAPI();
                // Convert array to object for quick lookup by ID
                const userMap = {};
                res.data.forEach(u => {
                    userMap[u.id] = u;
                });
                setUsers(userMap);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputMessage.trim()) return;

        try {
            const res = await sendMessageAPI(chatId, {
                senderId: user.id,
                recipientId,
                content: inputMessage
            });
            // Add new message to state
            setMessages(prev => [...prev, res.data]);
        } catch (err) {
            console.log(err);
        }

        setInputMessage("");
    };

    return (
        <div className="chatWindowWrapper">
            <div className="infoBarSection">{recipientName}</div>

            <div className="chatSection">
                <ul>
                    {messages.map(msg => (
                        <MessageItem 
                            key={msg.id} 
                            item={msg} 
                            sender={users[msg.senderId]} // pass the sender object
                        />
                    ))}
                </ul>
            </div>

            <div className="footerSection">
                <form onSubmit={handleSubmit}>
                    <input 
                        className="messageInput" 
                        type="text" 
                        placeholder='Write a message...' 
                        value={inputMessage} 
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                </form>
            </div>    
        </div>
    );
}

export default ChatWindow;
