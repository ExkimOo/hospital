import React, {useEffect} from 'react';
import '../styles/Header.css';
import {useNavigate} from "react-router-dom";

function Header({client, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/auth', {replace: true});
    //     }
    // }, [currentUser]);

    const submitLogout = (e) => {
        e.preventDefault();
        client.post(
            "/api/logout/",
            {withCredentials: true}
        ).then(function (res) {
            setCurrentUser(false);
        });
    }

    return (
        <header className="header">
            <div className="logo">Hospital</div>
            {currentUser && <div className="buttons">
                <form onSubmit={() => {
                    navigate('/profile', {replace: true});
                }}>
                    <button className="profile-button">Profile</button>
                </form>
                <form onSubmit={submitLogout}>
                    <button className="sign-out-button">Log Out</button>
                </form>
            </div>}
        </header>
    );
}

export default Header;
