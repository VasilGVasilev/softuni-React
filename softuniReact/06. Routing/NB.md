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
        
    <Link/> instead of <a>
        
        Dont use anchor tags because they page reload by default!
        Link changes URL without Page Reload
        Thus, instead <a href> use <Link to>:
            import { Link } from 'react-router-dom'
            <Link to="/">Home</Link>
    <NavLink>

        NavLink has a very useful isActive property, which can be accessed via obj desctructuring and reflect whether you are currently on the pathname

        <NavLink 
            to="/about"
            style={({isActive})=>{
                return isActive
                    ? {backgroundColor: 'lightblue'}
                    : undefined
            }}
        >


2:26:00

Parameters
    deep linking -> path reflects the specific content so that when you share the URL the same specific content is rendered
    useParams() hook since v6 react-router-dom

                         BASIC LOGIC BEHIND EVERY SPA
    ----->useParams to trigger useEffect Fetch to trigger useState storing<-----

    - the basic params example shows how params should be single source of input
    - then we have a useEffect to make a fetch with relevant data
    - then we store the fetched data via useState

Redirects
    <Navigate to="/home" /> or useNavigate() hook

        useNavigate()
            uses History API without refresh
            so that you can update URL based on user input (ex. click),
            The useNavigate hook returns a FUNCTION that lets you navigate programmatically, for example in an effect:

                import { useNavigate } from "react-router-dom";

                function useLogoutTimer() {
                    const userIsInactive = useFakeInactiveUser();
                    const navigate = useNavigate(); //FUNCTION

                    useEffect(() => {
                        if (userIsInactive) {
                        fake.logout();
                        navigate("/session-timed-out"); //FUNCTION
                        }
                    }, [userIsInactive]);
                }
            NB second optional argument in FUNCTION {replace} which if set to true makes the URL be ONLY replaced, namely, History API does not work and you cannot go back and forth via browser buttons

        <Navigate />    

            import { Navigate } from 'react-router-dom';

            <Route path="/millennium-falcon" element={<Navigate to="/products/10" replace />} />

            replace is useful here, because clicking back will update the URL to /products/10 to /millennium-falcon, thus, going back will mean to jump from /millenium-falcon to /proucts/10, but this in itself again renders the initial logic, so replace as a tag enables user to just go back to previously selected page



Starships
    all starships
        http://localhost:3000/starships/
    starships rendered as links and if clicked, starship/:params reidrects to specific starship to be rendered
        http://localhost:3000/starships/5/
    in it we can have info about a specific film

        http://localhost:3000/starships/5/films/1

    Dont forget to add /* as a placeholder for every nested route back in initial router:
        <Route path="/starships/:starshipId/*" element={<Starship />} />

    Also mind that: 
            <Link> attaches films/{i+1} to /starships/ 
            if you write /films/{i+1} with '/' in front of films
            you will reset to http://localhost:3000/films/2 instead of http://localhost:3000/starships/2/films/2

Basic Routing Rule
    if on this route /URL path/, show this component