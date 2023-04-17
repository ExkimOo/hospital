import {useNavigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";
import {useEffect} from "react";

const RequireAuth = ({children}) => {
    const {role} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!role) {
            navigate('/', {replace: true})
        }
    }, [role]);

    // if (!role) {
    //     return navigate('/', {replace: true})
    // }

    return children;
}

export default RequireAuth;