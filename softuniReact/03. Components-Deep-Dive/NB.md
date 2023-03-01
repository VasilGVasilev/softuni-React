About Keys and Lists
    React vDOM optimises the DOM very efficiently and if
    we attach <li>s to a <ul> using a for loop, when vDOM transfer
    info to DOM, it will lose this capability of specific update,
    no entire re-render.
    That is why we use keys that React uses to map elements/nodes onto
    the vDOM and if necessary update just the specific <li> via its
    specific key.

    
    React understands arrays, even if we did not have <li>s, React will understand 
    the array made via .map() and render it as a list

    each key has to be unique but just in comparison to other siblings in list


catch undefined
    // useState(props.start || 0) to catch if props is undefined
typical toggle
    // setHighlighted(state => !state)


useEffect():
    How long the component is attached to the DOM:
        in class -> lifecycle methods
        in function -> hooks: useEffect()

    Example: when we have to render a component, we want the data that comes via this component's useEffect() to be rendered within that very component

2:44:50

useEffect():
    see my-demos/useEffect
    useEffect(setup, dependencies?)
    the hook has:
        setup, a function that is executed
        dependencies, an array that show which dependencies are to be executed
            there are three cases:

            - no dependency -> useEffect executes each render:
                useEffect(()=>{
                    console.log('render')
                })

            - empty dependency -> useEffect executes once on initial render, so to speak it mounts:
                useEffect(()=>{
                    console.log('render')
                }, [])

            - specific dependency -> useEffect executes at each change of state of the specified dependency:
                useEffect(()=>{
                    console.log('render')
                })
    USE CASE:

        the last use case is prevalent, because, by setting an array after callback function,
        we MOUNT useEffect() and it then 'watches' for changes of state of the listed states/dependencies

    React Beta definition:
        useEffect(setup, dependencies?)
            - setup: The function with your Effect’s logic. When your component is first added to the DOM, React will run your setup function.
            - dependencies: The list of all reactive values referenced inside of the setup code. Reactive values include props, state, and all 
            the variables and functions declared directly inside your component body.If you don’t specify the dependencies at all, your Effect will re-run after every re-render of the component.

Side Notes:

    Curly and double curly braces in JSX
        Using curly braces is 'A window into JSland':

            -pass in simple VARIABLE:

                export default function TodoList() {
                    const name = 'Gregorio Y. Zara';
                    return (
                        <h1>{name}'s To Do List</h1>
                    );
                }

            -pass in a FUNCTION that RETURNS:

                const today = new Date();

                function formatDate(date) {
                    return new Intl.DateTimeFormat(
                        'en-US',
                        { weekday: 'long' }
                    ).format(date);
                }

                export default function TodoList() {
                    return (
                        <h1>To Do List for {formatDate(today)}</h1>
                    );
                }

        Using “double curlies” is for CSS and other OBJECTS in JSX:

            export default function TodoList() {
                return (
                    <ul style={{
                        backgroundColor: 'black',
                        color: 'pink'
                    }}>
                        <li>Improve the videophone</li>
                        <li>Prepare aeronautics lectures</li>
                        <li>Work on the alcohol-fuelled engine</li>
                    </ul>
                );
            }
        THUS, in deep-dive-demo/src/components/Book.js the possible <li style={{backgroundColor: highlighted ? 'green' : 'none'}}>
        is simply an object with key backgroundColor and value ternary operator
        it is dynamic and it has neat syntax

    Webpack build directory

        You can import Book.css in Book.js -> webpack know that css file is no js file, it bundles it in one big css file and 
        Webpack manages the configuration (this happens when writing script: run build BUILD IS THE FINAL PRODUCT ASSEMBLED BY WEBPACK)
        Problem -> css will be part of one big css file, so the css will be valid for whole ap

    CSS Module
        deep-dive-demo/src/components
        Easy solution -> make css into module Book.css => Book.module.css 
        BUT how to import -> import as an object -> import styles from './Book.module.css'

 1:35:40       

    Optional chaining:
        const adventurer = {
            name: 'Alice',
            cat: {
                name: 'Dinah'
            },
            dog: {
                name: 'Barky'
            }
        };

        const dogName = adventurer.dog?.name;
        console.log(dogName);
        >> "Barky"

        console.log(adventurer.someNonExistentMethod?.());
        >> undefined

        // best if undefined and awaiting fetch -> placeholder
        console.log(adventurer.someNonExistentMethod?.() || 'Loading...')

    Fetching

        Rookie's mistake:
            
            import { useState } from "react";

            export const CharacterList = () => {
                const [characters, setCharacters] = useState([]);

                fetch(`https://swapi.dev/api/people`)
                    .then(res => res.json())
                    .then(result => {
                        setCharacters(result.results);
                    });

                return (
                    <ul>
                        {!characters.length && <li>Loading...</li>}
                        {characters.map(x => (
                            <li key={x.name}>{x.name}</li>
                        ))}
                    </ul>
                );
            } 
        
        Inifinite fetching and re-rendering because:
        - component renders
        - fetch request is sent 
        - return sets placeholder '<li>Loading...</li>
        - fetch response comes back and useState hook is executed via setCharacters(result.results)
        - EVERY STATE CHNAGE IN HOOK WILL CAUSE THE HOST COMPONENT TO RE-RENDER 
        - so fetch executes again and again

        Solution: (useEffect() limits to only one call initially -> empty dependency array [] after cb)

            export const CharactersList = () => {
                const [characters, setCharacters] = useState(); // instead of optional chaining, you can simply initilise an empty array instead of app crashing due to throwing an error upon calculating characters as undefined before the fetch

                useEffect(() => {
                    fetch('https://swapi.dev/api/people/2')
                        .then(res => res.json())
                        .then(result => {
                            setCharacters(result)
                        })
                }, [])

                return (
                    <ul>
                        <li>{characters?.name || 'Loading...'}</li> // characters?.name -> if characters.name is undefined the optional chaining evaluates to undefined instead of throwing an error.
                    </ul>
                )
            }

53:31

Todo demo

    How to pass in all object properties into a component to use as props, but not name them indiviaully

    TodoList.js:

        {todos.map(todo => <TodoItem key={todo._id} {...todo} onClick={todoClickHandler} />)}

    {...todo} passes all properties of object 'todo' which are then accessed via props:

    TodoItem.js:

        export const TodoItem = (props) => {}

    Note that onClick in <{...todo} onClick={todoClickHandler}> in TodoList.js is too part of props

    you can either use spread and have props:
        TodoList.js
            <{...todo} onClick={todoClickHandler}>
        TodoItem.js
            export const TodoItem = (props) => {}

    or you can pass in named prop which has to be used in child to access data behind name
        TodoList.js
            <todoStuff={todo} onClick={todoClickHandler}>
        TodoItem.js
            export const TodoItem = ({todoStuff}) => {}