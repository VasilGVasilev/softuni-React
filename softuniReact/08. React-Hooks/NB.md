Hooks since v16.8

Hooks share functionality, they actually add functionality to otherwise static presentational functional components, hooks also make the functional components go against their nature of pure functionality

useState hook lets you persist information stored even during re-render, unlike, a simple variable storing, which will be lost at the moment browser re-renders content; this is accomplished via closures

useState is immutable, thus, you need special function setValue to update state:
    const [value, setValue] = useState()
This special function can be expanded for more precise updating (wen depending on oldState -> to tackle race condition):
    setValue (oldState => oldState + 1 ) -> value type
    setValue (oldState => {...oldState, newKey: newValue} ) -> reference type
        why we need new reference, because React updates UI via comparing references, so new info that needs to be displayed on next render is designated by having a new reference to it

Context 

    Passing Data Deeply with Context:

    Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

useEffect - usecases: data fetching, subscriptions(events) but also mounting:
    useEffect bundles three lifecycle methods:
                                                componentDidMount
                                                componentDidUpdate
                                                componentWillUnmount

    needs a dependnecy array (empty or not), because otherwise it will make an infinite loop re-render <-> update of state:

    Return in useEffect - a cleanup method

        useEffect(() => {
            const subscription = props.source;
            return () => {
                subscription.unsubscribe();
            }
        })
        
        //clean up function
        () => {
            subscription.unsubscribe();
        }

    How to unmount(clean up) -> make useEffect return a function 

    TaskItem.js

        useEffect(() => {
        // console.log('Mount');

            return () => {
                // console.log('Unmount');
            };
        }, []);

        each time we initialise a (new task) component -> useEffect is mounted and logs 'Mount'
        if we remove a (task) component via deleting from state or stop rendering it as a component in UI -> useEffect knows/tracks that this component is no longer rendered and the function that useEffect returns will come into play, mind that this function (logging 'Unmount') is saved for later
        see useEffect return

    MIND that if you have a function in useEffect that has dependencies, they too have to be declared in useEffect's dependencies


2:40:00

Custom hooks -> reusable stateful logic, for example, useFetch for displaying Loading inbetween fetches
    Closure templates
    useFetch is like a closure template (custom hook), that we can customize with URL and DefaultFata according to our specific need for fetch. But as it is:
    const [tasks, setTasks, isLoading] = useFetch('http://localhost:3030/jsonstore/todos', []);

    we can declare other variables in another component and use the same closure template (custom hook) to store other values in them, having in mind that state will stored in each closure accordingly

You cannot make the function of useEffect be async,
you can make the function inside the function of useEffect async or .then()
    useEffect( NO ASYNC() => {
        setIsLoading(true);
        YES ASYNC OR THEN
            <!-- (async () => {
                await 
            }) -->
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setIsLoading(false);

                setData(Object.values(result));
            });
    }, [url]);


Hooks rules:
    Always call hooks at the top level of component
    Never call hooks in loops, conditions, nested functions

    This is the only way so that React knows what Hooks are and where to find them, remember that React compares nodes for re-rendering, so if else may change the node tree  

    If you do ( custom hook inside component method ):
    
        const taskDeleteHandler = async (taskId) => {
            // update server
            await useFetch(URL);
            // update UI
            setTasks(state => state.filter(x => x._id != taskId));
        };

        ERROR -> React Hook 'useFetch' is called in function 'taskDeleteHandler' that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter.  


1:28:00

Context
        Context API is not React's inner state management system like Redux, which manages global state
        Context API manages a state that is not fixed on binary framework global/local, rather it manages an asymethrical state that components get access to not via props but via special function useContext(NameOfContext)

    ChatGTP definition:
    The Context API in React is a way to share state data between components in a tree-like structure, without the need to pass props down through every level of the component hierarchy.

    While Context can be used for global state management, it is not exclusively designed for that purpose. In fact, the Context API can be used for any kind of shared state that needs to be accessed by multiple components in a React application.

    The state stored within a Context is still referred to as "state," but it is shared and accessible to all components that have access to the Context.

    Context API is part of React since v16.3, before that always redux for global and lifting state

    Applying:

        -CREATE context:

            import { createContext } from "react";
            export const TaskContext = createContext();

        -PROVIDE context to parent via value:

            <TaskContext.Provider value={{ tasks, taskDeleteHandler, toggleTask, taskEditHandler }}>
            </TaskContext.Provider>

        -USE context to child and import state declared in parent:

            import { useContext } from "react";
            import { TaskContext } from "../contexts/TaskContext";
            const { tasks } = useContext(TaskContext)

    Context disadvantages: not as fast and efficient as global state management like Redux




Idea for articles -> show which methods return a new reference to an array/object to know what to use in setState()


