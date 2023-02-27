Installtion: 
index.js
    import { BrowserRouter } from 'react-router-dom'; // Router is unconfigured, BrowserRouter is configured

    you can add BrowserRoutwer wherever you use it, index, App, etc

    in index.js
            import { BrowserRouter } from 'react-router-dom';
        <BrowserRouter>
            <App />
        </BrowserRouter>

    BrowserRouter official docs:
        export function BrowserRouter({
            basename,
            children,
            window,
            }: BrowserRouterProps) {
            let historyRef = React.useRef<BrowserHistory>();
            if (historyRef.current == null) {
                historyRef.current = createBrowserHistory({ window, v5Compat: true });
            }

            let history = historyRef.current;
            let [state, setState] = React.useState({
                action: history.action,
                location: history.location,
            });

            React.useLayoutEffect(() => history.listen(setState), [history]);

            return (
                <Router
                basename={basename}
                children={children}
                location={state.location}
                navigationType={state.action}
                navigator={history}
                />
            );
        }

    BrowserRouter uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL. there is no page reload even though there is URL logic

App.js
    import { Routes, Route, Navigate } from 'react-router-dom';
    Routes works only wrapped within BrowserRouter
    Route works only within Routes
    <Route path="/" element={}> element rendered on this path specifically

    paths have VERY SPECIFIC SEARCHING AND COMPARING unlike express.Router,
    /contact and /contacts are specific so even if you put one before other:
    /contact
    /contacts

    /contacts will not be ignored!; in v.5 see exact keyword
    
    the above example in express.Router may cause for /contacts to be ignored due to syntax similarity between /contact and /contactS 

    Navigation
    Dont use anchor tags because they page reload by default!
    Link changes URL without Page Reload
    Thus, instead <a href> use <Link to>:
        import { Link } from 'react-router-dom'
        <Link to="/">Home</Link>


2:26:00

Parameters
    deep linking -> path reflects the specific content so that when you share the URL the same specific content is rendered
    useParams() hook since v6 react-router-dom