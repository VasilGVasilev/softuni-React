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

HOC - function that takes a component and returns a new component, the above hook useAuthContext is actually an alterantive to this HOC, it solves the same problem:
    'with' is a rule like use for custom hooks
    HOC is a function that: 
    - accepts a reference to a Component (with capital C so that React knows it is a component) 
    - creates a new WrapperComponent that when executed
    - returns the initially accepted Component

    export const withAuth = (Component) => {
        const WrapperComponent = (props) => {
            return <Component {...props} />
        }
        return WrapperComponent;
    }

    see Register.md + HOC alternative in AuthContext.js

    NB - HOC is an outdated concept unpopular in modern React !!!!