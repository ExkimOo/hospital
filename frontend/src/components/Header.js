import React, {useContext, useEffect} from 'react';
import '../styles/Header.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";


function Header() {
    const navigate = useNavigate();
    const {logout} = useAuth();
    // console.log('header current user', currentUser)
    // console.log(1)

    const submitLogout = (e) => {
        e.preventDefault();
        console.log(1)
        logout(() => navigate('/', {replace: true}));
    };

    return (
        <header className="header">
            <div className="logo">Hospital</div>
            {
                // currentUser &&
                <div className="buttons">
                    <form onSubmit={() => {
                        navigate('/profile', {replace: true});
                    }}>
                        <button className="profile-button">Profile</button>
                    </form>
                    <form onSubmit={() => {
                        navigate('/audit', {replace: true});
                    }}>
                        <button className="profile-button">Audit</button>
                    </form>
                    <form onSubmit={submitLogout}>
                        <button className="sign-out-button">Log Out</button>
                    </form>
                </div>}
        </header>
    );
}

export default Header;
