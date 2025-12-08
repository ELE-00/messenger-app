//App.jsx
import React, {useEffect} from 'react';
import { Outlet } from "react-router-dom";
import {socket} from './socket.js';
import { useAuth } from './context/AuthContext';



export default function App() {
    const {user} = useAuth();

    useEffect(() => {
        if(user) {
            socket.connect();
            socket.emit("user-online", user.id);
        };
    }, [user])

    return (     
        <div className="contentSection"> 
            <Outlet />
        </div>
    )
}



