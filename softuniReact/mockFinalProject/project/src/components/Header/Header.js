import { Link } from 'react-router-dom'


const Header = () => {
    const user = {}
    return (
      <header className='header'>
        {/* Navigation */}
        <h2 className='homeContainer'>
          <a className="home" href="#">
            Matches
          </a>
        </h2>
        <nav className='linksContainer'>
          <a href="#">All matches</a>
          {/* Logged-in users */}
          <div id="user">
            <a href="#">Create Match</a>
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