import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";

const RequireAuth = ({children}) => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        // return <Navigate to='/' replace={true}/>
        return navigate('/', {replace: true})
    }

    return children;
}

export default RequireAuth;