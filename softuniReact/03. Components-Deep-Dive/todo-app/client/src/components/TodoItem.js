export const TodoItem = (props) => {
    let className = 'todo';

    if (props.isCompleted) {
        className += ' is-completed';
    }

    return (
        <tr className={className}>
            <td>{props.title}</td>
            <td>{props.isCompleted ? 'Complete' : 'Incomplete'}</td>
            <td className="todo-action">
                <button onClick={() => props.onClick(props)}>Change status</button>
                {/* onClick is a props */}
                {/* why do we have an arrow function tho -> onClick={() => props.onClick(props)} */}
                {/* we have to pass in the id of todo */}
                {/* we cannot say props.onClick(props) bacause it will call the function immediately */}
                {/* thus, we make it an arrow function see NBCallback in componentBasicIdea */}
                {/* basically we inject onClick into child component but to make it function we need to pass in an argument and execute onClick not be called with component render */}
                {/* frankly, we are defining the function in parent, passing it in child and need to make it callable on event only */}
            </td>
        </tr >
    );
}