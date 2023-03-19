import { Link } from "react-router-dom";

const CatalogItem = ({game}) => {
    return(
        <div className="game">
            <div className="allGames-info">
                <p>{game.category}</p>
                <p>{game.title}</p>
                <Link to={`/catalog/${game._id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
};

export default CatalogItem;