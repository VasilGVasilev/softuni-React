const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// react native syntax #Cumbersome

// const reactElement = React.createElement(
//     'header',
//     {className: 'site-header'},
//     React.createElement('h1', {}, 'Hello from React!!!'),
//     React.createElement('h2', {}, 'React slogan'),
// );

// JSX syntax #better, it uses the declarative approach signature for whole React
const reactElement = (
    <header className="site-header">
        <h1>Hello from JSX!!!</h1>
        <h2>React slogan</h2>
    </header>
); //we do we have () - standart JS syntax for less prone to bugy code with return + sexier code

// NB, you need Babel transpiler for JSX, either as a CDN or npm install and npx 
// note the npx "babel": "npx babel --watch src --out-dir build --presets react-app/prod"
// HOW IT WORKS
// take the pretranscompiled code in /src and create the transcompiled code in /build
// index in build reads the 'translated' index.js
// ---> each change in /src/index.html babel watches and changes file and liveserver rerenders the updated code

// transpiler translates JSX in JS, or ES6 previoulsy in JS, 
    // Babel is a free and open-source JavaScript transcompiler that is 
    // mainly used to convert ECMAScript 2015+ code into backwards-compatible 
    // JavaScript code that can be run by older JavaScript engines. 
    // It allows web developers to take advantage of the newest features of the language
root.render(reactElement)