
//AuthContext.jsx
import React, {createContext, useContext, useState, useEffect} from "react";
import {socket} from "../socket.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    //LOGIN function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        socket.auth = { token: userData.token };
        socket.connect();
        socket.emit("user-online");
    };

    //LOGOUT function
    const logout = () => {
        if(user) {
            socket.emit("user-offline");
        }

        socket.disconnect();

        setUser(null)
        localStorage.removeItem("user")
    }


    // On mount: reconnect socket if user is already logged in (persisted session)
    useEffect(() => {
        if (user) {
            socket.auth = { token: user.token };
            socket.connect();
            socket.emit("user-online");
        }
    }, []);



    return (
        <AuthContext.Provider value = {{user, login, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
