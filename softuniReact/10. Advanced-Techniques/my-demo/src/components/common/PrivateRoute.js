// PrivateRoute is with Navigate 
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace /> //replace so that we do not add /login, but replaces with /loign for History API to work
    }

    return (
        <>
            {children}
        </>
    )
};

export default PrivateRoute;
