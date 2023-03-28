import {useState} from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import Authorize from "./Authorize";
import Profile from "./Profile";
import Schedule from "./Schedule";
import Audit from "./Audit";
import Header from "./Header";
import '../styles/App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App() {
    const [currentUser, setCurrentUser] = useState(false);

    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<Authorize client={client}
                                                            currentUser={currentUser}
                                                            setCurrentUser={setCurrentUser}/>}/>
                    <Route path="/profile" element={<Profile client={client}
                                                             currentUser={currentUser}
                                                             setCurrentUser={setCurrentUser}/>}/>}/>
                    {/*<Route path="/cabinet" element={<Cabinet />}/>*/}
                    <Route path="/schedule" element={<Schedule />}/>
                    <Route path="/audit" element={<Audit />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
