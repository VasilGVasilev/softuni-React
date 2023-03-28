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
    