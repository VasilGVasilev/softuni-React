There are two types of forms - uncontrolled and controlled:

    Uncontrolled 
        (DOM controlls state)
        uncontrolled forms are the standard HTML forms that React does not controlled
        What does React not control tho?
        The state:
                    uncontrolled forms have a state (CONTROLLED BY browser DOM TREE), because when you write info into input field
                    this info is stored somewhere(in this DOM form element) which you can access
                    via const formData = new FormData(e.target) -> BUT this is not React handling, it is DOM manipulation via Event
                    with other words, state is the current value stored in the DOM inputElement Object

                    function App() {
                        const submitHandler = (e) => {
                            e.preventDefault();
                            
                            const formData = new FormData(e.currentTarget);
                            const username = formData.get('username')
                        }
                        return (
                            <div className="App">
                                <header className="App-header">
                                    <form onSubmit={submitHandler}>
                                        <div>
                                            <label htmlFor="username">Username:</label>
                                            <input id="username" type="text" name="username" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password:</label>
                                            <input id="password" type="password" name="password" />
                                        </div>
                                        <div>
                                            <input type="submit" value="Login" />
                                        </div>
                                    </form>
                                </header>
                            </div>
                        );
                    }

        With an uncontrolled component, you often want React to specify the initial value, 
        but leave subsequent updates uncontrolled. To handle this case, you can specify 
        a defaultValue attribute instead of value:
                render() {
                    return (
                        <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                            defaultValue="Bob"          
                            type="text"
                            ref={input} />
                        </label>
                        <input type="submit" value="Submit" />
                        </form>
                    );
                }
        
    Controlled
        (React controlls state)
            Basically, 
                React attaches a mechanism that keeps track of changes in the browser DOM (change event watching every keystroke)
                creates its own state in its component 
                uses special value prop to signify that the changes in the input field are controlled by React
                uses onChange prop to update state 
                change of state triggers re-rendering, so updated state is visualised to user
                NB -> if you only use value prop and do not update the state with onChange, there will be no re-render for the user and input field will appear locked with the initially set value

                    function App() {
                        const [username, setUsername] = useState('');
                        
                        const submitHandler = (e) => {
                            e.preventDefault();
                            
                        }
                        const usernameChangeHandler = (e) => {
                            setUsername(e.target.value) // each change in browser DOM is reflected by updating the React state, so that we have a state of the browser DOM form on our own virtual DOM 
                        }
                        return (
                            <div className="App">
                                <header className="App-header">
                                    <form onSubmit={submitHandler}>
                                        <div>
                                            <label htmlFor="username">Username:</label>
                                            <input 
                                                id="username"
                                                type="text" 
                                                name="username"
                                                value={username} //value shift the controll over the form to React
                                                onChange={usernameChangeHandler} //onChange watches for each keystroke change in borwser DOM
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password:</label>
                                            <input id="password" type="password" name="password" />
                                        </div>
                                        <div>
                                            <input type="submit" value="Login" />
                                        </div>
                                    </form>
                                </header>
                            </div>
                        );
                    }


