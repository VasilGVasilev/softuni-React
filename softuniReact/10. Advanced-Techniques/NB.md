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