import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => { 
        const storedData = localStorage.getItem(key);
        
        return storedData ? JSON.parse(storedData) : defaultValue; // you parse value saved on Browser localStorage
    });
    
    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue)); // you stringify value to be saved on Browser localStorage
        
        setValue(newValue);
    };
    
    return [
        value,
        setLocalStorageValue,
    ];
}
// useLocalStorage is a template so when you call setAuth in App.js
// you call setLocalStorageValue which after setting localStroage.setItem()
// calls setValue

// the quintessence is const setLocalStorageValue
// it sets values (email, id, accessToken) localStorage for Browser and sets values to keep in component state

// Thus, when you have logged-in, you setAuth, ultimatelly, setting values both for component to use and browser to store

// The whole idea to persist is that when you click on refresh useState(initialValue) is initilised
// which in this case searches for data in localStorage -> const storedData = localStorage.getItem(key);
// Since refresh re-initilizes component, but browser stores values and when we refresh, we in fact re-initialize the state,
// but with info set in localStorage previously via first part of const setLocalStorageValue -> localStorage.setItem()



// useLocalStorage is a custom hook that utilizes useState to persist localStorage
// so that when we re-render the whole App component, we continue to be authenticated
// localStorage stores the token in browser

// useLocalStorage is custom useState that includes localStorage
// in App.js we have:
// const [auth, setAuth] = useLocalStorage('auth', {});

// in fact the returned here (useLocalStorage.js) -> [value and setLocalStorageValue] 
// have new names in App.js -> [auth, setAuth]

// How it works:
// in App.js when we utilise setAuth, we actually utilise setLocalStorageValue in setLocalStorage.js
// this sets item in localStorage

// BUT before that we have a special intialization of the useState:
        // useState(() => { 
        //     const storedData = localStorage.getItem(key);
            
        //     return storedData ? JSON.parse(storedData) : defaultValue; // you parse value saved on Browser localStorage
        // });

    // this initializes the setting of auth state for the component so that in Components:
    //  LocalStorage: State(value):{}