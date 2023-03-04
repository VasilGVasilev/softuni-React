refactoring html to jsx
    %PUBLIC_URL%/ in front of link when linking styles.css, s  yntax may be coming from bundler  
    
    style.css calls via imports all other
    Problem with that is that there a requests for each component css,
    React way is to make all of them be dynamic rather than static and imported via straighforward script.

wrap App in BrowserRouter in index.js and then add Routes/Route logic to App.js 

export { default } from './Home' in index.js for no /Home/Home

2:36:00

This demo is client side orientated, so updates (create, edit) of data does not persist on the server
the client's correspondance with server is just the inial loading of all data
This is just for this demo!

1:45:00
Always remember to update state with new referance to new object: ...state, [e.target.name]: e.target.value 

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value // name="username" :  value={comment.username}
        }))
    }

In React it is a rule to return new reference when updating state. Thus, arrays and object which are mutable should be treated as immutable primitive values, namely, update to a new referance. 
If you update mutable values when dealing with state, you go against the whole idea of having states, since instead of oldState -> newState, you have one single endpoint of the mutable reference which when updated is altered directly, as opposed to creating a new state and substituting the old one.


uniqid library -> install, import and just execute function uniqid() where necessary

Comments validation -> if length < 4, onBlur, update special errors state 