Component: basic idea Presentation Fundamental points

    Props
        Props get passed to the component -> like function params
        State is managed within the component -> like local variables

        Components cannot change their own props

        Use children property to access information between opening and closing tags:

            const BookList = () => {
                return (
                    <ul>
                        <Book>
                            <span>
                                Some value
                            </span>
                        </Book>
                    </ul>
                )
            }

            const Book = (props) => {
                return (
                    <li className = 'book'>
                        <div>{props.children}</div>
                    </li>
                )
            }

        
    State Hook - using useState() will preserve this state between re-renders

        useState() overwrite, this.setState merges
        
            useState() is different from this.setState in not merging old and new state together:
            
                this.setState({ selected: { id: 1, name: 'Foobar' } });  

            Then if you update the state:

                this.setState({ selected: { name: 'Barfoo' }});

            - this.setState will merge:

                { selected: { id: 1, name: 'Barfoo' } }; 
            
            - useState() will overwrite:

                { selected: { name: 'Barfoo' } }; 
            
            !THE REASON -> this.setState uses object, useState() does not by default, but it can
        
        Handling events

            Revisiting an old issue with class components:

                ?Why is it necessary to bind 'this' in the following code?

                    class Toggle extends React.Component {
                        constructor(props) {
                            super(props);
                            this.state = {isToggleOn: true};

                            // This binding is necessary to make `this` work in the callback    <--- ?????
                            this.handleClick = this.handleClick.bind(this);  
                        }

                        handleClick() {    
                            this.setState(prevState => ({      
                                isToggleOn: !prevState.isToggleOn    
                            }));  
                        }
                        render() {
                            return (
                                <button onClick={this.handleClick}>        
                                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                                </button>
                            );
                        }
                    }

                Beccause via -this- in handleClick() as a cb, we can use all the context of this, namely, this.state


                The problem is that we do not invoke handleClick in <button onClick={this.handleClick'()'}> directly
                When the app executes the handleClick (wihtout'()') it sort of takes a shallow template of the function
                This shallow template refers to -this-, which wihtout attached context (via bind()) is practically outside
                the context we define in the contructor. Thus, this refers to global object, it has no property setState.

                This is a rule in JS - class methods do not bind with context by default: see end for explanation of Rule

                    this.x = 9; // 'this' refers to the global object (e.g. 'window') in non-strict mode

                    const module = {
                        x: 81,
                        getX() {                 //getX: function() is the same but more accessible if necessary
                            return this.x;
                        }
                    };

                    console.log(module.getX()); // 81 Ex.1

                    const retrieveX = module.getX;
                    console.log(retrieveX()); // 9; Ex.2

                    const boundGetX = retrieveX.bind(module);
                    console.log(boundGetX()); // 81 Ex.3
                
                !!!! It is crucial where the function gets invoked:
                    -Ex.1, we directly trigger the module to execute its methods
                    -Ex.2, we abstract a reference/path to the shallow template of the a method of a class, but
                    if we store it in a variable and execute it, this shallow template is shallow and it does not
                    carry the context of its original class, all it knows it is that:
                        -it returns this.x 
                        -it is invoked in the global scope
                    the resulting behaviour is that it searches for this.x value in the context of execution -> global
                    -Ex.3, we bind a context to the shallow template of the method of a class, so that wherever this
                    shallow template is invoked, it has a wrapper function that represents the framework of its scope,
                    this never goes outside this wrapper to rely on the global context by taking the value of this.x = 9;

            Passing arguments to event handlers:
                -arrow functrions:
                    <button onClick={(e)=>this.deleteRow(id,e)} />
                    RULE: With JSX you pass a function as the event handler, rather than a string.
                    why? the same reason why we pass a string in .addEventListener(click, function) and not .addEventListener(click, function())
                    to prevent from executing directly.
                    if we have <button onClick=deleteRow />, deleteRow will be executed immediately and will trigger render and subsequent faulty behaviour
                    see https://blog.devgenius.io/why-it-is-necessary-to-use-arrow-functions-with-react-event-handler-e0b278710310

                -using bind:
                    <button onClick={this.deleteRow.bind(this, id)} />
                    
            Chat OpenAI explanation:

            Arrow functions in JavaScript have a lexical this binding, which means that they inherit the this 
            context from the surrounding scope, rather than creating a new this context or using the global 
            this. In the case of the functional component, the arrow function is defined inside the 
            component's function body, and therefore inherits the this context of the component. This 
            allows the function to access any properties or methods on the component that are declared 
            with the this keyword.

            Without the arrow function, the this keyword inside the callback function would refer to the
            global object or undefined in strict mode, and the component's method would not be accessible, 
            resulting in an error. The use of the arrow function ensures that the this context inside 
            the callback function is the same as the this context outside of it, thus allowing the 
            component's method to be accessed and executed properly.
            
            NB 
                - why lexical (bad wording) -> When you define a function and use a variable inside of it, 
                it checks if the variable has been defined in its scope. If it is, it uses it! 
                If not, it checks the enclosing scope for that variable definition. It keeps checking 
                enclosing scopes until it finds the variable or reaches global scope. 
                Now, function definitions that are not arrow functions define this for you, implicitly. 
                Thus, they will never check an enclosing scope when you try to use this in their scope 
                (because they find it in their own scope!). Arrow functions do NOT define their own this, 
                so they go to the enclosing scope and look for it just as they would with any variable 
                you try to use in their scope. 
                
                -the lexical approach was introduced in ECMAscript 6 so that you can have functions whose 
                context is determined by WHERE it is defined, not how it was called -> see again initial example
                of module.getX(), but mainly, imnagine using callbacks and refering to this
                
            In summary:
                this inside a callback, typically, is undefined which automatically (in non-strict mode) renders
                the value of this to be the Global Object. Thus, we have two options:
                - use an arrow function which has lexical binding -> here, component context
                - use bind() to bind the context;
                so problem of callback rendering this to be undefined -> Global Obj is solved with arrow function or bind()
            
            My explanation on bind:

            So why using bind ->   CLASS METHODS DO NOT BIND WITH CONTEXT BY DEFAULT and in reality,
            after return, the execution of the function is stopped and JSX elements are after the return,
            thus, they do not carry the context and when we call on a method, the method has no context to
            to properties unless .bind() is used

                function m() {
                    this.x = 6
                    return x
                }
                x will refer to global Object not the in m() defined 6
            
            view return as a crucial point of ending the functional scope of m();
            !!!!!! 'this' is just made this way, to always refer to the context and if not -> to global object;
                    this and callbacks

                    this (for normal functions) is determined when a function is called based 
                    on how the function is called. The runtime looks at the reference used to 
                    call the function to see what object is to be used for the value of this
                    When you pass a function to another function as a callback, that function 
                    isn't getting called right away. You're giving up control of the call to 
                    that other function. But when that function gets your function, it gets 
                    it as a single function reference, not as a combination of an object and 
                    a function to call from that object.
            
            if we had a normal variable that stores a value, it would be different:

                function m() {
                    x = 6
                    return x
                }
                x will 6

