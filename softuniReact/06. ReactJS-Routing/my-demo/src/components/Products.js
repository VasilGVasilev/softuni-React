import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Products = () => {
    const [starship, setStarship] = useState({});
    const {productId} = useParams();
    const navigate = useNavigate(); //function
    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${productId}/`)
            .then(res=>res.json())
            .then(result => {
                setStarship(result)
            })
    },[productId])
    const nextProducthandler = () => {
        navigate(`/products/${Number(productId) + 1}/`)
        // navigate(`/products/${Number(productId) + 1}/`, {replace:true}) //browser back/forth does not work see NB>Redirects 

    }
    return (
        <>
            <h2>Products Page</h2>
            <h3>Product {productId} Specification</h3>
            <ul>
                <li>Name: {starship.name}</li>
                <li>Model: {starship.model}</li>
                <li>Manufacturer: {starship.manufacturer}</li>

            </ul>
            <button onClick={nextProducthandler}>Next</button>
        </>
    )
}

export default Products