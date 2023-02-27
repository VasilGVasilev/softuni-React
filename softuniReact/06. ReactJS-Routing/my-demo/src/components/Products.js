import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Products = () => {
    const [starship, setStarship] = useState({})
    const {productId} = useParams()
    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${productId}/`)
            .then(res=>res.json())
            .then(result => {
                setStarship(result)
            })
    })
    return (
        <>
        <h2>Products Page</h2>
        <h3>Product {productId} Specification</h3>
        <ul>
            <li>Name: {starship.name}</li>
            <li>Model: {starship.model}</li>
            <li>Manufacturer: {starship.manufacturer}</li>

        </ul>
        </>
    )
}

export default Products