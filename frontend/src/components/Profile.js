import React, {useState, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

import '../styles/Profile.css';

function Profile({client, currentUser, setCurrentUser}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/auth/', {replace: true});
    //     }
    // }, [currentUser]);

    useEffect(() => {
        client.get(`/api/userprofile/`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if (currentUser) {
        return (
            <div className="profile">
                <h1>Профиль пользователя</h1>
                <div className="user-info">
                    <div className="info-row">
                        <span>Username:</span>
                        <input type="text" value={user.username} disabled/>
                    </div>
                    <div className="info-row">
                        <span>Email:</span>
                        <input type="text" value={user.email} disabled/>
                    </div>
                    <div className="info-row">
                        <span>Role:</span>
                        <input type="text" value={user.role} disabled/>
                    </div>
                </div>
            </div>
        );
    }
    ;
}

export default Profile;