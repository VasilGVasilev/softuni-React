import { createContext, useContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(); //export const AuthContext = createContext({user: ''}); - default value so that intellisense suggests what values to expect for future developers

// this component stores and manages auth state only
export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {}); // 'auth' is a hardcoded key

    // why have this abstraction userLogin wrapping setAuth
    // we want encapsualtion -> App has responsibility about auth state management
    // we pass in setAuth to authContext, but we want to pass in limited verions
    // thus, encapuslating in a separate function and we pass in this separate function

    // we use returned from login fetch data to set it in localStorage and component state
    const userLogin = (authData) => {
        setAuth(authData)
    }

    // we use remove data from localStorage and component state
    const userLogout = () => {
        setAuth({})
    }

    return(
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

// Reuse functionality:

// Custom Hook Alternative
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

// HOC Alternative
export const withAuth = (WrappedComponent) => {
    const WrapperComponent = (props) => {
        const context = useContext(AuthContext)
        return <WrappedComponent {...props} auth={context} />
    }
    return WrapperComponent;
}