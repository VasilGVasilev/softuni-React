Why () after return - return():
    In React functional components, the () after the return statement are used to wrap a 
    block of JavaScript code that should be returned as a single value.
    Without the parentheses, the return statement would only return the first expression 
    that it encounters. However, by wrapping the code in parentheses, we can return 
    multiple expressions, or even a block of code, as a single value.


App.css instead of /css/styles.css to be global, it is global due to Webpack making it 

Components have the advantage of being easily moved around directories -> React updates their imports automatically

Dan Abramov architecture quote: “move files around until they feel right".

Ctrl + Shift + F to search word in all files in specified directory

Kebab case for small letters -> user-item, user-list

see papazov destrucutring instead of props to have more clarity what are the used props in the component right in the beginning

2:29:09
<Fragment></Fragment> - does not show up on official HTML, but does play the role of wrapping element in a component's return see UserItem.js
    in new versions of React <></> is a fragment without importing it excplicitly

userServices.getAll() Why resolve it with then? - async function's return is always wrapped in a promise:

    Even though you returned a number, the value is automatically wrapped in a promise, so we call
    `then` on it to access the returned value.

        async function increment(num) {
            return num + 1;
        }
        increment(3).then(num => console.log(num));
        >> 4

Parent Child communcation:
    parent communicates with child by passing on argument (even functions) via props
    child communicates with parent by passing in argument in a callback function (passed in initially from parent to child via props)
    but that callback function is wrapped in an arrow function, thus, enabling passing of arguments stored in child closure up the stream to parent

On props basic -> what you pass in as name in nameOfFunc={someFunction}, you extract via destructuring in the child component ({nameOfFunc}):
    {selectedUser && <UserDetails user={selectedUser} >>>>onClose<<<<={closeClickHandler}/>}
    export const UserDetails = ({user, >>>>onClose<<<<}) => {


BEST PRACTICE 
    with several close enough states:
        const [userAction, setUserAction] = useState({user: null, action: null})
        
    BUT NOTE - you have an object (or array object) set in useState -useState({user: null, action: null})-
    !!!!!!!!the spread syntax ensures that the state object is replaced rather than mutated!!!!!!!!! [-->...oldUsers<--, user]
    while second argument after spread syntax updates with new data [...oldUsers, -->user<--]

    state should always be modified to a new reference, thus, the array []:
        setUsers(oldUsers => [...oldUsers, user]); 
        regarding [...oldUsers, user], code is just applied left to right, first we reapply all oldUsers via spread, then we update one of them
Adding editable value to input in React is done with a defaultValue:
    <input id="phoneNumber" name="phoneNumber" type="text" defaultValue={user.phoneNumber}/>
