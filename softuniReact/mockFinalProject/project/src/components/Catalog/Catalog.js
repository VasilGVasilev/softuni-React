import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = ({
    games
}) => {
    return(
            <section className="catalogPage">
                <div className="container">
                    <div className="title">
                        <h1>All Games</h1>
                    </div>
                    <div className="games">
                    {games?.length > 0
                        ? games.map(game => <CatalogItem key={game._id} game={game}/>)
                        : <h3 className="noMatches">No matches yet</h3>
                    }
                    </div>
                </div>
            </section>
    );
};
export default Catalog;