//profilecard.jsx
import React, {useEffect, useState} from 'react';
import '../styles/newgroupchat.css'
import profilePicMock from "../assets/profilepic.jpg";
import {createConversation as createConversationAPI } from '../api/auth';
import { uploadProfilePic } from '../api/auth';
import UserCard from './UserCard';
import { useAuth } from '../context/AuthContext';

function NewGroupCard ({handleCloseNewGroupForm, allUsers}) {

    const {user} = useAuth();


    const [formData, setFormData] = useState({
        groupName:"",
        groupprofilepic: null,
        participants: [user.id]
    });


    function handleAddUser(userId) {
        setFormData(prev => {
            if(prev.participants.includes(userId)) {
            return prev;
            }
            return {
                ...prev,
                participants: [...prev.participants, userId]
            };
        });    
    }

    function handleRemoveUser(userId) {
        setFormData(prev => ({
                ...prev,
                participants: prev.participants.filter(id => id !== userId)
        }));    
    }




    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }



const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
        const form = new FormData();
        form.append("groupName", formData.groupName);
        form.append("participants", JSON.stringify(formData.participants)); // stringify for API
        if (formData.groupprofilepic) {
            form.append("groupprofilepic", formData.groupprofilepic); // file object
        }

        const res = await createConversationAPI(form, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        // Optionally reset form
        setFormData({
            groupName: "",
            groupprofilepic: null,
            participants: []
        });

    } catch (err) {
        // creation failed
    }
    handleCloseNewGroupForm();
    
};

    // Handle file input
    const handleNGCFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData(prev => ({ ...prev, groupprofilepic: file }));
    };



    return (
        <div className="NGCWrapper">
            <div className="NGCdialogHeader">

                <div className="NGCProfilePicSection">
                    <img className="NGCProfilPic" src={profilePicMock} alt="profilepic.jpg"></img>    

                    <input
                        type="file"
                        id="fileInput"
                        name="groupprofilepic"
                        style={{ display: "none" }}
                        onChange={handleNGCFileUpload}
                    />

                    <button
                        type="button"
                        className="profileEditBtn"
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        Upload
                    </button>   
                </div>

                <form className="NGCform">
                    <label className="groupName">Group name:</label>
                    <input className="inputField"  type="text" name="groupName" value={formData.groupName} onChange={handleChange}></input>     
                </form>

            </div>

            <div className="participantsSection">

                <div className="selectedParticipants">
                    {formData.participants.map(userId => {
                        const user = allUsers.find(u => u.id === userId);
                        return <div key={userId} className='userTag' onClick={() => handleRemoveUser(user.id)}>{user?.name || "Unkown"}</div>;
                    })}
                </div>
                
                <div className='displayAllUsers'>
                    {allUsers.map(user => (
                        <UserCard key={user.id} item={user} onClick={() => handleAddUser(user.id)}/>                       
                    ))}
                </div>
            </div>  

            <div className="formBtn">
                <button className="bioBtn" type="Submit" onClick={handleCreateGroup}>Create</button>  
                <button className="bioBtn" onClick={handleCloseNewGroupForm}>Close</button>   
            </div>


        </div>
    )
}

export default NewGroupCard;