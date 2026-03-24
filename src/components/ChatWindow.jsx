import React, { useState, useEffect, useRef } from 'react';
import '../styles/chatWindow.css';
import { getMessages as getMessagesAPI, getAllUsers as getAllUsersAPI } from '../api/auth';
import MessageItem from './MessageItem';
import { useAuth } from '../context/AuthContext';
import { socket } from '../socket';

function ChatWindow({item}) {
    const { recipientId, recipientName, chatId } = item;
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [users, setUsers] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typingUsers, setTypingUsers] = useState([]);
    const typingTimeoutRef = useRef(null);

    // Fetch messages + join/leave socket room
    useEffect(() => {
        if (!chatId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getMessagesAPI(chatId);
                setMessages(res.data);
            } catch (err) {
                setError("Failed to load messages. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        socket.emit("join-room", chatId);
        return () => {
            socket.emit("leave-room", chatId);
            clearTimeout(typingTimeoutRef.current);
        };
    }, [chatId]);

    // Listen for incoming real-time messages
    useEffect(() => {
        socket.on("new-message", (message) => {
            setMessages(prev => [...prev, message]);
        });
        return () => socket.off("new-message");
    }, []);

    // Fetch all users once (for sender avatars)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUsersAPI();
                const userMap = {};
                res.data.forEach(u => { userMap[u.id] = u; });
                setUsers(userMap);
            } catch (err) {
                // user map unavailable - avatars fall back to placeholder
            }
        };
        fetchUsers();
    }, []);

    // Online users list
    useEffect(() => {
        socket.on("online-users", (onlineList) => {
            setOnlineUsers(onlineList);
        });
        return () => socket.off("online-users");
    }, []);

    // Typing indicators
    useEffect(() => {
        socket.on("user-typing", ({ userId }) => {
            setTypingUsers(prev => prev.includes(userId) ? prev : [...prev, userId]);
        });
        socket.on("user-stop-typing", ({ userId }) => {
            setTypingUsers(prev => prev.filter(id => id !== userId));
        });
        return () => {
            socket.off("user-typing");
            socket.off("user-stop-typing");
        };
    }, []);

    const isRecipientOnline = onlineUsers.includes(recipientId);
    const isRecipientTyping = typingUsers.includes(recipientId);

    // If no chat selected
    if (!chatId) {
        return (
            <div className="chatWindowWrapper">
                <div className="infoBarSection"></div>
                <div className="chatWindowWrapperEmpty">
                    <p>Select a chat to start messaging</p>
                </div>
                <div className="footerSection"></div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        socket.emit("typing", { chatId });
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop-typing", { chatId });
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;
        clearTimeout(typingTimeoutRef.current);
        socket.emit("stop-typing", { chatId });
        socket.emit("send-message", { chatId, content: inputMessage });
        setInputMessage("");
    };

    return (
        <div className="chatWindowWrapper">
            <div className="infoBarSection">
                {recipientName}
                <div className={isRecipientOnline ? "onlineStatus" : "offlineStatus"}>
                    {isRecipientOnline ? "Online" : "last seen recently"}
                </div>
            </div>

            <div className="chatSection">
                {loading && <p className="loadingText">Loading messages...</p>}
                {error && <p className="errorText">{error}</p>}
                {!loading && !error && (
                    <ul>
                        {messages.map(msg => (
                            <MessageItem
                                key={msg.id}
                                item={msg}
                                sender={users[msg.senderId]}
                            />
                        ))}
                    </ul>
                )}
                {isRecipientTyping && (
                    <p className="typingIndicator">{recipientName} is typing...</p>
                )}
            </div>

            <div className="footerSection">
                <form onSubmit={handleSubmit}>
                    <input
                        className="messageInput"
                        type="text"
                        placeholder='Write a message...'
                        value={inputMessage}
                        onChange={handleInputChange}
                    />
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
