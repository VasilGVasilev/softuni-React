Note that not every time you need to have an async function when communicating between modules,
async functions wrap returns in Promises but you can pass on the promises synchroniously through a chain of modules
and have them resolved in the last one 
see. servicesPassOnSynchroniously, not a rule but adequate solution for current problem 

2:16:00

Logout problems
    be careful not to resolve response.json
    
    authService have no access to token which is in context API -> services do not have access to context vars, which is fundamental difference with Back-End MPA, where service had access to token, mainly due to logic being done on same place server, while with spa, logic is sent to browser for client to do it via scripts

    Solution for service not having access to token, token is passed in to authService in Logout component, or directly in request service, but important part is that request has to become a hook rather than be a normal function as it is now due to a following error if you use useContext directly in request function:
        React Hook "useContext" is called in function "request" that is neither a React function component nor a custom React Hook function.

    MIND that context spreads among components not among whole app, whith MPA, we attached token to req.user, which is express Request, thus, fundametal part of the whole app

2:00:00

custom hook useRequest
    creating games requires Authorization token, thus, custom hook to upgrade the requester.js functionality