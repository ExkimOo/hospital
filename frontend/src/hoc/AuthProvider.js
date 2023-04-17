import {createContext, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [role, setRole] = useState(null);

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });

    const register = (newUser, cb) => {
        client.post("/api/register/",
            {
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
                role: newUser.role
            }
        ).then((response) => {
            client.post(
                "/api/login/",
                {
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role
                }
            ).then(function (response) {
                client.get(`/api/userprofile/`)
                    .then(response => {
                        setRole(response.data.role);
                        cb();
                    });
            });
        })
    };

    const login = (newUser, cb) => {
        client.post(
            "/api/login/",
            {
                email: newUser.email,
                password: newUser.password
            }
        ).then(function (response) {
            client.get(`/api/userprofile/`)
                .then(response => {
                    setRole(response.data.role);
                    cb();
                });
        });
    };

    const logout = (cb) => {
        client.post(
            "/api/logout/",
            {withCredentials: true}
        ).then(function (res) {
            setRole(null);
            cb();
        });
    };

    const value = {role, client, register, login, logout};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}