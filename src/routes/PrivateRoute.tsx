import {Navigate} from 'react-router-dom';
import {ReactNode} from 'react';
import {UserAuth} from '../context/AuthContext.tsx';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const {currentUser} = UserAuth();
    if(!currentUser) {
        return  <Navigate to = "/" replace = {true} />
    }
    return children
};
export default PrivateRoute;
