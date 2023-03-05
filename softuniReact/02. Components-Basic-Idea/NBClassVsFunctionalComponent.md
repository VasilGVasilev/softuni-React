on the class components vs function components (state in particular):

    How long the component is attached to the DOM:
        in class -> lifecycle methods
        in function -> hooks: useEffect()
        BUT hooks are not a lifecycle alternative, it is much more: only one hook integrates lifecycle method logic, but there is an abundance of hooks

    - class components do not have hooks, rather lifecycle methods:
        render() <------ obligatory
        componentDidMount()   
        componentDidUpdate()
        componentWillUnmount()
        shouldComponentUpdate()
        static getDerivedStateFromProps()
        getSnapshotBeforeUpdate()

    - function components depend on hooks:
        import React, { useState } from 'react';

        function Example(){
            const [count, setCount] = useState(0);
            return()
        }



The now somewhat outdated but still official docs of React prompts the use of
class components, particularly API Reference>React.Component.
This was due to the lifecycle methods about mounting, updating, mounting and error handling
Most of which now is achieved via hooks, introduced in React v16.8 https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/
It all goes down to the fact that JS is very reliant on first class functions,
thus, making React closer to this notion is natural.
Functional components have much cleaner syntax than Class components https://twitter.com/threepointone/status/1056594421079261185
Functional components can be statefull, too, using hooks.
Class components impose the use of render() method. 

useState() - React provides a way to Hook into the global state without the class lifecycle methods for updating the global and local state of your applications.

simple example of 'from class components to hooks' https://circleci.com/blog/class-components-to-react-hooks/?utm_source=google&utm_medium=sem&utm_campaign=sem-google-dg--emea-en-dsa-maxConv-auth-brand&utm_term=s_-_c__dsa_&utm_content=&gclid=CjwKCAiA5sieBhBnEiwAR9oh2mGWB8P5EohbURNNhpbBzyKcrKK5hAOhn0ItGQUhnZMnMMYxrxWNFxoCGR8QAvD_BwE

see NB1 in officialReactWebsite/mainConcepts for how class components keep state

great article on functional component + hooks having statefullness,
useEffect():
https://medium.com/@t93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad


after useState(), but before useEffect():

        const Songs = props => {
            const [songs, setSongs] = useState([])    
            fetch(url)
                .then(resp => resp.json())
                .then(data => this.setState()    
                return()
        }

    BUT SIDE EFFECTs:
    - On every re-render of <Songs />, a HTTP request will be sent which is unlikely to be wanted.
    - The state will be reset by the fetch.
    - An infinite loop is executed as setSongs() will execute a re-render which leads to a fetch each time.

    SOLUTION FOR SIDE EFFECTs: useEffect() is to be used for side-effects executed in the render cycle.

        const Songs = props => {
            const [songs, setSongs] = useState([])   
            useEffect(() => {
                fetch(url)
                .then(resp => resp.json())
                .then(data => this.setState()
                })   
            return()
        }

    HERE, useEffect() is executed after every render cycle (both the render and every re-render)

    To prevent infinite loop side effect, a second argument is called:

        useEffect(() => {
            fetch(url)
            .then(resp => resp.json())
            .then(data => this.setState()
            }, [])

    The first argument expected by the useEffect Hook, is a callback function where you write the code to 
    be executed. The second is an array [] called a dependency array. 
    If the array is omitted, the callback function will run every time the code changes. ---> infinite fetch render loop 
    If the array is empty, the callback function will run once.  ---> like  componentDidMount()
    If there is a value provided, the callback function will run each time the value changes. ---> like componentDidUpdate()
    

BUT what is happening here, what causes the side-effects -> a fetch and fetch is an external to React operation
So, useEffect() helps you handle things that are outside the realm of React such as API calls, asynchronous events, and other side effects.
NB In effect, plays the role of controlling the lifecycle of the React app as did componentDidMount() did!
However, useEffect does not replicate the mental model of lifecycle, rather synchronization
see https://twitter.com/dan_abramov/status/1157250198659354624
 reply to the tweet by Ryan Florance:
 The question is not "when does this effect run" rather, "with which state does this effect synchronize with":
    useEffect(fn) // all state
    useEffect(fn, []) // no state
    useEffect(fn, [these states])

Advantages of Hooks

    Hooks don’t need the this to bind the functions for the click events, and also access values in the component or global states.
    Hooks make code cleaner and easy to read and test.
    Hooks offer more flexibility and they can be reused, especially custom ones in multiple components.
    With Hooks, you do not need to use lifecycle methods. Side effects can be handled by a single function.

Disadvantages of Hooks

    It can be a challenge to get started with Hooks, especially for a new developer.
    Every time the state changes, the component re-renders unless you use other Hooks to prevent this.


full example with useEffect():

    import { useState, useEffect } from "react";

    export function useCounter() {
        const [count, setValue] = useState(0);
        const [isEven, setIsEven] = useState(false);

        useEffect(() => {
            if (count % 2 === 0) {
            setIsEven(true);
            } else {
            setIsEven(false);
            }
        }, [count]);

        const handleIncrement = () => {
            setValue(count + 1);
        };
        const handleDecrement = () => {
            setValue(count - 1);
        };

        return [count, isEven, handleIncrement, handleDecrement];
    }

The callback function inside the useEffect() hook sets 'isEven' to be false or true and it also uses 'count' in
the dependency array to ensure that every time 'count' changes the function component useCounter will run.
What Dan Abramov means by saying that the mental model for useEffect() is synchronisation not lifecycles is:
useEffect() does not actively 'watch' for changes, after rendering finishes, useEffect will check the list of
dependency values against the values from the last render, and will call your effect function if any one of them has changed.
Thus, focus is not on entire application rather on the list of dependencies, lack of such does not alter the initial idea.
