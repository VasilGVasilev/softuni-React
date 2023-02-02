import { useEffect, useState } from "react";

// using useEffect:
// we have a button that triggers the execution of a handling function
// the handling function sets a new state
// useEffect watches for changes in state -> highlighted specifically
// an if else changes a variable in return -> object style

export const Book = (props) => {
    const [highlighted, setHighlighted] = useState(false);
    const [deleted, setDeleted] = useState(false);

// there is an error requesting props to be passed into the depenedency array of useEffect, but it does not stop the functionality
    useEffect(() => {
        console.log('Mounting: ' + props.title);
    }, [])

    useEffect(() => {
        console.log('Updating: ' + props.title);
    }, [highlighted])


    const clickHandler = () => {
        setHighlighted(state => !state) //we want an update on each click, thus, updater function, no mere setting to true once -> setHighlighted(true)
    }
    const deleteHandler = () => {
        setDeleted(true)
    }

    let style = {}
    if (highlighted){
        style.backgroundColor = 'green';
        
    }

    // under the hood, the selected book is still there with key
    // we are just patching a new element onto it
    // to delete it, you have to unmount
    if(deleted) {
        return <h2>Deleted</h2>
    }
    return (
        // <li style={style} className={styles['book-item']}>
        <li style={style}>
            <article>
                <h2>{props.title}</h2>
                <div>Year: {props.year}</div>
                <div>Price: {props.price}$</div>
                <footer>
                    <button onClick={clickHandler}>Highlight</button>
                    <button onClick={deleteHandler}>Delete</button>
                    <span>Author: {props.author}</span>
                    {/* <button onClick={clickHandler}>Highlight</button>
                    <button onClick={deleteHandler}>Delete</button>
                    <span className={styles.author}>Author: {props.author}</span> */}
                </footer>
            </article>
        </li>
    );
}


// Simple use of useState for each <li> to hold its own state when clicked or not
// thus, using updater function so that it can reflect on the dynamic nature of toggling


// export const Book = (props) => {
//     const [highlighted, setHighlighted] = useState(false)

//     const clickHandler = () => {
//         setHighlighted(state => !state) //we want an update on each click, thus, updater function, no mere setting to true once -> setHighlighted(true)
//     }

//     let style = {}
//     if (highlighted){
//         style.backgroundColor = 'green';
//     }
//     return (
//         // <li style={style} className={styles['book-item']}>
//         <li onClick={clickHandler} style={style}>
//             <article>
//                 <h2>{props.title}</h2>
//                 <div>Year: {props.year}</div>
//                 <div>Price: {props.price}$</div>
//                 <footer>
//                     {/* <button onClick={clickHandler}>Highlight</button>
//                     <button onClick={deleteHandler}>Delete</button>
//                     <span className={styles.author}>Author: {props.author}</span> */}
//                 </footer>
//             </article>
//         </li>
//     );
// }




// Problem with this version is that you cannot toggle:

// import { useState } from "react";

// export const Book = (props) => {
//     const [highlighted, setHighlighted] = useState(false)

//     const clickHandler = () => {
//         setHighlighted(true)
//     }

//     let style = {}
//     if (highlighted){
//         style.backgroundColor = 'green';
//     }
//     return (
//         // <li style={style} className={styles['book-item']}>
//         <li onClick={clickHandler} style={style}>
//             <article>
//                 <h2>{props.title}</h2>
//                 <div>Year: {props.year}</div>
//                 <div>Price: {props.price}$</div>
//                 <footer>
//                     {/* <button onClick={clickHandler}>Highlight</button>
//                     <button onClick={deleteHandler}>Delete</button>
//                     <span className={styles.author}>Author: {props.author}</span> */}
//                 </footer>
//             </article>
//         </li>
//     );
// }