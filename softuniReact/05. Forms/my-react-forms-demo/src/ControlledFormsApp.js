import './App.css';
import { useState } from 'react'

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

export default App;
