Hooks since v16.8

Hooks share functionality, they actually add functionality to otherwise static presentational functional components, hooks also make the functional components go against their nature of pure functionality

State hook lets you persist information stored even during re-render, unlike, a simple variable storing, which will be lost at the moment browser re-renders content; this is accomplished via closures

State is immutable, thus, you need special function setValue to update state:
    const [value, setValue] = useState()
This special function can be expanded for more precise updating (wen depending on oldState -> to tackle race condition):
    setValue (oldState => oldState + 1 ) -> value type
    setValue (oldState => {...oldState, newKey: newValue} ) -> reference type
        why we need new reference, because React updates UI via comparing references, so new info that needs to be displayed on next render is designated by having a new reference to it

Context 

    Passing Data Deeply with Context:

    Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.