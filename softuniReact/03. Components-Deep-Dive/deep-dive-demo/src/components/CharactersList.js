import { useEffect, useState } from 'react';
// optional chaining
export const CharactersList = () => {
    const [characters, setCharacters] = useState();

    useEffect(() => {
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(result => {
                setCharacters(result.results)
            })
    }, [])

    return (
        <ul>
            {characters?.map(x => (
                <li key={x.name}>{x.name}</li>
            )) || 'Loading...'}
        </ul>
    )
}

// characters set to [] so it does not crash on undefined due to awaiting fetch triggering an error throw
// export const CharactersList = () => {
//     const [characters, setCharacters] = useState([]);

//     useEffect(() => {
//         fetch('https://swapi.dev/api/people')
//             .then(res => res.json())
//             .then(result => {
//                 setCharacters(result.results)
//             })
//     }, [])

//     return (
//         <ul>
//             {!characters.length && 'Loading ...'}
//             {/* if characets array is unfetched, thus, no length -> show loading*/}
//             {characters?.map(x => (
//                 <li key={x.name}>{x.name}</li>
//             )) || 'Loading...'}
//         </ul>
//     )
// }