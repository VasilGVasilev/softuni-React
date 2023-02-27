import { useEffect, useState } from "react"
import { useParams, useNavigate, Link, Route, Routes } from 'react-router-dom';
import Film from './Film'


const Starship = () => {
    const [starship, setStarship] = useState({});
    const {starshipId} = useParams();
    const navigate = useNavigate(); //function
    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${starshipId}/`)
            .then(res=>res.json())
            .then(result => {
                setStarship(result)
            })
    },[starshipId, navigate])
    const nextStarshiphandler = () => {
        navigate(`/starships/${Number(starshipId) + 1}/`)
        // navigate(`/starships/${Number(starshipId) + 1}/`, {replace:true}) //browser back/forth does not work see NB>Redirects 

    }
    return (
        <>
            <h2>Starships Page</h2>
            <h3>Starship No. {starshipId} Specification</h3>
            <ul>
                <li>Name: {starship.name}</li>
                <li>Model: {starship.model}</li>
                <li>Manufacturer: {starship.manufacturer}</li>

            </ul>
{/* whem some link in nav is clicked, it redirects to to={`films/${i + 1}`}*/}
{/* since it is nested link starships/:specificStarship/films/:specirficFilm */}
{/* the reactive Route to Link should be in the same component (Starship) */}
            <h3>Movies</h3>

            <nav>
                <ul>
                    {starship.films?.map((x, i) => 
                    // <Link> attaches films/{i+1} to /starships/ 
                    // if you write /films/{i+1} with '/' in front of films
                    // you will reset to http://localhost:3000/films/2 instead of http://localhost:3000/starships/2/films/2
                        <li key={x}><Link to={`/films/${i + 1}`}>Film {i + 1}</Link></li>
                    )}
                </ul>
            </nav>

            <section>
                <Routes>
                    {/* <Route> reads /starships/films/{i+1} */}

                    <Route path="films/:filmId" element={<Film films={starship.films || [] } />} />
                </Routes>
            </section>

            <button onClick={nextStarshiphandler}>Next</button>
        </>
    )
}

export default Starship