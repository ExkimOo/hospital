import {useContext} from "react";
import {Context} from "../../context";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const {currentUser} = useContext(Context);
    return (
        currentUser ? <Outlet /> : <Navigate to="auth" />
    )
}

export default PrivateRoute;