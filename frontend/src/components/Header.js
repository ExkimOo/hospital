import React, {useContext, useEffect} from 'react';
import '../styles/Header.css';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";


function Header() {
    const navigate = useNavigate();
    const {role, logout} = useAuth();

    const submitLogout = (e) => {
        e.preventDefault();
        logout(() => navigate('/', {replace: true}));
    };

    return (
        <header className="header">
            <div className="logo">Hospital</div>
            <div className="buttons">
                {!role &&
                    <Link to='/'>
                        <button className="profile-button">Auth</button>
                    </Link>
                }
                {role &&
                    <Link to='/profile'>
                        <button className="profile-button">Profile</button>
                    </Link>
                }
                <Link to='/schedule'>
                    <button className="profile-button">Schedule</button>
                </Link>
                {role === 'Admin' && role &&
                    <Link to='/audit'>
                        <button className="profile-button">Audit</button>
                    </Link>
                }
                {role &&
                    <Link to='/diagnosis'>
                        <button className="profile-button">Diagnosis</button>
                    </Link>
                }
                {role &&
                    <Link to='/'>
                        <button className="sign-out-button" type='button' onClick={submitLogout}>Log Out</button>
                    </Link>
                }
            </div>
        </header>
    );
}

export default Header;
