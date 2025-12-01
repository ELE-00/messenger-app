
//AuthContext.jsx

import React, { Children } from "react";
import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
    // only for development, remove for production
    if (import.meta.env.DEV) {
        return {
        id: 1,
        username: "ele",
        token: "dev-token"
        };
    }
    return null;
    });
        

    //Persist login
    useEffect(() => {
        const saved = localStorage.getItem("user");
        if(saved) setUser(JSON.parse(saved));    
    }, []);


    useEffect (() => {
        if(user) localStorage.setItem("user", JSON.stringify(user)) 
    }, [user]);



    return (
        <AuthContext.Provider value = {{user, setUser}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

