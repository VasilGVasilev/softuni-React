import { Component } from "react";
import TaskItem from './TaskItem';
import withRouter from '../hoc/withRouter';
import { TaskContext } from "../contexts/TaskContext";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                { title: 'Task 11', isCompleted: false },
                { title: 'Task 22', isCompleted: false },
                { title: 'Task 33', isCompleted: false },
            ],
            filter: 'all',
            newTask: '',
            character: {},
        };

        this.newTaskChangeHandler = this.newTaskChangeHandler.bind(this); // instead of repeating, just set context to current class instance however the method is called
    }

    componentDidMount() {
        fetch(`https://swapi.dev/api/people/4`)
            .then(res => res.json())
            .then(result => {
                this.setState({ character: result });
            });
    }

    componentDidUpdate() {
        // console.log('Did update');
    }

    newTaskChangeHandler(e) { 
        // unlike, useState where each new keyboard click will reinstate a letter, namely, update state so abc will be state: a->b->c
        // this.setState merges old state, instead of updating fully with a new reference
        // see addNewTaskHandler
        this.setState({ newTask: e.target.value }); //will crash if 'this' down in render is not set properly, due to default context being the event, with the following code 'this' is properly set this.taskClickHandler.bind(this)
    }

    addNewTaskHandler(e) {
        e.preventDefault();
        // one can use a callback function in this.setState to update old state to new as useState does by default
        // in reality we here update to e new reference, but using the [...state] spread of old state, we effectively, merge just with a new reference
        this.setState((state) => ({
            tasks: [...state.tasks, { title: state.newTask, isCompleted: false }],
            newTask: '',
        }));
    }

    taskClickHandler(taskTitle) {
        this.setState(state => ({
            tasks: state.tasks.map(x => x.title === taskTitle ? { ...x, isCompleted: !x.isCompleted } : x)
        }));
    }

    taskDeleteHandler(e, taskTitle) {
        e.stopPropagation();

        this.setState(state => ({
            tasks: state.tasks.filter(x => x.title !== taskTitle)
        }))
    }

    render() {
        return (
            <TaskContext.Provider value={{ taskDeleteHandler: this.taskDeleteHandler.bind(this) }}>
                <h2>Current Character: {this.state.character.name}</h2>

                <ul>
                    {this.state.tasks.map(x =>
                        <TaskItem
                            key={x.title}
                            title={x.title}
                            isCompleted={x.isCompleted}
                            onClick={this.taskClickHandler.bind(this)} //bind(this) makes the current class instance the context for the taskClickHandler function, too
                        />
                    )}
                </ul>

                <form onSubmit={this.addNewTaskHandler.bind(this)}>
                    <label htmlFor="new-task"></label>
                    <input
                        type="text"
                        id="new-task"
                        name="newTask"
                        value={this.state.newTask}
                        onChange={this.newTaskChangeHandler}
                    />

                    <input type="submit" value="Add" />
                </form>
            </TaskContext.Provider>
        );
    }
}

export default withRouter(TaskList);
