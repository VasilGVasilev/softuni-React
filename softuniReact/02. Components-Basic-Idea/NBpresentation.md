React component
    is a function that returns a React element, only one element, 
    it may be a wrapper element that has others inside, but still only one

ident using spaces 
    -> validate with Alt + Shift + f

stylisation
    each component has a specific css in a dir that relates to that component

architecture 
    not a good idea to have a middelware with components that with set in App.js


fragments
    <Fragment>, often used via <>...</> syntax, lets you group elements without a wrapper node
    unlike, a <div></div> that will show on the DOM as an element
        <>
            <OneChild />
            <AnotherChild />
        </>

React philosophy is declarative functional components
    so in practice there is full transition to it from imperative class components (see Angular)

    declarative is calling the pizza place for a pizza
    impertative is creating your own pizza step by step

    So what are the declarative functional component rules:

    - Difference between pure and impure functions in JS?
        A pure function is a function that only manipulates its input variables and does not have any side effects.
        An impure function has side effects, like changing state or vars outside its scope, also may return different outputs

            let globalCounter = 0;

            function impureFunction() {
            globalCounter++;
            return globalCounter;
            }

            console.log(impureFunction()); // 1
            console.log(impureFunction()); // 2
            console.log(impureFunction()); // 3
    
    - higher-order functions and function composition are techniques used to make code more resuable and modular
        these often create impure functions, tho:

        .map():
            function map(fn, array) {
                let newArray = []
                for (let i = 0; i < array.length; i++) {
                    newArray.push(fn(array[i]))
                }
                return newArray
            }    

        currying:
            instead of:

                function sum(a, b, c) {
                    return a + b + c;
                }
                sum(1,2,3); // 6

            Currying:
                function sum(a) {
                    return (b) => {
                        return (c) => {
                            return a + b + c;
                        }
                    }
                }
                sum(1)(2)(3); //6

            you can also separate it like this:
                const sum1 = sum(1);
                const sum2 = sum1(2);
                const result = sum2(3);
                console.log(result); // 6


            EXPLAINED:

            const add = x => y => x + y;
            const addTwo = add(2)
            addTwo(3) // 5

            currying uses closures under the hood:
                when you call 'const addTwo = add(2)', JS creates a closure for the 
                returned function 'y => x + y' that captures the value of x as 2

                A closure is a function that has access to variables in its enclosing scope, 
                even after the outer function has returned, those are stored in heap. 

                In this case, the inner function y => x + y has access to the variable x 
                which is 2, even after the outer function x => y => x + y has returned.

                When you call 'addTwo(3)', it returns '2 + 3' which is '5'. 
                The function looks up the value of 'x' in the closure, which is 2, 
                and applies the operation 'x + y' with the argument '3' passed to 'addTwo(3)', 
                resulting in '2 + 3 = 5'

            Higher-order functions also use closures under the hood, in fact currying is the name of the method to access variables in a nested composition of higher-order function, but what we have with higher-order functions is a function that returns another function and this other function has access to its surrounding lexical environment, namely the function that returned the other function



React functional component is with capital letter due to convention of older class component with capital

React main advantage 
    is the optimised and effective way to manipulate elements in virtual DOM that are then very precisely 
    transfered to the actual DOM without actually re-rendering whole DOM tree in browser

Props get passed to the component -> like function params
State is managed within the component -> like local variables

Props can only be given from parent to child directly only, also props are immuatble, cannot change props inside a component
    <Header title='Library' />
    const reactElement = <h1>{props.title}</h1>

Children is an alternative way to pass in data from parent to child
    <Header>Library</Header>
    const reactElement = <h1>{props.children}</h1>

React not only visualizes, but also manages state and data:
Rendering happens initially and when we change state -> re-render happens
    in class -> render() and if changes -> componentDidMount and other methods
    in functions -> return is rendered and if chnages -> hooks setState(for local to component values) (and setEffect for externals API, DB, etc)

1:52:00

STATE

React.useState uses closure under the hood to store initial state, so [state, setState()] are in closure and the function updates the state
    the state can be anything serialised -> let [state, setState] = useState({canBeObjectToo})

Passing in number via props -> <Timer start={1} /> {here, it is JSland}

If parent element changes something via props -> App changes 1 to 2 in <Timer start={1} />, the change will tigger re-rendering

Special UPDATER FUNCTION for updating state 
    Use: 
        We want to update the state on each method trigger!
    Definition: 
        It must be pure, should take the pending state as its only argument, 
        and should return the next state. React will put your updater function 
        in a queue and re-render your component.

    Clicker has:

        const clickHandler = (e) => {
            setClicks(oldClicks => oldClicks + 1);
        }

            why not:
            
            const clickHandler = (e) => {
                setClicks(clicks + 1);
            }

        Because -> race conditions -> if eventHandler function clickHandler is so fast click state is still not updated

        Suppose the age is 42. This handler calls setAge(age + 1) three times:

            function handleClick() {
                setAge(age + 1); // setAge(42 + 1)
                setAge(age + 1); // setAge(42 + 1)
                setAge(age + 1); // setAge(42 + 1)
            }
        
        However, after one click, age will only be 43 rather than 45! 
        This is because CALLING THE SET FUNCTION DOES NOT UPDATE the age STATE variable IN THE ALREADY RUNNING CODE.
        To solve this problem, you may pass an UPDATER FUNCTION into setAge:

            function handleClick() {
                setAge(a => a + 1); // setAge(42 => 43)
                setAge(a => a + 1); // setAge(43 => 44)
                setAge(a => a + 1); // setAge(44 => 45)
            }
        
        React puts your updater functions in a queue. 
        Then, during the next render, it will call them in the same order:

            1. a => a + 1 will receive 42 as the pending state and return 43 as the next state.
            2. a => a + 1 will receive 43 as the pending state and return 44 as the next state.
            3. a => a + 1 will receive 44 as the pending state and return 45 as the next state.


Js is a library, not a framework, it provides a few solutions for better code writing when
making UI dynamic, or more efficient DOM manipulation, but it does not become dogmatic with
fixed rules and configs for the whole set up of your dev env

If, else is a statment
Ternary operator is an expression
see ternaryOperatorExplained
Why do we choose ternary over if in Clicker.js -> {} inside we can write only JS expressions, not statements

1:00:00

catch undefined
    // useState(props.start || 0) to catch if props is undefined
typical toggle
    // setHighlighted(state => !state)

    
setState is a closure under the hood:
    How is it that handle functions can call setState function of useState within themselves without passing them as arguments
        import { useState } from 'react';

        export default function Counter() {
            const [count, setCount] = useState(0);

            function handleClick() {
                setCount(count + 1);
            }

            return (
                <button onClick={handleClick}>
                You pressed me {count} times
                </button>
            );
        }
    Counter creates a closure, or a combination of a function and a lexical environment,
    within which that function was declared, thus, here, the inner handleClick function has
    access to the outer or enclosing functional variables such as count and setCount,
    setCount is a function stored in the variable setCount, making it first-class function.

GraphQL -> solves lack of typisation if Back-End and React