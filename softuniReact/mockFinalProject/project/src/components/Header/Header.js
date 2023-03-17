import { Link } from 'react-router-dom'


const Header = () => {
    const user = {}
    return (
        <header className='header'>
        {/* Navigation */}
        <h1 className='homeContainer'>
          <a className="home" href="#">
            GamesPlay
          </a>
        </h1>
        <nav className='linksContainer'>
          <a href="#">All games</a>
          {/* Logged-in users */}
          <div id="user">
            <a href="#">Create Game</a>
            <a href="#">Logout</a>
          </div>
          {/* Guest users */}
          <div id="guest">
            <a href="#">Login</a>
            <a href="#">Register</a>
          </div>
        </nav>
      </header>
    );
}

export default Header;