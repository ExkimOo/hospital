import React, {useContext, useEffect} from 'react';
import '../styles/Header.css';
import {useNavigate} from "react-router-dom";
import {Context} from "../context";

function Header({client}) {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(Context);

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
