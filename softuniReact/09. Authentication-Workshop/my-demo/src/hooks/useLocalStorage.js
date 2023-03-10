import { useState } from 'react';
// useLocalStorage is a custom hook that abstracts useState into localStorage of browser
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
