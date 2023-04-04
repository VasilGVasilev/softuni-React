Class TaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

        )
    }
}

    Constructor runs before anything else in the class-based code in react.js to the life-cycle of the component. Constructor code runs once, and only once, for the entire life-cycle of this component in react.
    Constructor is an initialization field for among many - state

    super() calls contructor() which initializes the component, NB - dont pollute with external data (fetch) the constructor of a react class component

    Why do we call super? Can we not call it? If we have to call it, what happens if we don’t pass props? Are there any other arguments? Let’s find out.

    In JavaScript, super refers to the parent class constructor. (In our example, it points to the React.Component implementation.)

    Importantly, you can’t use 'this' in a constructor until after you’ve called the parent constructor. JavaScript won’t let you:

        class Checkbox extends React.Component {
            constructor(props) {
                // 🔴 Can’t use `this` yet
                super(props);
                // ✅ Now it’s okay though
                this.state = { isOn: true };
            }
        }
    Summary: we use super() in props to be able to use 'this' which may inherit from a parent component, we may pass or we may not pass props in super(props) JS will make it available anyways for methods outside contructor - thus better define it so that 'this' is available in constructor

    Very good article on the issue:
    https://overreacted.io/why-do-we-write-super-props/

2:55:00

WORKSHOP PART II

Error Boundries done with Class components