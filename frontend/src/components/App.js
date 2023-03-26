import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import Authorize from "./Authorize";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<Authorize />}/>
                    {/*<Route path="/profile" element={}/>*/}
                    {/*<Route path="/room" element={}/>*/}
                    {/*<Route path="/schedule" element={}/>*/}
                    {/*<Route path="/audit" element={}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
