import { Link } from "react-router-dom";

const CatalogItem = ({game}) => {
    return(
        <div className="match">
            <div className="teamSides">
                <p>{game.category}</p>
                <p>{game.title}</p>
            </div>
            <Link to={`/catalog/${game._id}`} className="details-button">Details</Link>
        </div>
    );
};

export default CatalogItem;