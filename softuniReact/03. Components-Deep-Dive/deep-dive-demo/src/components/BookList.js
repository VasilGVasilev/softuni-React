import { Book } from "./Book"

export const BookList = (props) => {
    return(
        <ul>
            {props.books.map((book, i) => <Book key={i} {...book} />)}
        </ul>
    )
}

// {...x} destructures the properties of one booklist element:
// { "title": "Northanger Abbey", "author": "Austen, Jane"},
// to be used then directly in Book props: props.title, props.author

// React understands arrays, even if we did not have <li>s, React will understand 
// the array made via .map() and render it as a list

// there is no such thing as a universal key to lists, you have to think of a system yourself
// you can use the index idea, but what if someone deletes for example first element in [0,1,2]
// the array will become [0,1], so whole list's key is re-rendered. 
// best -> take ID out of DB
// each key is has to be unique but just in comparison to ot