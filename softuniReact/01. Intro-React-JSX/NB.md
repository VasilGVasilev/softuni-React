prior to v18, 
    needed to continue passing the container into the render,
    although it never changes:
        
        import ReactDOM from 'react-dom';
        import App from 'App';

        const container = document.getElementById('root');

        //Initial render
        ReactDOM.render(<App name="Saeloun blog" />, container);

        // During an update, React would access the root of the DOM element
        ReactDOM.render(<App name="Saeloun testimonials" />, container)
    
from v18 onwards:
    new root API
        import ReactDOM from "react-dom";
        import App from 'App';

        const container = document.getElementById('root');

        // Create a root.
        const root = ReactDOM.createRoot(container);

        // Initial render
        root.render(<App name="Saeloun blog" />);

        // During an update, there is no need to pass the container again
        root.render(<App name="Saeloun testimonials" />);

config
ctrl + , -> emmet -> langueages -> javascript : javascriptreact to write JSX in .js file without the need of .jsx

hot reloading - in DEVELOPMENT
    when the whole page is re-rendered to relfect on code change, but you are already in a modal
    that will mean you have to reselect the whole chain to open the modal
    Solution: Hot Module Replacement via Webpack and create-react-app, changes to code do no refresh page
    
    in PRODUCTION
    HOWEVER, this is not to be mistaken with the automatic re-rendering done by ReactDOM so that only the clock date changes
    The techinque is about the script written in React re-rendering browser in production, while the above is in development.
    React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

create-react-app
    why npx create-react-app .
    . is current directory

    NPX, because create-react-app is not only a package, but a toolchain,
        toolchain of files and executable commands
        so although NPM deals with the bad practice of global install and encapusaltes the project for version control, virtual env, containerization
        it still does not deal with executbale commands
        Thus, use NPX:
            NPX adds packages to the user’s PATH and thus they can easily be directly invoked (executbale commands)

            
    scripts
    npm start
        Starts the development server.
    npm run build
        Bundles the app into static files for production.
    npm test
        Starts the test runner.
    npm run eject
        Removes this tool and copies build dependencies, configuration files  
        and scripts into the app directory. If you do this, you can’t go back!

Composition over Inheritance
    see Footer in c-r-a, 
        react uses ES modules export/import, node.js uses CommonJS module.exports/require
        with only difference is that React's export is like CommonJS require('Footer') =>
        DOES NOT need extension 'Footer.js' due to not being vanilla module system, Webpack and Babel configure it
        <Footer></Footer> or <Footer />, first if there are children <Footer>Something</Footer>

Component - function that creates a React element
    see how we abstract NewsBox as a separate module NewsBox.js to use as a template/component
    to reuse for three instances in News.js 

    Why () after return - return():
        In React functional components, the () after the return statement are used to wrap a 
        block of JavaScript code that should be returned as a single value.
        Without the parentheses, the return statement would only return the first expression 
        that it encounters. However, by wrapping the code in parentheses, we can return 
        multiple expressions, or even a block of code, as a single value.

Tricks: 
    - https://reactjs.org/docs/dom-elements.html for all HTML to REACT:
        checked 
        className
        dangerouslySetInnerHTML
        htmlFor
        onChange
        selected
        style
        suppressContentEditableWarning
        suppressHydrationWarning
        value 

    - CTRL + shift + K deletes row without copying like CTRL + X  

    - holding CTRL + D selects all instances to then change,
        -> also, by doing the above you can later click end to add ' />'

    - you have to update closing tag for React, className from class, etc.

    - each component must return a single element -  div, section, etc:
        export const News = () => {
            return (
                <section className="news_section layout_padding">
                    ...
                </section>
            );
        }
    
    - hr, br or Iframe tags complicate html so delete,

    - img, input are not self-closing tags in html
