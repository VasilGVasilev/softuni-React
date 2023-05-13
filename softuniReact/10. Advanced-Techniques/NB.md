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

    But how does it actually work? Remember the pipeline example img. Using children actually creates a pipeline. The children are sematically not the best work, because it is not only what comes after the use of the 'pipeline'. Children are also at the entrance ---export const AuthProvider = ({children})---, then in the RETURN ---AuthContext.Provider>{children}</AuthContext.Provider>---. What is happening is that in App.js when you actually use AuthProvider, you wrap an element and that element enters via the ---export const AuthProvider = ({children})--- of the pipeline, thus, the need to mention children as arguments on component definition.
    It is crucial to understand that children compoments are passed in in declaration by simply putting them inside the parent component <Parent><Child/></Parent>, while in definition we adhere to the functional ways of passing in arguments in brackets ({chidlren})
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
    basically a DECORATOR

    export const withAuth = (Component) => {
        const WrapperComponent = (props) => {
            return <Component {...props} />
        }
        return WrapperComponent;
    }

    see Register.md + HOC alternative in AuthContext.js

    NB - HOC is an outdated concept unpopular in modern React !!!!
    It is applicable where you cannot use hooks only -> there are class components, if the project is only functional components -> custom hooks are enough

useReducer()
    useReducer is very similar to useState, but it lets you move the state update logic from event handlers into a single function outside of your component. THAT  IS ACTUALLY BEST PRACTICE DUE TO COMPONENT BEING RE-RENDERED EVERY TIME, SO RULE OF THUMB - DECLARE REDUCING FUNCTION OUTSIDE OF FUNCTION
    More importantly, useReducer provides us with the ability to update more complex state -> we have games collection that has a comments subcollection, to edit the comments within games we use useReducer

    import { useReducer } from 'react';

    function reducer(state, action) {
        if (action.type === 'incremented_age') {
                return {
                    age: state.age + 1
                };
            }
        throw Error('Unknown action.');
    }

    export default function Counter() {

        const [state, dispatch] = useReducer(reducer, { age: 42 });

        return (
                <>
                    <button onClick={() => {
                        dispatch({ type: 'incremented_age' })
                    }}>
                        Increment age
                    </button>
                    <p>Hello! You are {state.age}.</p>
                </>
            );
    }



    const gameReducer = (state, action) => {
        console.log(state); // []
        console.log(action); // Pesho
        return state;
    }

    const [games, dispatcher] = useReducer(gameReducer, []);

    Thus, state comes from useReducer(null, initialState), action comes from dispatcher(arg)

    Comparison between useState and useReducer, basically, identical:


        setState(state => ...state, newData)

        reducer(state, action) => {
            <!-- state is old state -->
            <!-- action is new value -->
            return action
        }

    The basic pattern updates state to have a new reference automatically. But there are patterns to have detailed control over state management. Action is crucial - action is an object (not obligatory with vanilla React, obligatory object with Redux) that has at the very minium - type of action and values (payload) that come with this type of action as properties (type and payload are conventions):
        const action = {
            type: 'ADD_GAMES',
            payload: resultFromFetch
        } 
    
    Main Advantage -> state modifications are all in one place, easier to read code, also singe responsibility principle 


On children, why do we return directly in PrivateRoute and in a destructured object in AuthProvider?

    AuthProvider

        return(
            <AuthContext.Provider value={{
                user: auth, 
                userLogin, 
                userLogout, 
                isAuthenticated: !!auth.accessToken //!! makes the auth.accessToken a Boolean, if truthy -> false -> true; if falsy -> true -> false, thus, the double !!
            }}>
                {children}
            </AuthContext.Provider>
        )
    
    PrivateRoute

    const PrivateRoute = ({ children }) => {
        const { isAuthenticated } = useAuthContext();

        if (!isAuthenticated) {
            return <Navigate to="/login" replace /> //replace so that we do not add /login, but replaces with /loign for History API to work
        }

        return children
    };

because in the former case we return a component, in the latter not, NB if return a fragment in the latter, we have to pass on children in  curly braces


why does we have to put update of state within update of DB:

            gameService.remove(gameId)
                .then(() => {
                    gameRemove(gameId);
                    navigate('/catalog');
                })

In React, when you update the global state using a state management library like Redux or Context API, any component that depends on that state will automatically be updated with the new state values, regardless of whether it's currently being rendered on the screen or not.

So, if a component on a specific route depends on the global state that you've updated from another component, it will receive the updated state values the next time it's rendered, even if you haven't navigated to that route yet.

This is because React uses a unidirectional data flow, where the state flows from parent components to child components, and any changes to the state trigger re-renders of the affected components. So as long as your component is subscribed to the relevant state updates, it will receive the updated values whenever they change, regardless of the current route.

Thus, even if I navigate to a new route, when I update the global state, all components that use this state get the update and if we have some data manipulation in a child component such as const currentGame = selectGame(gameId); in GameDetails that uses .find() to select one specific game and it is in fact deleted from state, so absent, when we use currentGame, it will be undefined and crash the whole app.

Summary: updating global state, updates all child components and executes the respective data manipulation even if you have navigated to default component.


PrivateGuard - Outlet from react-dom-router allows nested UI to show up when child routes are rendered:

        function Dashboard() {
            return (
                <div>
                    <h1>Dashboard</h1>

                    {/* This element will render either <DashboardMessages> when the URL is
                        "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
                    */}
                    <Outlet />
                </div>
            );
        }

        function App() {
            return (
                <Routes>
                    <Route path="/" element={<Dashboard />}>
                        <Route
                        path="messages"
                        element={<DashboardMessages />}
                        />
                        <Route path="tasks" element={<DashboardTasks />} />
                    </Route>
                </Routes>
            );
        }