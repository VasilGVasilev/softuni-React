import { Link } from "react-router-dom";

const CatalogItem = ({game}) => {
    return(
        <div className="game">
            <div className="allGames-info">
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={`/catalog/${game._id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
};

export default CatalogItem;