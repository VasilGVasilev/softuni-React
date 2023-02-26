Installtion: 
index.js
    import { BrowserRouter } from 'react-router-dom'; // Router is unconfigured, BrowserRouter is configured

    you can add BrowserRoutwer wherever you use it, index, App, etc

    in index.js
            import { BrowserRouter } from 'react-router-dom';
        <BrowserRouter>
            <App />
        </BrowserRouter>

App.js
    import { Routes, Route, Navigate } from 'react-router-dom';
    Routes works only wrapped within BrowserRouter
    Route works only within Routes
    <Route path="/" element={}> element rendered on this path specifically
