import LatestGame from "./LatestGame/LatestGame";
import { useGameContext } from '../../contexts/GameContext'

const Home = () => {
    const { games } = useGameContext();

    return(
            <section id="welcome-world">
                <div className="welcome-message">
                    <h2>ALL new games are</h2>
                    <h3>Only in GamesPlay</h3>
                </div>
                <img src="./images/four_slider_img01.png" alt="hero" />
                <div id="home-page">
                    <h1>Latest Games</h1>
                    {games.length > 0
                        ?   games.map(x=><LatestGame key={x._id} game={x} />)
                        :   <p className="no-articles">No games yet</p>
                    }
                    {/* Display div: with information about every game (if any) */}
                    {/* Display paragraph: If there is no games  */}
                    
                </div>
            </section>
    );
};

export default Home;