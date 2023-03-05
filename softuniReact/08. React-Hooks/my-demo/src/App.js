import { TaskContext } from './contexts/TaskContext';
import useFetch from './hooks/useFetch';
import useTodosApi from './hooks/useTodos';

import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import styles from './App.module.css';

function App() {
    const [tasks, setTasks, isLoading] = useFetch('http://localhost:3030/jsonstore/todos', []);
    const { removeTodo, createTodo, updateTodo } = useTodosApi();

    const taskCreateHandler = async (newTask) => {
        // update server
        const createdTask = await createTodo(newTask)
        // update UI
        setTasks(state => [
            ...state,
            createdTask,
        ]);
    };

    const taskDeleteHandler = async (taskId) => {
        // update server
        await removeTodo(taskId);
        // update UI
        setTasks(state => state.filter(x => x._id != taskId));
    };

    const toggleTask = async (task) => {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        // update server
        await updateTodo(task._id, updatedTask);
        // update UI
        setTasks(state => state.map(x => x._id == task._id ? updatedTask : x))
    };

    const taskEditHandler = async (task, newTitle) => {
        const updatedTask = { ...task, title: newTitle };
        // update server
        await updateTodo(task._id, updatedTask);
        // update UI
        setTasks(state => state.map(x => x._id == task._id ? updatedTask : x))
    }

    return (
        <TaskContext.Provider value={{ tasks, taskDeleteHandler, toggleTask, taskEditHandler }}>
            <div className={styles['site-wrapper']}>

                <header>
                    <h1>TODO App</h1>
                </header>

                <main>
                    {isLoading
                        ? <p>Loading...</p>
                        : <TaskList />
                    }

                    <CreateTask taskCreateHandler={taskCreateHandler} />
                </main>
            </div>
        </TaskContext.Provider>
    );
}

export default App;
