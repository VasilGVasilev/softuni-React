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
    useFetch is like a closure template (custom hook), that we can customize with URL and DefaultFata according to our specific need for fetch. But as it is:
    const [tasks, setTasks, isLoading] = useFetch('http://localhost:3030/jsonstore/todos', []);

    we can declare other variables in another component and use the same closure template (custom hook) to store other values in them, having in mind that state will stored in each closure accordingly






Idea for articles -> show which methods return a new reference to an array/object to know what to use in setState()


