//api/auth.js

import axiosClient from './axiosClient.js';

export const signup = async (userData) => {
    return axiosClient.post("/api/auth/signup", userData);
};

export const login = async (userData) => {
    return axiosClient.post("/api/auth/login", userData);
};

export const getConversations = async (userData) => {
    return axiosClient.get("/api/conversations", userData);
}

export const createConversation = async (userData) => {
    return axiosClient.post("/api/conversations", userData);
}

export const getMessages = async (chatId) => {
    return axiosClient.get(`/api/conversations/${chatId}`);
}

export const sendMessage = async (chatId, data) => {
    return axiosClient.post(`/api/conversations/${chatId}`, data);
}

export const getAllUsers = async () => {
    return axiosClient.get("/api/conversations/users");
}

export const getUserData = async (userId) => {
    return axiosClient.get("/api/conversations/user", userId);
}
