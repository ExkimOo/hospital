import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import {Context} from "../context";
import Authorize from "./Authorize";
import Profile from "./Profile";
import Schedule from "./Schedule";
import Audit from "./Audit";
import Header from "./Header";
import Diagnosis from "./Diagnosis";
import '../styles/App.css';
import privateRoute from "../utils/routers/privateRoute";
import PrivateRoute from "../utils/routers/privateRoute";

const sessionid = Cookies.get("sessionid");

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App() {
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        client.get(`/api/userprofile/`)
            .then(response => {
                setCurrentUser(true);
            })
            .catch(error => {
                setCurrentUser(false);
            });
    }, [])

    return (
        <BrowserRouter>
            <Context.Provider value={{currentUser, setCurrentUser}}>
                <Header client={client}/>
                <div className="App">
                    <Routes>
                        <Route path="/auth" element={<Authorize client={client}/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/profile" element={<Profile client={client}/>}/>
                            <Route path="/diagnosis" element={<Diagnosis client={client}/>}/>
                            <Route path="/schedule" element={<Schedule client={client}/>}/>
                            <Route path="/audit" element={<Audit client={client}/>}/>
                        </Route>
                    </Routes>
                </div>
            </Context.Provider>
        </BrowserRouter>
    );
}

export default App;
