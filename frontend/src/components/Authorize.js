import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/Authorize.css';

const Authorize = ({client, currentUser, setCurrentUser}) => {
    const navigate = useNavigate();

    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/profile/', {replace: true});
    //     }
    // }, [currentUser]);

    useEffect(() => {
        client.get("/api/user/")
            .then(function (res) {
                setCurrentUser(true);
            })
            .catch(function (error) {
                setCurrentUser(false);
            });
    }, []);

    const submitRegistration = (e) => {
        e.preventDefault();
        client.post("/api/register/",
            {
                email: email,
                username: username,
                password: password,
                role: role
            }
        ).then((res) => {
            client.post(
                "/api/login/",
                {
                    email: email,
                    password: password
                }
            ).then(() => {
                setCurrentUser(true);
                navigate('/profile/', {replace: true});
            })
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        client.post(
            "/api/login/",
            {
                email: email,
                password: password
            }
        ).then(function (res) {
            setCurrentUser(true);
            navigate('/profile/', {replace: true})
        });
    }

    const handleSignInClick = () => {
        setIsSignIn(true);
    };

    const handleSignUpClick = () => {
        setIsSignIn(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    if (!currentUser) {
        return (
            <div className="authorize-container">
                <div className="authorize-form">
                    <div className="authorize-options">
                        <div
                            className={`authorize-option ${isSignIn ? 'selected' : ''}`}
                            onClick={handleSignInClick}
                        >
                            SIGN IN
                        </div>
                        <div
                            className={`authorize-option ${!isSignIn ? 'selected' : ''}`}
                            onClick={handleSignUpClick}
                        >
                            SIGN UP
                        </div>
                    </div>
                    {isSignIn ? (
                        <form onSubmit={submitLogin}>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="authorize-input"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="authorize-input"
                            />
                            <button type="submit" className="authorize-button">
                                SIGN IN
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={submitRegistration}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="authorize-input"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="authorize-input"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="authorize-input"
                            />
                            <select value={role} onChange={handleRoleChange} className="authorize-input">
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Patient">Patient</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                            <button type="submit" className="authorize-button">
                                SIGN UP
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    } else {
        // navigate('/profile/', {replace: true});
    }
    ;
};

export default Authorize;