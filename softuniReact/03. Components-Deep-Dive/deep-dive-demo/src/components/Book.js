export const Book = (props) => {
    return (
        // <li style={style} className={styles['book-item']}>
        <li>
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