Updating state based on the previous state:
    If you are using forms, you will want to update current state, based on previous
    since YOU WANT TO REDNER ONLY CHANGES THAT HAVE OCCURRED, NOT THE WHOLE FORM ONCE AGAIN:
        const changeHandler = (e) => {
            setValues(state => ({
                ...state,
                [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
            }));
        };

    so you use updater function -> to take old state and apply changes if they have occurred,
    here, the state before => siginfies the old state and after the =>:
        ...state signifies the unchanged state
        the key:value propert signifies how to change each if change has occurred

            setValues(state => ({
                ...state,
                [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
            })); 
        
        more on [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        e.target.name is the identifier for the specific element
        we put it in [] so that we access the actual property values of the element (to be able to update it)
        we add : after [] -> []: to manipulate the specific values of the very element we targeted with [e.target.name]
        summary: use one property name to identify element and then put it in [] to access the element's other properties
                 take the value of e.target.name and use it as a property name (by putting it in []) like [username]: e.target.value
                 we use the changed by user state via event to identify specific propety name whose props have to change
                
Updating objects and arrays in state

    You can put objects and arrays into state. In React, state is considered read-only, so you should 
    REPLACE IT RATHER THAN MUTATE your existing objects + ADD UPDATED PROPERTY. For example, if you have a form object in 
    state, don’t update it like this:

            // 🚩 Don't mutate an object in state like this:

            form.firstName = 'Taylor';

    Instead, replace the whole object by creating a new one:

            // ✅ Replace state with a new object:

            setForm({
                ...form,
                firstName: 'Taylor'
            });

    The { ...form } spread syntax ensures that the state object is replaced rather than mutated.

    EXAMPLE:
        
            import { useState } from 'react';

            export default function Form() {
            const [form, setForm] = useState({
                email: 'bhepworth@sculpture.com',
            });

            return (
                    <>
                        <label>
                            First name:
                            <input
                            value={form.firstName}
                            onChange={e => {
                                setForm({
                                ...form,
                                firstName: e.target.value
                                });
                            }}
                            />
                        <p>
                            ({form.email})
                        </p>
                    </>
                );
            }

Why use controlled over uncontrolled form?
    the same reason why using React and creating SPA -> dynamic rendering 
        Ex. 
        -> only by checking terms and conditions will allow you to click on register button
        -> if corporate selected -> input EIK; if individual selected -> input EGN

useRef() hook - enables controlling a browser DOM element via reference, BUT this is bad practice -> Good practice is you manipulate virtual DOM and React manipulates browser DOM:
 
        const infoRef = useRef(); // 1) store in value in component

        useEffect(() => { // 3) use useEffect() to keep track of changes to desired states
            if (values.username && values.age) {
                infoRef.current.value = `${values.username} - ${values.age}`;
            }
        }, [values.username, values.age]);

        return(
            <div>
                <label htmlFor="uncontrolled-input">Uncontrolled Input</label>
                <input type="text" name="uncontrolled" id="uncontrolled-input" ref={infoRef} /> // 2) attach to element
            </div>
        )
    Use case: 
        import a video player and make useRef to attach to browser DOM click automatically 1.25 speed of video

    Uses useState vs useRef:
    MAIN difference - useRef does not cause re-render even tho it stores state as useState 
        For useState:

            Allows functional components to have their own state.
            Allows us to update the state inside components.
            It causes components to re-render after state updates.
            Returns the current state.
            Has an updater function that updates the state.

        For useRef:

            Returns an object with a property containing the initial value.
            Doesn't cause a component to re-render when the value or state changes.
            Data is persisted between renders.
            Allows referencing DOM elements.


Side notes:
    two types of submit buttons:
        <input type="submit" value="Login" /> -
        <button type="submit">Login</button> - in form by default type is submit, outside form by default type is button


3:10:35

    Checkbox
    by default checked prop on input type="checkbox" button will:
        if checked by user return tac = 'on' in state
        if unchecked by user return '' in state (empty field)
            <div>
                <label htmlFor="tac">Terms and Conditions:</label>
                <input type="checkbox" name="tac" id="tac" checked={values.tac} onChange={changeHandler}/>
            </div>


    Radio
    on input type="radio" button we need to preselect one radio VIA state and checked prop that reflects on that state:
            <div>
                <label htmlFor="individual-user-type">Individual:</label>
                <input type="radio" name="userType" value="individual" id="individual-user-type" onChange={changeHandler} checked={values.userType == 'individual'} />
                <label htmlFor="corporate-user-type">Corporate:</label>
                <input type="radio" name="userType" value="corporate" id="corporate-user-type" onChange={changeHandler} checked={values.userType == 'corporate'}/>
            </div>
        NB -> each radio has a value that is set in the component element itself (value='individual') 
              onChange prop sets new state coming from e.target.value
              checked prop sets the check on the DOM element by comparing with state
              With Radio The Value That Is In State Comes From The Value Hardcoded In Value prop
              BECAUSE we want to differenatiate what to show depending on individual or corporate EGN or EIK

    Select/Option
    on select/options button we can have pre-selected VIA setting such state:
            <div>
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender" value={values.gender} onChange={changeHandler}>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                </select>
            </div>
    pass an array to select multiple values:
        <select multiple={true} value={['A', 'B', 'C']}

2:26:00

    useCallback() - deals with re-rendering of methods' definitions

