import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../styles/Profile.css';

function Profile({client, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/user-profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const submitLogout = (e) => {
        e.preventDefault();
        client.post(
            "/api/logout/",
            {withCredentials: true}
        ).then(function (res) {
            setCurrentUser(true);
            navigate('/auth/', {replace: true});
        });
    }
    console.log(currentUser)
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
                <form onSubmit={submitLogout}>
                    <button className="logout-button" style={{backgroundColor: 'red'}}>
                        Выйти
                    </button>
                </form>
            </div>
        );
    } else {
        setCurrentUser(true);
        navigate('/auth/', {replace: true});
    }
}

export default Profile;