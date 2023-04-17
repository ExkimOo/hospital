import React, {useState, useEffect} from 'react';
import {useAuth} from "../hook/useAuth";
import '../styles/Profile.css';

function Profile() {
    const [user, setUser] = useState({});
    const {client} = useAuth();

    useEffect(() => {
        client.get(`/api/userprofile/`)
            .then(response => {
                setUser(response.data);
            });
    }, []);

    return (
        <div className="profile">
            <h1>User Profile</h1>
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

export default Profile;