Why class methods are not bound to context by default?
Because methods are bound by default to the instance of the class
or manually by using bind() or arrow function.

Here is an example to illustrate the reason class methods do not 
bind with context by default:

        class Example {
            constructor(name) {
                this.name = name;
            }   
            sayName() {
                console.log(`My name is ${this.name}`);
            }
        }

        const example1 = new Example('John');
        const example2 = new Example('Jane');

        // The sayName method is called on the example1 instance of the class
        // and the this keyword inside the method refers to the example1 instance
        example1.sayName(); // Output: My name is John
        example2.sayName(); // Output: My name is Jane

        // Assign the sayName method to a variable
        const sayName = example1.sayName;

        // The sayName method is no longer being called on an instance of the class
        // and the this keyword inside the method no longer refers to the class instance
        // In this case, the value of this will be window or undefined in strict mode
        sayName(); // Output: My name is undefined

    As you can see in the above example, when the sayName() method is called on 
    the example1 instance of the class, the this keyword inside the method refers 
    to the example1 instance, and it outputs the correct name. However, when the 
    sayName method is assigned to a variable and called on its own, it is no longer 
    being called on an instance of the class and the this keyword inside the method 
    no longer refers to the class instance, so the output is undefined.

    This illustrates that when class methods are defined using the prototype property, 
    which is a static property of the class constructor, they do not bind with context 
    by default. This means that when a class method is passed as a callback or assigned 
    to a variable, the this keyword inside the method will no longer refer to the class instance.

    To fix the problem, you can use the bind method to explicitly bind the class 
    method to the class instance, like this:

        const sayName = example1.sayName.bind(example1);
        sayName(); // Output: My name is John

    Or you can use an arrow function in the class methods that needs to be passed 
    as callbacks, since arrow functions have lexical this binding and maintain the 
    correct context even when passed as callbacks or assigned to variables, like this:

        class Example {
            constructor(name) {
                this.name = name;
            }
            sayName = () => {
                console.log(`My name is ${this.name}`);
            }
        }

    In this way, the correct context is maintained even when passed as callbacks 
    or assigned to variables.