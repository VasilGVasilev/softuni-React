Note that not every time you need to have an async function when communicating between modules,
async functions wrap returns in Promises but you can pass on the promises synchroniously through a chain of modules
and have them resolved in the last one 
see. servicesPassOnSynchroniously, not a rule but adequate solution for current problem 

2:16:00

Logout problems
    be careful not to resolve response.json
    
    authService have no access to token which is in context API -> services do not have access to context vars, which is fundamental difference with Back-End MPA, where service had access to token, mainly due to logic being done on same place server, while with spa, logic is sent to browser for client to do it via scripts

    Solution for service not having access to token:
        token is passed in to authService in Logout component, or directly in request service, but the important part is that request.js has to become a hook rather than be a normal function due to a following error if you use useContext directly in request function:
        React Hook "useContext" is called in function "request" that is neither a React function component nor a custom React Hook function.

        Reminder that hooks should be top-level declared, so that you use their returned functions, not the custom hooks themselves:
        
            If you do custom hook inside component method -> ERROR:
            
                const taskDeleteHandler = async (taskId) => {
                    // update server
                    await useTodosApi(URL);
                    // update UI
                    setTasks(state => state.filter(x => x._id != taskId));
                };

                ERROR -> React Hook 'useTodosApi' is called in function 'taskDeleteHandler' that is neither a React function component nor a custom React Hook function.

        You have to extract the functionality of custom hooks via top-level declaration and use their returned functions:

                const { removeTodo, createTodo, updateTodo } = useTodosApi();

                const taskDeleteHandler = async (taskId) => {
                    // update server
                    await removeTodo(taskId);
                    // update UI
                    setTasks(state => state.filter(x => x._id != taskId));
                };


    Another solution would be to clone token from component in localStorage and use it in request function see tokenFromComponentToRegularFunction.png
    custom hook useRequest
        creating games requires Authorization token, thus, custom hook to upgrade the requester.js functionality


    MIND that context spreads among components not among whole app, whith MPA, we attached token to req.user, which is as Express Request is a fundamental part of the whole app, based on express

2:00:00

localStorage to pass in token - why?
    because the alterantive way of passing token from component via service (deep drilling) or useRequest custom hook + context API is actually a long chain that has to be re-established every time one needs an authorised request,
    it is better to abstract the authorisation token in localStorage which said plainly is even more abstract than using Context API, the latter can simulate global abstraction, yet, it is still dependant on the component we attach it to, unlike, localStorage which is as abstract as Front-end can be -> Browser storage
