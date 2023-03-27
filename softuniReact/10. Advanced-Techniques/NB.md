Anti-pattern for App component to manage all states due to being the highest in the hierarchy

children prop: 
    export const AuthProvider = ({
        children,
    }) => {
        return(
            <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
                {children}
            </AuthContext.Provider>
        )
    }

    Children is used as a placeholder for the children components that will be wrapped

instead of calling useContext and AuthContext in Header we can make a custom hook, NOT ALWAYS BEST PRACTICE:
    export const useAuthContext = () => {
        const context = useContext(AuthContext);
        return context;
    }

    INSTEAD OF: 
    import { useContext } from "react";
    import { AuthContext } from '../../contexts/AuthContext';


    HAVE ONLY THIS:
    import { useAuthContext } from '../../contexts/AuthContext';
