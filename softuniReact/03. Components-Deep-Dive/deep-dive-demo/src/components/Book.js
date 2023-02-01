import { useState } from "react";

export const Book = (props) => {
    const [highlighted, setHighlighted] = useState(false)

    const clickHandler = () => {
        setHighlighted(state => !state) //we want an update on each click, thus, updater function, no mere setting to true once -> setHighlighted(true)
    }

    let style = {}
    if (highlighted){
        style.backgroundColor = 'green';
    }
    return (
        // <li style={style} className={styles['book-item']}>
        <li onClick={clickHandler} style={style}>
            <article>
                <h2>{props.title}</h2>
                <div>Year: {props.year}</div>
                <div>Price: {props.price}$</div>
                <footer>
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