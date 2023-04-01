import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "../hoc/AuthProvider";
import Authorize from "./Authorize";
import Profile from "./Profile";
import Schedule from "./Schedule";
import Audit from "./Audit";
import Diagnosis from "./Diagnosis";
import RequireAuth from "../hoc/RequireAuth";
import Layout from './Layout';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Authorize/>}/>
                    <Route path="profile" element={
                        <RequireAuth>
                            <Profile/>
                        </RequireAuth>
                    }/>
                    {/*<Route path="diagnosis" element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <Diagnosis/>*/}
                    {/*    </RequireAuth>*/}
                    {/*}/>*/}
                    {/*<Route path="schedule" element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <Schedule/>*/}
                    {/*    </RequireAuth>*/}
                    {/*}/>*/}
                    {/*<Route path="audit" element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <Audit/>*/}
                    {/*    </RequireAuth>*/}
                    {/*}/>*/}
                    {/*<Route path='*' element={}/>*/}
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
